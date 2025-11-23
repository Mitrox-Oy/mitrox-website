import React, { useState, useRef, useEffect, useMemo } from "react";
import { X, Send, ChevronRight, ChevronLeft, ChevronDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface FormData {
  // Yrityksen perustiedot
  companyName: string;
  industry: string;
  targetAudience: string;
  companyImage: string;
  companyImageOther: string;
  
  // Verkkosivun tavoite
  mainGoals: string[];
  
  // Visuaalinen tyyli ja äänensävy
  designStyle: string;
  colorPreferences: string;
  referenceSites: string;
  toneOfVoice: string;
  
  // Sivut ja sisältö
  requiredPages: string[];
  contentOwnership: string;
  uniqueSellingPoint: string;
  specialFeatures: string;
  
  // Tekniset vaatimukset
  integrations: string[];
  integrationFollowups: {
    [key: string]: {
      provider: string;
      haveAccount: string;
      purpose: string;
    };
  };
  languages: string[];
  seo: string;
  
  // Aikataulu ja yhteystiedot
  timeline: string;
  name: string;
  email: string;
  phone: string;
  preferredContact: string;
  message: string;
  
  // Lisäpalvelut
  additionalServices: string[];
  additionalRequests: string;
}

const GOALS_OPTIONS = [
  "Liidien keräys",
  "Tuotteiden/palveluiden esittely",
  "Brändin vahvistaminen",
  "Myynnin kasvattaminen",
  "Asiakaspalvelu tai automaatio",
  "Yhteystietojen jakaminen",
  "Sisällöntuotanto / blogi",
];

const PAGE_OPTIONS = [
  "Etusivu",
  "Tietoa meistä",
  "Tuotteet / Palvelut",
  "Yhteystiedot",
  "Blogi",
  "Galleria / Portfolio",
  "FAQ",
  "Hinnoittelu",
];

const INTEGRATION_OPTIONS = [
  {
    key: "email_marketing",
    label: "Uutiskirje ja kampanjat (Mailchimp, Brevo)",
    helper: "Pidä yhteyttä asiakkaisiin sähköpostitse.",
    placeholder: "Esim. Mailchimp, Brevo, HubSpot...",
  },
  {
    key: "booking",
    label: "Ajanvaraus verkossa (Calendly, Timma, Google Calendar)",
    helper: "Asiakkaasi voivat varata ajan suoraan sivustoltasi.",
    placeholder: "Esim. Calendly, Timma, Google Calendar...",
  },
  {
    key: "social_embed",
    label: "Some-sisällöt sivulle (Instagram-feed, YouTube-video)",
    helper: "Näytä ajankohtaisia julkaisuja tai esittelyvideoita sivullasi.",
    placeholder: "Esim. Instagram, YouTube, TikTok...",
  },
  {
    key: "maps",
    label: "Kartta ja ajo-ohjeet (Google Maps)",
    helper: "Näytä yrityksesi sijainti ja helpota asiakkaiden saapumista.",
    placeholder: "Esim. Google Maps, Apple Maps...",
  },
  {
    key: "forms_leads",
    label: "Yhteydenottolomakkeet ja liidit (Typeform, Tally)",
    helper: "Kerää yhteydenottoja automaattisesti jatkokäyttöön.",
    placeholder: "Esim. Typeform, Tally, Google Forms...",
  },
  {
    key: "mitrox_advisor",
    label: "Verkkosivun asiakasavustaja (Mitrox AI Advisor)",
    helper: "24/7 avustaja, joka ohjaa kävijöitä ja auttaa keräämään liidejä.",
    placeholder: "Mitrox AI Advisor",
  },
  {
    key: "unknown",
    label: "En osaa sanoa – ehdottakaa meille sopivin ratkaisu",
    helper: "Jos et ole varma, jätä valinta meille.",
    placeholder: "",
  },
];

const ADDITIONAL_SERVICES_OPTIONS = [
  "Mitrox Advisor – 55 €/kk alkaen",
  "Lisäkieli (Suomi ↔ Englanti) – 199 € alkaen",
  "Laajennettu hakukoneoptimointi – 79 €/kk alkaen",
  "Ei lisäpalveluita tällä hetkellä",
];

const ADDITIONAL_SERVICES_DESCRIPTIONS: { [key: string]: string } = {
  "Mitrox Advisor – 55 €/kk alkaen": "24/7 verkkosivun asiakasavustaja, joka vastaa kävijöiden kysymyksiin ja ohjaa oikeaan suuntaan.",
  "Lisäkieli (Suomi ↔ Englanti) – 199 € alkaen": "Ammattitason käännös ja viimeistely viidelle sivulle, sisältäen SEO-optimoinnin.",
  "Laajennettu hakukoneoptimointi – 79 €/kk alkaen": "Jatkuva hakukonenäkyvyyden kehitys ja säännölliset raportit.",
};

const WebsiteInquiryForm: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const isFinnish = language === "fi";
  const [currentStep, setCurrentStep] = useState(0);
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    industry: "",
    targetAudience: "",
    companyImage: "",
    companyImageOther: "",
    mainGoals: [],
    designStyle: "",
    colorPreferences: "",
    referenceSites: "",
    toneOfVoice: "",
    requiredPages: [],
    contentOwnership: "",
    uniqueSellingPoint: "",
    specialFeatures: "",
    integrations: [],
    integrationFollowups: {},
    languages: [],
    seo: "",
    timeline: "",
    name: "",
    email: "",
    phone: "",
    preferredContact: "",
    message: "",
    additionalServices: [],
    additionalRequests: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const [botcheck, setBotcheck] = useState("");

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.keys(dropdownRefs.current).forEach((key) => {
        if (dropdownRefs.current[key] && !dropdownRefs.current[key]?.contains(event.target as Node)) {
          setOpenDropdowns((prev) => ({ ...prev, [key]: false }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-select additional services based on language, SEO, and integration selections
  // Note: We only ADD services automatically, never remove them - user has full control
  useEffect(() => {
    const NO_SERVICES = isFinnish ? "Ei lisäpalveluita tällä hetkellä" : "No additional services at this time";
    
    // Don't auto-select if user has explicitly chosen "Ei lisäpalveluita"
    if (formData.additionalServices.includes(NO_SERVICES)) {
      return;
    }

    const hasBothLanguages = (isFinnish 
      ? (formData.languages.includes("Suomi") && formData.languages.includes("Englanti"))
      : (formData.languages.includes("Finnish") && formData.languages.includes("English")));
    const needsExtendedSEO = isFinnish 
      ? formData.seo === "Kyllä, tarvitsen laajempaa hakukoneoptimointia"
      : formData.seo === "Yes, I need extended search engine optimization";
    const hasMitroxAdvisor = formData.integrations.includes("mitrox_advisor");
    
    const languageService = isFinnish 
      ? "Lisäkieli (Suomi ↔ Englanti) – 199 € alkaen"
      : "Additional language (Finnish ↔ English) – €199 starting";
    const seoService = isFinnish
      ? "Laajennettu hakukoneoptimointi – 79 €/kk alkaen"
      : "Extended search engine optimization – €79/month starting";
    const advisorService = isFinnish
      ? "Mitrox Advisor – 55 €/kk alkaen"
      : "Mitrox Advisor – €55/month starting";
    
    const newServices = [...formData.additionalServices];
    let hasChanges = false;

    // Auto-add language service if both languages selected (only if not already added)
    if (hasBothLanguages && !newServices.includes(languageService)) {
      newServices.push(languageService);
      hasChanges = true;
    }

    // Auto-add SEO service ONLY if extended SEO is explicitly selected (only if not already added)
    if (needsExtendedSEO && !newServices.includes(seoService)) {
      newServices.push(seoService);
      hasChanges = true;
    }

    // Auto-add Mitrox Advisor service if selected in integrations (only if not already added)
    if (hasMitroxAdvisor && !newServices.includes(advisorService)) {
      newServices.push(advisorService);
      hasChanges = true;
    }

    // Note: We don't remove services automatically - user can always manually remove them if needed

    if (hasChanges) {
      setFormData((prev) => ({ ...prev, additionalServices: newServices }));
    }
  }, [formData.languages, formData.seo, formData.integrations, isFinnish]);

  // Translated constants based on language
  const GOALS_OPTIONS_TRANSLATED = useMemo(() => 
    isFinnish ? [
      "Liidien keräys",
      "Tuotteiden/palveluiden esittely",
      "Brändin vahvistaminen",
      "Myynnin kasvattaminen",
      "Asiakaspalvelu tai automaatio",
      "Yhteystietojen jakaminen",
      "Sisällöntuotanto / blogi",
    ] : [
      "Lead generation",
      "Product/service showcase",
      "Brand strengthening",
      "Sales growth",
      "Customer service or automation",
      "Sharing contact information",
      "Content production / blog",
    ], [isFinnish]
  );

  const PAGE_OPTIONS_TRANSLATED = useMemo(() =>
    isFinnish ? [
      "Etusivu",
      "Tietoa meistä",
      "Tuotteet / Palvelut",
      "Yhteystiedot",
      "Blogi",
      "Galleria / Portfolio",
      "FAQ",
      "Hinnoittelu",
    ] : [
      "Home",
      "About us",
      "Products / Services",
      "Contact",
      "Blog",
      "Gallery / Portfolio",
      "FAQ",
      "Pricing",
    ], [isFinnish]
  );

  const INTEGRATION_OPTIONS_TRANSLATED = useMemo(() =>
    isFinnish ? [
      {
        key: "email_marketing",
        label: "Uutiskirje ja kampanjat (Mailchimp, Brevo)",
        helper: "Pidä yhteyttä asiakkaisiin sähköpostitse.",
        placeholder: "Esim. Mailchimp, Brevo, HubSpot...",
      },
      {
        key: "booking",
        label: "Ajanvaraus verkossa (Calendly, Timma, Google Calendar)",
        helper: "Asiakkaasi voivat varata ajan suoraan sivustoltasi.",
        placeholder: "Esim. Calendly, Timma, Google Calendar...",
      },
      {
        key: "social_embed",
        label: "Some-sisällöt sivulle (Instagram-feed, YouTube-video)",
        helper: "Näytä ajankohtaisia julkaisuja tai esittelyvideoita sivullasi.",
        placeholder: "Esim. Instagram, YouTube, TikTok...",
      },
      {
        key: "maps",
        label: "Kartta ja ajo-ohjeet (Google Maps)",
        helper: "Näytä yrityksesi sijainti ja helpota asiakkaiden saapumista.",
        placeholder: "Esim. Google Maps, Apple Maps...",
      },
      {
        key: "forms_leads",
        label: "Yhteydenottolomakkeet ja liidit (Typeform, Tally)",
        helper: "Kerää yhteydenottoja automaattisesti jatkokäyttöön.",
        placeholder: "Esim. Typeform, Tally, Google Forms...",
      },
      {
        key: "mitrox_advisor",
        label: "Verkkosivun asiakasavustaja (Mitrox AI Advisor)",
        helper: "24/7 avustaja, joka ohjaa kävijöitä ja auttaa keräämään liidejä.",
        placeholder: "Mitrox AI Advisor",
      },
      {
        key: "unknown",
        label: "En osaa sanoa – ehdottakaa meille sopivin ratkaisu",
        helper: "Jos et ole varma, jätä valinta meille.",
        placeholder: "",
      },
    ] : [
      {
        key: "email_marketing",
        label: "Newsletter and campaigns (Mailchimp, Brevo)",
        helper: "Stay in touch with customers via email.",
        placeholder: "E.g. Mailchimp, Brevo, HubSpot...",
      },
      {
        key: "booking",
        label: "Online booking (Calendly, Timma, Google Calendar)",
        helper: "Your customers can book appointments directly from your site.",
        placeholder: "E.g. Calendly, Timma, Google Calendar...",
      },
      {
        key: "social_embed",
        label: "Social content on site (Instagram feed, YouTube video)",
        helper: "Display recent posts or demo videos on your site.",
        placeholder: "E.g. Instagram, YouTube, TikTok...",
      },
      {
        key: "maps",
        label: "Map and directions (Google Maps)",
        helper: "Show your business location and help customers find you.",
        placeholder: "E.g. Google Maps, Apple Maps...",
      },
      {
        key: "forms_leads",
        label: "Contact forms and leads (Typeform, Tally)",
        helper: "Collect inquiries automatically for follow-up.",
        placeholder: "E.g. Typeform, Tally, Google Forms...",
      },
      {
        key: "mitrox_advisor",
        label: "Website customer assistant (Mitrox AI Advisor)",
        helper: "24/7 assistant that guides visitors and helps collect leads.",
        placeholder: "Mitrox AI Advisor",
      },
      {
        key: "unknown",
        label: "I'm not sure – suggest the best solution for us",
        helper: "If you're not sure, leave the choice to us.",
        placeholder: "",
      },
    ], [isFinnish]
  );

  const ADDITIONAL_SERVICES_OPTIONS_TRANSLATED = useMemo(() =>
    isFinnish ? [
      "Mitrox Advisor – 55 €/kk alkaen",
      "Lisäkieli (Suomi ↔ Englanti) – 199 € alkaen",
      "Laajennettu hakukoneoptimointi – 79 €/kk alkaen",
      "Ei lisäpalveluita tällä hetkellä",
    ] : [
      "Mitrox Advisor – €55/month starting",
      "Additional language (Finnish ↔ English) – €199 starting",
      "Extended search engine optimization – €79/month starting",
      "No additional services at this time",
    ], [isFinnish]
  );

  const ADDITIONAL_SERVICES_DESCRIPTIONS_TRANSLATED = useMemo(() => ({
    ...(isFinnish ? {
      "Mitrox Advisor – 55 €/kk alkaen": "24/7 verkkosivun asiakasavustaja, joka vastaa kävijöiden kysymyksiin ja ohjaa oikeaan suuntaan.",
      "Lisäkieli (Suomi ↔ Englanti) – 199 € alkaen": "Ammattitason käännös ja viimeistely viidelle sivulle, sisältäen SEO-optimoinnin.",
      "Laajennettu hakukoneoptimointi – 79 €/kk alkaen": "Jatkuva hakukonenäkyvyyden kehitys ja säännölliset raportit.",
    } : {
      "Mitrox Advisor – €55/month starting": "24/7 website customer assistant that answers visitor questions and guides them in the right direction.",
      "Additional language (Finnish ↔ English) – €199 starting": "Professional translation and finishing for five pages, including SEO optimization.",
      "Extended search engine optimization – €79/month starting": "Continuous search engine visibility development and regular reports.",
    })
  }), [isFinnish]);

  const generatePromptFromForm = React.useCallback((data: FormData) => {
    const clientObject = {
      brand_name: data.companyName || "",
      one_liner: data.uniqueSellingPoint || "",
      offering: Array.from(new Set([...(data.requiredPages || []), ...(data.specialFeatures ? [data.specialFeatures] : [])])).filter(Boolean),
      target_audience: data.targetAudience || "",
      tone: data.toneOfVoice || data.companyImage || "",
      locale_primary: (data.languages && (data.languages[0] === "Englanti" || data.languages[0] === "English")) ? "en-US" : "fi-FI",
      locales_extra: ((data.languages || []).includes("Englanti") || (data.languages || []).includes("English")) && ((data.languages || []).includes("Suomi") || (data.languages || []).includes("Finnish"))
        ? [ ((data.languages[0] === "Englanti" || data.languages[0] === "English") ? "fi-FI" : "en-US") ]
        : undefined,
      contact: { email: data.email || "", phone: data.phone || undefined },
      social: {},
      brand_assets: {},
      seo_keywords: [],
      legal: {}
    };

    const integrationsList = (data.integrations || []).map((key) => {
      const integration = INTEGRATION_OPTIONS_TRANSLATED.find((opt) => opt.key === key);
      return `- ${integration?.label || key}${data.integrationFollowups[key]?.provider ? ` ( ${data.integrationFollowups[key]?.provider} )` : ""}`;
    }).join("\n");

    const goals = (data.mainGoals || []).map((g) => `- ${g}`).join("\n");
    const pages = (data.requiredPages || []).map((p) => `- ${p}`).join("\n");

    const preface = `SYVÄANALYYSIIN VIETÄVÄ TUOTANTO-OHJE – Mukauta esimerkkipohjaa (src/prompt/prompt.md) tämän asiakkaan briiffiin.`;

    const prompt = [
      preface,
      "",
      "1) TAVOITE JA ROOLIT",
      "- Toteuta moderni, minimalistinen ja laadukas sivusto asiakkaalle tämän briiffin pohjalta.",
      "",
      "2) SISÄÄNTULO (CLIENT-OBJEKTI)",
      "```json",
      JSON.stringify(clientObject, null, 2),
      "```",
      "",
      "3) YDINVAATIMUKSET (tiivistelmä lomakkeesta)",
      `- Tavoitteet:\n${goals || "- (ei määritelty)"}`,
      `- Sivut:\n${pages || "- (ei määritelty)"}`,
      `- Kielet: ${(data.languages || []).join(", ") || "(ei määritelty)"}`,
      `- Ainutlaatuisuus: ${data.uniqueSellingPoint || "(ei määritelty)"}`,
      `- Erityistoiminnot: ${data.specialFeatures || "(ei määritelty)"}`,
      `- Integraatiot:\n${integrationsList || "- (ei)"}`,
      "",
      "4) DESIGN-PREFERENSSIT",
      `- Tyyli: ${data.designStyle || "(ei määritelty)"}`,
      `- Värit: ${data.colorPreferences || "(ei määritelty)"}`,
      `- Inspiraatio: ${data.referenceSites || "(ei määritelty)"}`,
      `- Äänensävy: ${data.toneOfVoice || "(ei määritelty)"}`,
      "",
      "5) SISÄLTÖ JA SEO",
      `- Sisällön omistus: ${data.contentOwnership || "(ei määritelty)"}`,
      `- SEO-taso: ${data.seo || "(ei määritelty)"}`,
      "",
      "6) AIKATAULU JA MUUT",
      `- Aikataulu: ${data.timeline || "(ei määritelty)"}`,
      `- Lisäpalvelut: ${(data.additionalServices || []).join(", ") || "(ei)"}`,
      `- Muut toiveet: ${data.additionalRequests || "(ei)"}`,
      "",
      "OHJE: Käytä src/prompt/prompt.md -pohjaa sellaisenaan. Täytä kaikki kohdat tämän briiffin mukaisesti ja merkitse puutteet turvallisilla oletuksilla (ilmoita oletus). Tuota lopuksi sivukartta, komponenttitaso ja QA-checklist." 
    ].join("\n");

    return prompt;
  }, [INTEGRATION_OPTIONS_TRANSLATED]);

  const steps = useMemo(() => [
    {
      title: isFinnish ? "Yrityksen perustiedot" : "Company basics",
      microcopy: isFinnish 
        ? "Tämä auttaa meitä ymmärtämään yrityksesi ydintä ja kohdentamaan sivuston oikein."
        : "This helps us understand your company's core and target the site correctly.",
      fields: [
        {
          name: "companyName",
          label: isFinnish ? "Yrityksen nimi *" : "Company name *",
          type: "text",
          required: true,
        },
        {
          name: "industry",
          label: isFinnish ? "Toimiala *" : "Industry *",
          type: "text",
          placeholder: isFinnish ? "Esim. Teknologia, Ravintola, Konsultointi..." : "E.g. Technology, Restaurant, Consulting...",
          required: true,
        },
        {
          name: "targetAudience",
          label: isFinnish ? "Kohdeyleisö *" : "Target audience *",
          type: "textarea",
          placeholder: isFinnish 
            ? "Kuka käyttää verkkosivustoa (esim. B2B-asiakkaat, kuluttajat, tietyt ikäryhmät...)"
            : "Who uses the website (e.g. B2B customers, consumers, specific age groups...)",
          required: true,
        },
        {
          name: "companyImage",
          label: isFinnish ? "Millaisen ensivaikutelman haluat antaa verkossa? *" : "What first impression do you want to make online? *",
          type: "select",
          options: isFinnish ? [
            "Ammattimainen ja luotettava",
            "Innovatiivinen ja moderni",
            "Lämmin ja helposti lähestyttävä",
            "Ylellinen ja viimeistelty",
            "Rohkea ja erottuva",
            "Asiantunteva ja selkeä",
            "En osaa sanoa – ehdottakaa meille sopivaa linjaa",
          ] : [
            "Professional and reliable",
            "Innovative and modern",
            "Warm and approachable",
            "Luxurious and refined",
            "Bold and distinctive",
            "Expert and clear",
            "I'm not sure – suggest a suitable direction for us",
          ],
          microcopy: isFinnish 
            ? "Ensivaikutelma auttaa meitä linjaamaan koko sivuston."
            : "First impression helps us align the entire site.",
          required: true,
        },
        {
          name: "companyImageOther",
          label: isFinnish ? "Kerro tarkemmin" : "Tell us more",
          type: "textarea",
          placeholder: isFinnish ? "Jos valitsit 'Jokin muu', kerro tarkemmin..." : "If you selected 'Something else', tell us more...",
        },
      ],
    },
    {
      title: isFinnish ? "Verkkosivun tavoite" : "Website goals",
      microcopy: isFinnish
        ? "Kun tiedämme tavoitteesi, voimme rakentaa sivuston, joka tukee liiketoimintaasi suoraan."
        : "When we know your goals, we can build a site that directly supports your business.",
      fields: [
        {
          name: "mainGoals",
          label: isFinnish ? "Mikä on verkkosivuston tärkein tavoite? (voi valita useita) *" : "What is the website's main goal? (can select multiple) *",
          type: "multiselect",
          options: GOALS_OPTIONS_TRANSLATED,
          required: true,
        },
      ],
    },
    {
      title: isFinnish ? "Visuaalinen tyyli ja äänensävy" : "Visual style and tone of voice",
      microcopy: isFinnish
        ? "Tyyli ja sävy vaikuttavat kaikkeen – kuvamaailmaan, väreihin ja viestinnän rytmiin."
        : "Style and tone affect everything – imagery, colors, and communication rhythm.",
      fields: [
        {
          name: "designStyle",
          label: isFinnish ? "Millaiselta haluat sivustosi tuntuvan? *" : "How do you want your site to feel? *",
          type: "select",
          options: isFinnish ? [
            "Moderni ja minimalistinen",
            "Klassinen ja ammattimainen",
            "Luova ja uniikki",
            "Ylellinen ja premium",
            "Yrityksellinen ja luotettava",
            "Värikäs ja energinen",
            "Rauhallinen ja luonnonläheinen",
            "Avoin ehdotuksille",
          ] : [
            "Modern and minimalist",
            "Classic and professional",
            "Creative and unique",
            "Luxurious and premium",
            "Corporate and reliable",
            "Colorful and energetic",
            "Calm and natural",
            "Open to suggestions",
          ],
          microcopy: isFinnish
            ? "Tunne vaikuttaa kuvamaailmaan, väreihin ja asetteluun."
            : "Feel affects imagery, colors, and layout.",
          required: true,
        },
        {
          name: "colorPreferences",
          label: isFinnish ? "Värimieltymykset tai brändivärit" : "Color preferences or brand colors",
          type: "textarea",
          placeholder: isFinnish ? "Esim. sininen ja valkoinen, luonnon sävyt..." : "E.g. blue and white, natural tones...",
        },
        {
          name: "referenceSites",
          label: isFinnish ? "Inspiraatiosivustot tai esimerkit" : "Inspiration sites or examples",
          type: "textarea",
          placeholder: isFinnish ? "Linkitä verkkosivustoja, joiden tyyli miellyttää sinua." : "Link websites whose style you like.",
        },
        {
          name: "toneOfVoice",
          label: isFinnish ? "Millaisella äänensävyllä haluat sivustosi puhuvan? *" : "What tone of voice do you want your site to use? *",
          type: "select",
          options: isFinnish ? [
            "Asiantunteva ja selkeä",
            "Rauhallinen ja luottamusta herättävä",
            "Lämmin ja helposti lähestyttävä",
            "Luova ja rento",
            "Energinen ja rohkea",
            "Ylellinen ja viimeistelty",
            "En ole varma – ehdota sopivaa tyyliä",
          ] : [
            "Expert and clear",
            "Calm and trustworthy",
            "Warm and approachable",
            "Creative and relaxed",
            "Energetic and bold",
            "Luxurious and refined",
            "I'm not sure – suggest a suitable style",
          ],
          microcopy: isFinnish
            ? "Äänensävy ohjaa kaikkea kirjoitusta ja viestinnän rytmiä."
            : "Tone of voice guides all writing and communication rhythm.",
          required: true,
        },
      ],
    },
    {
      title: isFinnish ? "Sivut ja sisältö" : "Pages and content",
      microcopy: isFinnish
        ? "Mitä selkeämmin määrittelet sisällön, sitä vähemmän tarvitaan korjauskierroksia."
        : "The clearer you define the content, the fewer revision rounds needed.",
      fields: [
        {
          name: "requiredPages",
          label: isFinnish ? "Mitkä sivut tarvitaan? (voi valita useita) *" : "Which pages are needed? (can select multiple) *",
          type: "multiselect",
          options: PAGE_OPTIONS_TRANSLATED,
          required: true,
        },
        {
          name: "contentOwnership",
          label: isFinnish ? "Miten haluat hoitaa sivuston sisällön? *" : "How do you want to handle the site's content? *",
          helper: isFinnish ? "Kuvat, tekstit ja tarina yrityksestäsi." : "Images, texts, and your company's story.",
          type: "select",
          options: isFinnish ? [
            "Mitrox hoitaa kaiken sisällön",
            "Toimitamme sisällön itse",
            "Tehdään yhdessä",
            "Tarvitsemme apua sisällön suunnittelussa",
          ] : [
            "Mitrox handles all content",
            "We provide the content ourselves",
            "We do it together",
            "We need help with content planning",
          ],
          microcopy: isFinnish
            ? "Valintasi määrittää tekstityön ja kuvatuotannon laajuuden."
            : "Your choice determines the scope of text work and image production.",
          required: true,
        },
        {
          name: "uniqueSellingPoint",
          label: isFinnish ? "Mikä tekee yrityksestäsi ainutlaatuisen? *" : "What makes your company unique? *",
          type: "textarea",
          placeholder: isFinnish ? "Kerro lyhyesti, miksi asiakkaan tulisi valita juuri teidät." : "Tell us briefly why the customer should choose you.",
          required: true,
        },
        {
          name: "specialFeatures",
          label: isFinnish ? "Erityistoiminnot tai vaatimukset" : "Special features or requirements",
          type: "textarea",
          placeholder: isFinnish ? "Esimerkiksi galleria, varausjärjestelmä, kartta, integraatiot..." : "For example gallery, booking system, map, integrations...",
        },
      ],
    },
    {
      title: isFinnish ? "Tekniset ja toiminnalliset integraatiot" : "Technical and functional integrations",
      intro: isFinnish
        ? "Valitse vain tarpeelliset. Me hoidamme suorituskyvyn, suojauksen ja analytiikan puolestasi."
        : "Select only what's needed. We handle performance, security, and analytics for you.",
      microcopy: isFinnish
        ? "Valinnat auttavat mitoittamaan projektin oikein ja nopeuttavat toteutusta."
        : "Choices help us size the project correctly and speed up implementation.",
      fields: [
        {
          name: "integrations",
          label: isFinnish ? "Mitkä integraatiot tarvitaan? (voi valita useita)" : "Which integrations are needed? (can select multiple)",
          type: "multiselect_with_followups",
          options: INTEGRATION_OPTIONS_TRANSLATED,
        },
        {
          name: "languages",
          label: isFinnish ? "Kielet *" : "Languages *",
          type: "multiselect",
          options: isFinnish ? ["Suomi", "Englanti"] : ["Finnish", "English"],
          required: true,
        },
        {
          name: "seo",
          label: isFinnish ? "Hakukoneoptimointi *" : "Search engine optimization *",
          type: "select",
          options: isFinnish ? [
            "Kyllä, tarvitsen laajempaa hakukoneoptimointia",
            "Perustaso riittää (sisältyy palveluun)",
          ] : [
            "Yes, I need extended search engine optimization",
            "Basic level is sufficient (included in service)",
          ],
          required: true,
        },
      ],
    },
    {
      title: isFinnish ? "Aikataulu ja yhteystiedot" : "Timeline and contact information",
      microcopy: isFinnish
        ? "Aikataulu auttaa meitä priorisoimaan työsi heti oikealle tuotantolinjalle."
        : "Timeline helps us prioritize your work to the right production line immediately.",
      fields: [
        {
          name: "timeline",
          label: isFinnish ? "Aikataulu tai julkaisuajankohta" : "Timeline or launch date",
          type: "select",
          options: isFinnish ? [
            "Heti kun valmista",
            "Seuraavan kuukauden sisällä",
            "2 kuukauden sisällä",
            "Ei kiirettä",
          ] : [
            "As soon as ready",
            "Within the next month",
            "Within 2 months",
            "No rush",
          ],
        },
        {
          name: "name",
          label: isFinnish ? "Nimi *" : "Name *",
          type: "text",
          required: true,
        },
        {
          name: "email",
          label: isFinnish ? "Sähköposti *" : "Email *",
          type: "email",
          required: true,
        },
        {
          name: "phone",
          label: isFinnish ? "Puhelinnumero" : "Phone number",
          type: "tel",
        },
        {
          name: "preferredContact",
          label: isFinnish ? "Mieluisin yhteydenottotapa" : "Preferred contact method",
          type: "select",
          options: isFinnish ? [
            "Sähköposti",
            "Puhelin",
            "Tekstiviesti",
          ] : [
            "Email",
            "Phone",
            "Text message",
          ],
        },
        {
          name: "message",
          label: isFinnish ? "Lisätietoja tai kysymyksiä" : "Additional information or questions",
          type: "textarea",
          placeholder: isFinnish ? "Kerro lisää projektista, aikatauluista tai muista toiveista..." : "Tell us more about the project, timelines, or other wishes...",
        },
      ],
    },
    {
      title: isFinnish ? "Lisäpalvelut" : "Additional services",
      microcopy: isFinnish
        ? "Valinnat auttavat mitoittamaan projektin ja resursoinnin juuri sinun tarpeisiisi."
        : "Choices help us size the project and resources to your exact needs.",
      fields: [
        {
          name: "additionalServices",
          label: isFinnish ? "Mitkä lisäpalvelut kiinnostavat sinua? *" : "Which additional services interest you? *",
          type: "multiselect",
          options: ADDITIONAL_SERVICES_OPTIONS_TRANSLATED,
          required: true,
        },
        {
          name: "additionalRequests",
          label: isFinnish ? "Muita toiveita tai erikoistarpeita?" : "Other wishes or special requirements?",
          type: "textarea",
          placeholder: isFinnish ? "Esimerkiksi lisätoiminnallisuudet, integraatiot tai laajempi sisältötyö." : "For example additional functionality, integrations, or broader content work.",
        },
      ],
    },
  ], [isFinnish]);

  const totalSteps = steps.length;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    fieldName: string
  ) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleMultiSelectChange = (fieldName: string, value: string) => {
    setFormData((prev) => {
      const current = prev[fieldName as keyof FormData] as string[];
      const NO_SERVICES_FI = "Ei lisäpalveluita tällä hetkellä";
      const NO_SERVICES_EN = "No additional services at this time";
      const NO_SERVICES = isFinnish ? NO_SERVICES_FI : NO_SERVICES_EN;
      
      // Special handling for additional services
      if (fieldName === "additionalServices") {
        // Check both Finnish and English versions
        const isNoServices = value === NO_SERVICES_FI || value === NO_SERVICES_EN;
        const hasNoServices = current.includes(NO_SERVICES_FI) || current.includes(NO_SERVICES_EN);
        
        if (isNoServices) {
          // If "No services" is clicked, toggle it and remove all others
          if (hasNoServices) {
            // If already selected, just deselect it
            return { ...prev, [fieldName]: [] };
          } else {
            // Select only "No services"
            return { ...prev, [fieldName]: [NO_SERVICES] };
          }
        } else {
          // If any other service is clicked
          let newValue = current.includes(value)
            ? current.filter((item) => item !== value)
            : [...current, value];
          
          // Remove "No services" if any other service is selected
          newValue = newValue.filter((item) => item !== NO_SERVICES_FI && item !== NO_SERVICES_EN);
          
          return { ...prev, [fieldName]: newValue };
        }
      }

      // Special handling for integrations
      if (fieldName === "integrations") {
        const isSelected = current.includes(value);
        let newIntegrations = isSelected
          ? current.filter((item) => item !== value)
          : [...current, value];

        // Update followups: remove if deselected, add empty if selected
        const newFollowups = { ...prev.integrationFollowups };
        if (isSelected) {
          delete newFollowups[value];
        } else {
          newFollowups[value] = {
            provider: "",
            haveAccount: "",
            purpose: "",
          };
        }

        return {
          ...prev,
          [fieldName]: newIntegrations,
          integrationFollowups: newFollowups,
        };
      }
      
      // Default behavior for other multiselect fields
      const newValue = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [fieldName]: newValue };
    });
  };

  const handleIntegrationFollowupChange = (
    integrationKey: string,
    fieldName: "provider" | "haveAccount" | "purpose",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      integrationFollowups: {
        ...prev.integrationFollowups,
        [integrationKey]: {
          ...prev.integrationFollowups[integrationKey],
          [fieldName]: value,
        },
      },
    }));
  };

  const canProceed = () => {
    const currentFields = steps[currentStep].fields;
    return currentFields.every((field) => {
      if (!field.required) return true;
      const value = formData[field.name as keyof FormData];
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== "";
    });
  };

  const handleNext = () => {
    if (canProceed() && currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Format data for AI processing
      const formattedData = {
        // Structured data for AI understanding
        company_info: {
          name: formData.companyName,
          industry: formData.industry,
          target_audience: formData.targetAudience,
          company_image: formData.companyImage,
          company_image_other: formData.companyImageOther,
        },
        website_requirements: {
          goals: formData.mainGoals,
          pages: formData.requiredPages,
          languages: formData.languages,
          unique_selling_point: formData.uniqueSellingPoint,
        },
        design_preferences: {
          style: formData.designStyle,
          colors: formData.colorPreferences,
          references: formData.referenceSites,
          tone_of_voice: formData.toneOfVoice,
        },
        technical: {
          integrations: formData.integrations.map((key) => {
            const integration = INTEGRATION_OPTIONS_TRANSLATED.find((opt) => opt.key === key);
            return {
              key: key,
              label: integration?.label || key,
              helper: integration?.helper || "",
              followup: formData.integrationFollowups[key] || null,
            };
          }),
          seo: formData.seo,
          special_features: formData.specialFeatures,
        },
        content: {
          ownership: formData.contentOwnership,
        },
        timeline: formData.timeline,
        contact: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          preferred_contact: formData.preferredContact,
          message: formData.message,
        },
        additional_services: {
          services: formData.additionalServices,
          requests: formData.additionalRequests,
        },
        // Human-readable summary for email
        summary: `
Yritys: ${formData.companyName}
Toimiala: ${formData.industry}
Kohdeyleisö: ${formData.targetAudience}
Yrityksen imago: ${formData.companyImage}${formData.companyImageOther ? ` (${formData.companyImageOther})` : ""}

Verkkosivun tavoitteet: ${formData.mainGoals.join(", ")}

Design-tyyli: ${formData.designStyle}
Värit: ${formData.colorPreferences || "Ei määritelty"}
Inspiraatio: ${formData.referenceSites || "Ei määritelty"}
Äänensävy: ${formData.toneOfVoice}

Sivut: ${formData.requiredPages.join(", ")}
Sisällön tuottaja: ${formData.contentOwnership}
Ainutlaatuinen myyntivaltti: ${formData.uniqueSellingPoint}
Erityistoiminnot: ${formData.specialFeatures || "Ei"}

Integraatiot: ${formData.integrations.length > 0 ? formData.integrations.map((key) => {
            const integration = INTEGRATION_OPTIONS_TRANSLATED.find((opt) => opt.key === key);
            return integration?.label || key;
          }).join(", ") : (isFinnish ? "Ei" : "None")}
Kielet: ${formData.languages.join(", ")}
SEO: ${formData.seo}

Aikataulu: ${formData.timeline || "Ei määritelty"}

Lisäpalvelut: ${formData.additionalServices.length > 0 ? formData.additionalServices.join(", ") : "Ei"}
Muita toiveita: ${formData.additionalRequests || "Ei"}

Yhteystiedot:
Nimi: ${formData.name}
Sähköposti: ${formData.email}
Puhelin: ${formData.phone || "Ei määritelty"}
Mieluisin yhteydenottotapa: ${formData.preferredContact || (isFinnish ? "Ei määritelty" : "Not specified")}

Lisätietoja: ${formData.message || "Ei"}
        `.trim(),
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "e2fb1df8-082a-4ef4-a2b8-7a9d7f2a7bb6",
          subject: isFinnish 
            ? `Verkkosivuhakemus: ${formData.companyName}`
            : `Website inquiry: ${formData.companyName}`,
          to: "johannes.hurmerinta@mitrox.io",
          name: formData.name,
          email: formData.email,
          reply_to: formData.email,
          company: formData.companyName,
          phone: formData.phone,
          preferred_contact: formData.preferredContact,
          page_url: typeof window !== "undefined" ? window.location.href : "",
          botcheck,
          // Send structured JSON for AI processing
          data: JSON.stringify(formattedData),
          // Human-readable email body
          message: formattedData.summary,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetFormAndClose = () => {
    setFormData({
            companyName: "",
            industry: "",
            targetAudience: "",
            companyImage: "",
            companyImageOther: "",
            mainGoals: [],
            designStyle: "",
            colorPreferences: "",
            referenceSites: "",
            toneOfVoice: "",
            requiredPages: [],
            contentOwnership: "",
            uniqueSellingPoint: "",
            specialFeatures: "",
            integrations: [],
            integrationFollowups: {},
            languages: [],
            seo: "",
            timeline: "",
            name: "",
            email: "",
            phone: "",
            preferredContact: "",
            message: "",
            additionalServices: [],
            additionalRequests: "",
          });
    setCurrentStep(0);
    setGeneratedPrompt("");
    setSubmitStatus("idle");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl max-h-[95vh] sm:max-h-[90vh] bg-black rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-2xl font-medium text-white mb-1 truncate">
              {isFinnish ? "Verkkosivuhakemus" : "Website inquiry"}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              {isFinnish ? "Vaihe" : "Step"} {currentStep + 1} / {totalSteps}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-black/60 border border-white/20 hover:bg-black/80 transition-colors text-white flex-shrink-0 ml-2"
            aria-label={isFinnish ? "Sulje" : "Close"}
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Form Content */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            // Only submit if we're on the last step and user clicked submit button
            if (currentStep === totalSteps - 1) {
              handleSubmit(e);
            }
          }} 
          className="flex-1 overflow-y-auto"
          onKeyDown={(e) => {
            // Prevent form submission on Enter key unless explicitly submitting
            if (e.key === "Enter" && e.target instanceof HTMLInputElement && (e.target.type === "text" || e.target.type === "email" || e.target.type === "tel")) {
              e.preventDefault();
            }
          }}
        >
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="botcheck">
              {isFinnish ? "Jätä tyhjäksi (roskapostin esto)" : "Leave empty (spam prevention)"}
            </label>
            <input
              id="botcheck"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              value={botcheck}
              onChange={(e) => setBotcheck(e.target.value)}
            />
          </div>
          <div className="p-4 sm:p-6">
            {submitStatus === "success" ? (
              <div className="py-6 sm:py-10 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-white mb-2">
                  {isFinnish ? "Hakemus lähetetty!" : "Application sent!"}
                </h3>
                <p className="text-gray-400 mb-6">
                  {isFinnish 
                    ? "Olemme vastaanottaneet vastauksesi. Otamme sinuun yhteyttä mahdollisimman pian."
                    : "We have received your response. We will contact you as soon as possible."}
                </p>
                <button
                  type="button"
                  onClick={resetFormAndClose}
                  className="px-5 py-2 rounded-lg bg-white text-black hover:bg-gray-100 transition-colors font-medium"
                >
                  {isFinnish ? "Sulje" : "Close"}
                </button>
              </div>
            ) : submitStatus === "error" ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                  <X className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">
                  {isFinnish ? "Virhe lähetyksessä" : "Submission error"}
                </h3>
                <p className="text-gray-400 mb-4">
                  {isFinnish 
                    ? "Jotain meni pieleen. Yritä hetken päästä uudelleen."
                    : "Something went wrong. Please try again in a moment."}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitStatus("idle")}
                  className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {isFinnish ? "Yritä uudelleen" : "Try again"}
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-lg sm:text-xl font-medium text-white mb-4 sm:mb-6">
                  {steps[currentStep].title}
                </h3>

                {"intro" in steps[currentStep] && steps[currentStep].intro && (
                <p className="text-sm text-body-subtle mb-4">
                    {steps[currentStep].intro}
                  </p>
                )}

                {steps[currentStep].microcopy && (
                  <p className="text-sm text-neutral-400 mt-3 mb-6 italic">
                    {steps[currentStep].microcopy}
                  </p>
                )}

                <div className="space-y-4 sm:space-y-6">
                  {steps[currentStep].fields.map((field) => {
                    // Hide companyImageOther - no longer needed with new options
                    if (field.name === "companyImageOther") {
                      return null;
                    }
                    
                    return (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {field.label}
                      </label>
                      {"helper" in field && field.helper && (
                        <p className="text-xs text-gray-400 mb-2">
                          {field.helper}
                        </p>
                      )}

                      {field.type === "textarea" ? (
                        <>
                        <textarea
                          name={field.name}
                          value={(formData[field.name as keyof FormData] as string) || ""}
                          onChange={(e) => handleInputChange(e, field.name)}
                          placeholder={"placeholder" in field ? field.placeholder : undefined}
                          required={field.required}
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors resize-none"
                        />
                          {"microcopy" in field && field.microcopy && (
                            <p className="text-sm text-neutral-400 mt-2">
                              {field.microcopy}
                            </p>
                          )}
                        </>
                      ) : field.type === "select" ? (
                        <div 
                          ref={(el) => (dropdownRefs.current[field.name] = el)}
                          className="relative"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              // Check if dropdown should open upward
                              const dropdownElement = dropdownRefs.current[field.name];
                              if (dropdownElement) {
                                const rect = dropdownElement.getBoundingClientRect();
                                const spaceBelow = window.innerHeight - rect.bottom;
                                const spaceAbove = rect.top;
                                const shouldOpenUp = spaceAbove > spaceBelow && spaceAbove > 200;
                                
                                setOpenDropdowns((prev) => ({ 
                                  ...prev, 
                                  [field.name]: !prev[field.name],
                                  [`${field.name}_up`]: shouldOpenUp 
                                }));
                              } else {
                                setOpenDropdowns((prev) => ({ ...prev, [field.name]: !prev[field.name] }));
                              }
                            }}
                            className={`w-full px-4 py-3 rounded-xl border text-left flex items-center justify-between transition-colors ${
                              formData[field.name as keyof FormData]
                                ? "bg-black/40 border-white/10 text-white"
                                : "bg-black/40 border-white/10 text-gray-400"
                            } hover:border-white/20 focus:outline-none focus:border-white/20`}
                          >
                            <span>
                              {(formData[field.name as keyof FormData] as string) || (isFinnish ? "Valitse..." : "Select...")}
                            </span>
                            <ChevronDown 
                              className={`w-4 h-4 transition-transform ${openDropdowns[field.name] ? "rotate-180" : ""}`}
                            />
                          </button>
                          {openDropdowns[field.name] && (
                            <div 
                              className={`absolute z-50 w-full rounded-xl bg-black/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden ${
                                openDropdowns[`${field.name}_up`] ? "bottom-full mb-2" : "top-full mt-2"
                              }`}
                            >
                              {"options" in field && Array.isArray(field.options) && field.options.map((option: string | any) => {
                                const optionValue = typeof option === "string" ? option : option.value || option.label || option;
                                const optionLabel = typeof option === "string" ? option : option.label || option.value || option;
                                return (
                                  <button
                                    key={optionValue}
                                    type="button"
                                    onClick={() => {
                                      handleInputChange({ target: { value: optionValue, name: field.name } } as any, field.name);
                                      setOpenDropdowns((prev) => ({ ...prev, [field.name]: false }));
                                    }}
                                    className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                                      (formData[field.name as keyof FormData] as string) === optionValue
                                        ? "bg-white/10 text-white"
                                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                                    }`}
                                  >
                                    {optionLabel}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                          {field.required && !formData[field.name as keyof FormData] && (
                            <input type="hidden" required />
                          )}
                        </div>
                      ) : field.type === "multiselect_with_followups" ? (
                        <div className="space-y-4">
                          {"options" in field && Array.isArray(field.options) && field.options.map((option: any) => {
                            const optionKey = typeof option === "object" ? option.key : option;
                            const optionLabel = typeof option === "object" ? option.label : option;
                            const optionHelper = typeof option === "object" ? option.helper : undefined;
                            const isSelected = (
                              formData[field.name as keyof FormData] as string[]
                            ).includes(optionKey);
                            const followupData = formData.integrationFollowups[optionKey] || {
                              provider: "",
                              haveAccount: "",
                              purpose: "",
                            };
                            
                            return (
                              <div key={optionKey} className="space-y-3">
                                <label
                                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                                    isSelected
                                      ? "bg-white/10 border-white/20"
                                      : "bg-black/40 border-white/10 hover:bg-black/60"
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() =>
                                      handleMultiSelectChange(field.name, optionKey)
                                    }
                                    className="w-4 h-4 mt-0.5 text-white bg-black/40 border-white/20 rounded focus:ring-white/20 shrink-0"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <span className="text-white text-sm block">{optionLabel}</span>
                                    {optionHelper && (
                                      <span className="text-gray-400 text-xs block mt-1">{optionHelper}</span>
                                    )}
                                  </div>
                                </label>
                                
                                {isSelected && optionKey !== "unknown" && optionKey !== "mitrox_advisor" && (
                                  <div className="ml-7 space-y-3 p-4 rounded-lg bg-black/20 border border-white/5">
                                    <div>
                                      <label className="block text-xs font-medium text-gray-300 mb-2">
                                        {isFinnish ? "Palvelu tai työkalu" : "Service or tool"}
                                      </label>
                                      <input
                                        type="text"
                                        value={followupData.provider}
                                        onChange={(e) =>
                                          handleIntegrationFollowupChange(optionKey, "provider", e.target.value)
                                        }
                                        placeholder={option.placeholder || (isFinnish ? "Esim. Mailchimp, Calendly..." : "E.g. Mailchimp, Calendly...")}
                                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-white/20 transition-colors"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-xs font-medium text-gray-300 mb-2">
                                        {isFinnish ? "Onko teillä jo tili?" : "Do you already have an account?"}
                                      </label>
                                      <div 
                                        ref={(el) => (dropdownRefs.current[`${optionKey}_haveAccount`] = el)}
                                        className="relative"
                                      >
                                        <button
                                          type="button"
                                          onClick={() => {
                                            // Check if dropdown should open upward
                                            const dropdownElement = dropdownRefs.current[`${optionKey}_haveAccount`];
                                            if (dropdownElement) {
                                              const rect = dropdownElement.getBoundingClientRect();
                                              const spaceBelow = window.innerHeight - rect.bottom;
                                              const spaceAbove = rect.top;
                                              const shouldOpenUp = spaceAbove > spaceBelow && spaceAbove > 200;
                                              
                                              setOpenDropdowns((prev) => ({ 
                                                ...prev, 
                                                [`${optionKey}_haveAccount`]: !prev[`${optionKey}_haveAccount`],
                                                [`${optionKey}_haveAccount_up`]: shouldOpenUp 
                                              }));
                                            } else {
                                              setOpenDropdowns((prev) => ({ ...prev, [`${optionKey}_haveAccount`]: !prev[`${optionKey}_haveAccount`] }));
                                            }
                                          }}
                                          className={`w-full px-3 py-2 rounded-lg border text-left flex items-center justify-between transition-colors text-sm ${
                                            followupData.haveAccount
                                              ? "bg-black/40 border-white/10 text-white"
                                              : "bg-black/40 border-white/10 text-gray-400"
                                          } hover:border-white/20 focus:outline-none focus:border-white/20`}
                                        >
                                          <span>
                                            {followupData.haveAccount || (isFinnish ? "Valitse..." : "Select...")}
                                          </span>
                                          <ChevronDown 
                                            className={`w-4 h-4 transition-transform ${openDropdowns[`${optionKey}_haveAccount`] ? "rotate-180" : ""}`}
                                          />
                                        </button>
                                        {openDropdowns[`${optionKey}_haveAccount`] && (
                                          <div 
                                            className={`absolute z-50 w-full rounded-lg bg-black/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden ${
                                              openDropdowns[`${optionKey}_haveAccount_up`] ? "bottom-full mb-2" : "top-full mt-2"
                                            }`}
                                          >
                                            <button
                                              type="button"
                                              onClick={() => {
                                                handleIntegrationFollowupChange(optionKey, "haveAccount", isFinnish ? "Kyllä" : "Yes");
                                                setOpenDropdowns((prev) => ({ ...prev, [`${optionKey}_haveAccount`]: false }));
                                              }}
                                              className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                                                followupData.haveAccount === (isFinnish ? "Kyllä" : "Yes")
                                                  ? "bg-white/10 text-white"
                                                  : "text-gray-300 hover:bg-white/5 hover:text-white"
                                              }`}
                                            >
                                              {isFinnish ? "Kyllä" : "Yes"}
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                handleIntegrationFollowupChange(optionKey, "haveAccount", isFinnish ? "Ei" : "No");
                                                setOpenDropdowns((prev) => ({ ...prev, [`${optionKey}_haveAccount`]: false }));
                                              }}
                                              className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                                                followupData.haveAccount === (isFinnish ? "Ei" : "No")
                                                  ? "bg-white/10 text-white"
                                                  : "text-gray-300 hover:bg-white/5 hover:text-white"
                                              }`}
                                            >
                                              {isFinnish ? "Ei" : "No"}
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    <div>
                                      <label className="block text-xs font-medium text-gray-300 mb-2">
                                        {isFinnish ? "Lyhyt kuvaus tarpeesta" : "Brief description of need"}
                                      </label>
                                      <textarea
                                        value={followupData.purpose}
                                        onChange={(e) =>
                                          handleIntegrationFollowupChange(optionKey, "purpose", e.target.value)
                                        }
                                        placeholder={isFinnish ? "Kerro lyhyesti, miten integraatiota käytetään..." : "Tell us briefly how the integration is used..."}
                                        rows={3}
                                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-white/20 transition-colors resize-none"
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : field.type === "multiselect" ? (
                        <div className="space-y-2">
                          {"options" in field && Array.isArray(field.options) && field.options.map((option: string | any) => {
                            const optionValue = typeof option === "string" ? option : option.key || option.value || option.label || option;
                            const optionLabel = typeof option === "string" ? option : option.label || option.value || option;
                            const isSelected = (
                              formData[field.name as keyof FormData] as string[]
                            ).includes(optionValue);
                            const description = field.name === "additionalServices" 
                              ? ADDITIONAL_SERVICES_DESCRIPTIONS_TRANSLATED[optionValue] 
                              : undefined;
                            return (
                              <label
                                key={optionValue}
                                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                                  isSelected
                                    ? "bg-white/10 border-white/20"
                                    : "bg-black/40 border-white/10 hover:bg-black/60"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() =>
                                    handleMultiSelectChange(field.name, optionValue)
                                  }
                                  className="w-4 h-4 mt-0.5 text-white bg-black/40 border-white/20 rounded focus:ring-white/20 shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                  <span className="text-white text-sm block">{optionLabel}</span>
                                  {description && (
                                    <span className="text-gray-400 text-xs block mt-1">{description}</span>
                                  )}
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      ) : (
                        <input
                          type={field.type || "text"}
                          name={field.name}
                          value={(formData[field.name as keyof FormData] as string) || ""}
                          onChange={(e) => handleInputChange(e, field.name)}
                          placeholder={"placeholder" in field ? field.placeholder : undefined}
                          required={field.required}
                          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors"
                        />
                      )}
                      {"microcopy" in field && field.microcopy && (
                        <p className="text-sm text-neutral-400 mt-2">
                          {field.microcopy}
                        </p>
                      )}
                    </div>
                  );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Navigation */}
          {submitStatus === "idle" && (
            <div className="border-t border-white/10">
              {/* Tip text */}
              <div className="px-4 sm:px-6 pt-3 sm:pt-4 pb-2 sm:pb-3">
                <p className="text-xs text-gray-400 leading-relaxed text-center">
                  {isFinnish 
                    ? "Vinkki: Mitä tarkemmin vastaat kysymyksiin, sitä nopeammin pääsemme käynnistämään projektin ja varmistamaan täydellisen lopputuloksen."
                    : "Tip: The more detailed your answers, the faster we can start the project and ensure a perfect outcome."}
                </p>
              </div>

              {/* Progress bar and buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 px-4 sm:px-6 pb-4 sm:pb-6">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 rounded-lg bg-black/40 border border-white/10 text-white hover:bg-black/60 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                <ChevronLeft className="w-4 h-4" />
                {isFinnish ? "Edellinen" : "Previous"}
              </button>

              <div className="flex gap-1.5 sm:gap-2 order-first sm:order-none">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${
                      index === currentStep
                        ? "bg-white"
                        : index < currentStep
                        ? "bg-white/50"
                        : "bg-white/20"
                    }`}
                  />
                ))}
              </div>

              {currentStep < totalSteps - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 rounded-lg bg-white text-black hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm sm:text-base"
                >
                  {isFinnish ? "Seuraava" : "Next"}
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 sm:py-2 rounded-lg bg-white text-black hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-black/70 border-t-transparent" />
                      {isFinnish ? "Lähetetään..." : "Sending..."}
                    </>
                  ) : (
                    <>
                      {isFinnish ? "Lähetä hakemus" : "Submit application"}
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default WebsiteInquiryForm;

