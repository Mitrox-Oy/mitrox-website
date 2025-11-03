import React, { useState, useRef, useEffect } from "react";
import { X, Send, ChevronRight, ChevronLeft, ChevronDown } from "lucide-react";

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
  "Laajennettu SEO-optimointi – 69 €/kk",
  "Ei lisäpalveluita tällä hetkellä",
];

const ADDITIONAL_SERVICES_DESCRIPTIONS: { [key: string]: string } = {
  "Mitrox Advisor – 55 €/kk alkaen": "24/7 verkkosivun asiakasavustaja, joka vastaa kävijöiden kysymyksiin ja ohjaa oikeaan suuntaan.",
  "Lisäkieli (Suomi ↔ Englanti) – 199 € alkaen": "Ammattitason käännös ja viimeistely viidelle sivulle, sisältäen SEO-optimoinnin.",
  "Laajennettu SEO-optimointi – 69 €/kk": "Jatkuva hakukonenäkyvyyden kehitys ja säännölliset raportit.",
};

const WebsiteInquiryForm: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
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
    message: "",
    additionalServices: [],
    additionalRequests: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

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
    const NO_SERVICES = "Ei lisäpalveluita tällä hetkellä";
    
    // Don't auto-select if user has explicitly chosen "Ei lisäpalveluita"
    if (formData.additionalServices.includes(NO_SERVICES)) {
      return;
    }

    const hasBothLanguages = formData.languages.includes("Suomi") && formData.languages.includes("Englanti");
    const needsExtendedSEO = formData.seo === "Kyllä, tarvitsen laajempaa SEO-optimointia";
    const hasMitroxAdvisor = formData.integrations.includes("mitrox_advisor");
    
    const languageService = "Lisäkieli (Suomi ↔ Englanti) – 199 € alkaen";
    const seoService = "Laajennettu SEO-optimointi – 69 €/kk";
    const advisorService = "Mitrox Advisor – 55 €/kk alkaen";
    
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
  }, [formData.languages, formData.seo, formData.integrations]);

  const steps = [
    {
      title: "Yrityksen perustiedot",
      microcopy: "Tämä auttaa meitä ymmärtämään yrityksesi ydintä ja kohdentamaan sivuston oikein.",
      fields: [
        {
          name: "companyName",
          label: "Yrityksen nimi *",
          type: "text",
          required: true,
        },
        {
          name: "industry",
          label: "Toimiala *",
          type: "text",
          placeholder: "Esim. Teknologia, Ravintola, Konsultointi...",
          required: true,
        },
        {
          name: "targetAudience",
          label: "Kohdeyleisö *",
          type: "textarea",
          placeholder: "Kuka käyttää verkkosivustoa (esim. B2B-asiakkaat, kuluttajat, tietyt ikäryhmät...)",
          required: true,
        },
        {
          name: "companyImage",
          label: "Millaisen ensivaikutelman haluat antaa verkossa? *",
          type: "select",
          options: [
            "Ammattimainen ja luotettava",
            "Innovatiivinen ja moderni",
            "Lämmin ja helposti lähestyttävä",
            "Ylellinen ja viimeistelty",
            "Rohkea ja erottuva",
            "Asiantunteva ja selkeä",
            "En osaa sanoa – ehdottakaa meille sopivaa linjaa",
          ],
          microcopy: "Ensivaikutelma auttaa meitä linjaamaan koko sivuston.",
          required: true,
        },
        {
          name: "companyImageOther",
          label: "Kerro tarkemmin",
          type: "textarea",
          placeholder: "Jos valitsit 'Jokin muu', kerro tarkemmin...",
        },
      ],
    },
    {
      title: "Verkkosivun tavoite",
      microcopy: "Kun tiedämme tavoitteesi, voimme rakentaa sivuston, joka tukee liiketoimintaasi suoraan.",
      fields: [
        {
          name: "mainGoals",
          label: "Mikä on verkkosivuston tärkein tavoite? (voi valita useita) *",
          type: "multiselect",
          options: GOALS_OPTIONS,
          required: true,
        },
      ],
    },
    {
      title: "Visuaalinen tyyli ja äänensävy",
      microcopy: "Tyyli ja sävy vaikuttavat kaikkeen – kuvamaailmaan, väreihin ja viestinnän rytmiin.",
      fields: [
        {
          name: "designStyle",
          label: "Millaiselta haluat sivustosi tuntuvan? *",
          type: "select",
          options: [
            "Moderni ja minimalistinen",
            "Klassinen ja ammattimainen",
            "Luova ja uniikki",
            "Ylellinen ja premium",
            "Yrityksellinen ja luotettava",
            "Värikäs ja energinen",
            "Rauhallinen ja luonnonläheinen",
            "Avoin ehdotuksille",
          ],
          microcopy: "Tunne vaikuttaa kuvamaailmaan, väreihin ja asetteluun.",
          required: true,
        },
        {
          name: "colorPreferences",
          label: "Värimieltymykset tai brändivärit",
          type: "textarea",
          placeholder: "Esim. sininen ja valkoinen, luonnon sävyt...",
        },
        {
          name: "referenceSites",
          label: "Inspiraatiosivustot tai esimerkit",
          type: "textarea",
          placeholder: "Linkitä verkkosivustoja, joiden tyyli miellyttää sinua.",
        },
        {
          name: "toneOfVoice",
          label: "Millaisella äänensävyllä haluat sivustosi puhuvan? *",
          type: "select",
          options: [
            "Asiantunteva ja selkeä",
            "Rauhallinen ja luottamusta herättävä",
            "Lämmin ja helposti lähestyttävä",
            "Luova ja rento",
            "Energinen ja rohkea",
            "Ylellinen ja viimeistelty",
            "En ole varma – ehdota sopivaa tyyliä",
          ],
          microcopy: "Äänensävy ohjaa kaikkea kirjoitusta ja viestinnän rytmiä.",
          required: true,
        },
      ],
    },
    {
      title: "Sivut ja sisältö",
      microcopy: "Mitä selkeämmin määrittelet sisällön, sitä vähemmän tarvitaan korjauskierroksia.",
      fields: [
        {
          name: "requiredPages",
          label: "Mitkä sivut tarvitaan? (voi valita useita) *",
          type: "multiselect",
          options: PAGE_OPTIONS,
          required: true,
        },
        {
          name: "contentOwnership",
          label: "Miten haluat hoitaa sivuston sisällön? *",
          helper: "Kuvat, tekstit ja tarina yrityksestäsi.",
          type: "select",
          options: [
            "Me hoidamme kaiken sisällön puolestasi",
            "Toimitamme sisällön itse",
            "Tehdään yhdessä",
            "Tarvitsemme apua sisällön suunnittelussa",
          ],
          microcopy: "Valintasi määrittää tekstityön ja kuvatuotannon laajuuden.",
          required: true,
        },
        {
          name: "uniqueSellingPoint",
          label: "Mikä tekee yrityksestäsi ainutlaatuisen? *",
          type: "textarea",
          placeholder: "Kerro lyhyesti, miksi asiakkaan tulisi valita juuri teidät.",
          required: true,
        },
        {
          name: "specialFeatures",
          label: "Erityistoiminnot tai vaatimukset",
          type: "textarea",
          placeholder: "Esimerkiksi galleria, varausjärjestelmä, kartta, integraatiot...",
        },
      ],
    },
    {
      title: "Tekniset ja toiminnalliset integraatiot",
      intro: "Valitse vain tarpeelliset. Me hoidamme suorituskyvyn, suojauksen ja analytiikan puolestasi.",
      microcopy: "Valinnat auttavat mitoittamaan projektin oikein ja nopeuttavat toteutusta.",
      fields: [
        {
          name: "integrations",
          label: "Mitkä integraatiot tarvitaan? (voi valita useita)",
          type: "multiselect_with_followups",
          options: INTEGRATION_OPTIONS,
        },
        {
          name: "languages",
          label: "Kielet *",
          type: "multiselect",
          options: ["Suomi", "Englanti"],
          required: true,
        },
        {
          name: "seo",
          label: "Hakukoneoptimointi (SEO) *",
          type: "select",
          options: [
            "Kyllä, tarvitsen laajempaa SEO-optimointia",
            "Perustaso riittää (sisältyy palveluun)",
          ],
          required: true,
        },
      ],
    },
    {
      title: "Aikataulu ja yhteystiedot",
      microcopy: "Aikataulu auttaa meitä priorisoimaan työsi heti oikealle tuotantolinjalle.",
      fields: [
        {
          name: "timeline",
          label: "Aikataulu tai julkaisuajankohta",
          type: "select",
          options: [
            "Heti kun valmista",
            "Seuraavan kuukauden sisällä",
            "2 kuukauden sisällä",
            "Ei kiirettä",
          ],
        },
        {
          name: "name",
          label: "Nimi *",
          type: "text",
          required: true,
        },
        {
          name: "email",
          label: "Sähköposti *",
          type: "email",
          required: true,
        },
        {
          name: "phone",
          label: "Puhelinnumero",
          type: "tel",
        },
        {
          name: "message",
          label: "Lisätietoja tai kysymyksiä",
          type: "textarea",
          placeholder: "Kerro lisää projektista, aikatauluista tai muista toiveista...",
        },
      ],
    },
    {
      title: "Lisäpalvelut",
      microcopy: "Valinnat auttavat mitoittamaan projektin ja resursoinnin juuri sinun tarpeisiisi.",
      fields: [
        {
          name: "additionalServices",
          label: "Mitkä lisäpalvelut kiinnostavat sinua? *",
          type: "multiselect",
          options: ADDITIONAL_SERVICES_OPTIONS,
          required: true,
        },
        {
          name: "additionalRequests",
          label: "Muita toiveita tai erikoistarpeita?",
          type: "textarea",
          placeholder: "Esimerkiksi lisätoiminnallisuudet, integraatiot tai laajempi sisältötyö.",
        },
      ],
    },
  ];

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
      const NO_SERVICES = "Ei lisäpalveluita tällä hetkellä";
      
      // Special handling for additional services
      if (fieldName === "additionalServices") {
        if (value === NO_SERVICES) {
          // If "Ei lisäpalveluita" is clicked, toggle it and remove all others
          if (current.includes(NO_SERVICES)) {
            // If already selected, just deselect it
            return { ...prev, [fieldName]: [] };
          } else {
            // Select only "Ei lisäpalveluita"
            return { ...prev, [fieldName]: [NO_SERVICES] };
          }
        } else {
          // If any other service is clicked
          let newValue = current.includes(value)
            ? current.filter((item) => item !== value)
            : [...current, value];
          
          // Remove "Ei lisäpalveluita" if any other service is selected
          newValue = newValue.filter((item) => item !== NO_SERVICES);
          
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
            const integration = INTEGRATION_OPTIONS.find((opt) => opt.key === key);
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
            const integration = INTEGRATION_OPTIONS.find((opt) => opt.key === key);
            return integration?.label || key;
          }).join(", ") : "Ei"}
Kielet: ${formData.languages.join(", ")}
SEO: ${formData.seo}

Aikataulu: ${formData.timeline || "Ei määritelty"}

Lisäpalvelut: ${formData.additionalServices.length > 0 ? formData.additionalServices.join(", ") : "Ei"}
Muita toiveita: ${formData.additionalRequests || "Ei"}

Yhteystiedot:
Nimi: ${formData.name}
Sähköposti: ${formData.email}
Puhelin: ${formData.phone || "Ei määritelty"}

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
          access_key: "193da3a3-3009-437b-8d44-2c1a539273fb",
          subject: `Verkkosivuhakemus: ${formData.companyName}`,
          from_name: formData.name,
          from_email: formData.email,
          to: "info@mitrox.io",
          // Send structured JSON for AI processing
          data: JSON.stringify(formattedData),
          // Human-readable email body
          message: formattedData.summary,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        // Reset form after 3 seconds
        setTimeout(() => {
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
            message: "",
            additionalServices: [],
            additionalRequests: "",
          });
          setCurrentStep(0);
          setTimeout(() => {
            onClose();
            setSubmitStatus("idle");
          }, 2000);
        }, 3000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-black rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-2xl font-medium text-white mb-1">
              Verkkosivuhakemus
            </h2>
            <p className="text-sm text-gray-400">
              Vaihe {currentStep + 1} / {totalSteps}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/60 border border-white/20 hover:bg-black/80 transition-colors text-white"
            aria-label="Sulje"
          >
            <X className="w-5 h-5" />
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
          <div className="p-6">
            {submitStatus === "success" ? (
              <div className="text-center py-12">
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
                  Hakemus lähetetty!
                </h3>
                <p className="text-gray-400">
                  Otamme sinuun yhteyttä mahdollisimman pian.
                </p>
              </div>
            ) : submitStatus === "error" ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                  <X className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">
                  Virhe lähetyksessä
                </h3>
                <p className="text-gray-400 mb-4">
                  Jotain meni pieleen. Yritä hetken päästä uudelleen.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitStatus("idle")}
                  className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Yritä uudelleen
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-medium text-white mb-6">
                  {steps[currentStep].title}
                </h3>

                {"intro" in steps[currentStep] && steps[currentStep].intro && (
                  <p className="text-sm text-white/70 mb-4">
                    {steps[currentStep].intro}
                  </p>
                )}

                {steps[currentStep].microcopy && (
                  <p className="text-sm text-neutral-400 mt-3 mb-6 italic">
                    {steps[currentStep].microcopy}
                  </p>
                )}

                <div className="space-y-6">
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
                              {(formData[field.name as keyof FormData] as string) || "Valitse..."}
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
                                        Palvelu tai työkalu
                                      </label>
                                      <input
                                        type="text"
                                        value={followupData.provider}
                                        onChange={(e) =>
                                          handleIntegrationFollowupChange(optionKey, "provider", e.target.value)
                                        }
                                        placeholder={option.placeholder || "Esim. Mailchimp, Calendly..."}
                                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-white/20 transition-colors"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-xs font-medium text-gray-300 mb-2">
                                        Onko teillä jo tili?
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
                                            {followupData.haveAccount || "Valitse..."}
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
                                                handleIntegrationFollowupChange(optionKey, "haveAccount", "Kyllä");
                                                setOpenDropdowns((prev) => ({ ...prev, [`${optionKey}_haveAccount`]: false }));
                                              }}
                                              className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                                                followupData.haveAccount === "Kyllä"
                                                  ? "bg-white/10 text-white"
                                                  : "text-gray-300 hover:bg-white/5 hover:text-white"
                                              }`}
                                            >
                                              Kyllä
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                handleIntegrationFollowupChange(optionKey, "haveAccount", "Ei");
                                                setOpenDropdowns((prev) => ({ ...prev, [`${optionKey}_haveAccount`]: false }));
                                              }}
                                              className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                                                followupData.haveAccount === "Ei"
                                                  ? "bg-white/10 text-white"
                                                  : "text-gray-300 hover:bg-white/5 hover:text-white"
                                              }`}
                                            >
                                              Ei
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    <div>
                                      <label className="block text-xs font-medium text-gray-300 mb-2">
                                        Lyhyt kuvaus tarpeesta
                                      </label>
                                      <textarea
                                        value={followupData.purpose}
                                        onChange={(e) =>
                                          handleIntegrationFollowupChange(optionKey, "purpose", e.target.value)
                                        }
                                        placeholder="Kerro lyhyesti, miten integraatiota käytetään..."
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
                              ? ADDITIONAL_SERVICES_DESCRIPTIONS[optionValue] 
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
              <div className="px-6 pt-4 pb-3">
                <p className="text-xs text-gray-400 leading-relaxed text-center">
                  Vinkki: Mitä tarkemmin vastaat kysymyksiin, sitä nopeammin pääsemme käynnistämään projektin ja varmistamaan täydellisen lopputuloksen.
                </p>
              </div>

              {/* Progress bar and buttons */}
              <div className="flex items-center justify-between px-6 pb-6">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white hover:bg-black/60 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                Edellinen
              </button>

              <div className="flex gap-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
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
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Seuraava
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                  className="flex items-center gap-2 px-6 py-2 rounded-lg bg-white text-black hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-black/70 border-t-transparent" />
                      Lähetetään...
                    </>
                  ) : (
                    <>
                      Lähetä hakemus
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

