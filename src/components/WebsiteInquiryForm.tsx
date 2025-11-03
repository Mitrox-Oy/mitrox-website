import React, { useState } from "react";
import { X, Send, ChevronRight, ChevronLeft } from "lucide-react";

interface FormData {
  // Yrityksen perustiedot
  companyName: string;
  industry: string;
  targetAudience: string;
  
  // Verkkosivun tarkoitus
  websitePurpose: string[];
  mainGoals: string[];
  
  // Visuaalinen tyyli
  designStyle: string;
  colorPreferences: string;
  referenceSites: string;
  
  // Sivut ja sisältö
  requiredPages: string[];
  contentOwnership: string;
  specialFeatures: string;
  
  // Tekniset vaatimukset
  integrations: string[];
  languages: string[];
  seo: string;
  
  // Yhteystiedot
  name: string;
  email: string;
  phone: string;
  message: string;
}

const PURPOSE_OPTIONS = [
  "Markkinointi ja brändäys",
  "Myynnin kasvattaminen",
  "Asiakaspalvelu",
  "Tuotteiden/palveluiden esittely",
  "Yhteystietojen jakaminen",
  "Bloggaus/sisällöntuotanto",
];

const GOALS_OPTIONS = [
  "Liidien keräys",
  "Asiakaspalvelun automaatio",
  "Tuotteen/palvelun esittely",
  "Brändin vahvistaminen",
  "Asiakkaiden tietoisuuden lisääminen",
];

const PAGE_OPTIONS = [
  "Etusivu",
  "Tietoa meistä",
  "Tuotteet/Palvelut",
  "Yhteystiedot",
  "Blog",
  "Galleria/Portfolio",
  "FAQ",
  "Hinnoittelu",
];

const INTEGRATION_OPTIONS = [
  "Sähköpostilistat (MailChimp, HubSpot, jne.)",
  "CRM-järjestelmät",
  "Sosiaalisen median integraatiot",
  "Varausjärjestelmät",
  "Mitrox AI Advisor",
];

const WebsiteInquiryForm: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    industry: "",
    targetAudience: "",
    websitePurpose: [],
    mainGoals: [],
    designStyle: "",
    colorPreferences: "",
    referenceSites: "",
    requiredPages: [],
    contentOwnership: "",
    specialFeatures: "",
    integrations: [],
    languages: [],
    seo: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const steps = [
    {
      title: "Yrityksen perustiedot",
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
          placeholder: "Kuvittele kuka käyttää verkkosivustoa (esim. B2B-asiakkaat, kuluttajat, tietyt ikäryhmät...)",
          required: true,
        },
      ],
    },
    {
      title: "Verkkosivun tarkoitus",
      fields: [
        {
          name: "websitePurpose",
          label: "Mikä on verkkosivuston pääasiallinen tarkoitus? (voi valita useita) *",
          type: "multiselect",
          options: PURPOSE_OPTIONS,
          required: true,
        },
        {
          name: "mainGoals",
          label: "Mitkä ovat verkkosivuston tärkeimmät tavoitteet? (voi valita useita) *",
          type: "multiselect",
          options: GOALS_OPTIONS,
          required: true,
        },
      ],
    },
    {
      title: "Visuaalinen tyyli",
      fields: [
        {
          name: "designStyle",
          label: "Minkälainen visuaalinen tyyli kiinnostaa? *",
          type: "select",
          options: [
            "Moderni ja minimalistinen",
            "Klassinen ja ammattimainen",
            "Värikäs ja eloisa",
            "Yrityksellinen ja luotettava",
            "Luova ja uniikki",
            "En ole varma, avoin ehdotuksille",
          ],
          required: true,
        },
        {
          name: "colorPreferences",
          label: "Värimieltymykset tai brändivärit",
          type: "textarea",
          placeholder: "Kerro brändiväreistäsi tai minkälaisia värejä haluat käyttää (esim. sininen ja valkoinen, luonnon sävyt...)",
        },
        {
          name: "referenceSites",
          label: "Ongelma-sivustot tai inspiraatio",
          type: "textarea",
          placeholder: "Jos sinulla on verkkosivustoja, joiden tyyli inspiroi sinua, jaa linkit tähän.",
        },
      ],
    },
    {
      title: "Sivut ja sisältö",
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
          label: "Kuka vastaa sisällön tuottamisesta? *",
          type: "select",
          options: [
            "Me tuotamme kaiken sisällön",
            "Asiakas tuottaa sisällön",
            "Yhteistyötä molempien välillä",
            "Tarvitsemme apua sisällön kanssa",
          ],
          required: true,
        },
        {
          name: "specialFeatures",
          label: "Erityistoiminnot tai vaatimukset",
          type: "textarea",
          placeholder: "Esimerkiksi: galleria, lomakkeet, varausjärjestelmä, kartta, integraatiot...",
        },
      ],
    },
    {
      title: "Tekniset vaatimukset",
      fields: [
        {
          name: "integrations",
          label: "Tarvitaanko integraatioita? (voi valita useita)",
          type: "multiselect",
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
      title: "Yhteystiedot ja viesti",
      fields: [
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
      const newValue = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [fieldName]: newValue };
    });
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
        },
        website_requirements: {
          purpose: formData.websitePurpose,
          goals: formData.mainGoals,
          pages: formData.requiredPages,
          languages: formData.languages,
        },
        design_preferences: {
          style: formData.designStyle,
          colors: formData.colorPreferences,
          references: formData.referenceSites,
        },
        technical: {
          integrations: formData.integrations,
          seo: formData.seo,
          special_features: formData.specialFeatures,
        },
        content: {
          ownership: formData.contentOwnership,
        },
        contact: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
        // Human-readable summary for email
        summary: `
Yritys: ${formData.companyName}
Toimiala: ${formData.industry}
Kohdeyleisö: ${formData.targetAudience}

Verkkosivun tarkoitus: ${formData.websitePurpose.join(", ")}
Tavoitteet: ${formData.mainGoals.join(", ")}

Design-tyyli: ${formData.designStyle}
Värit: ${formData.colorPreferences || "Ei määritelty"}
Inspiraatio: ${formData.referenceSites || "Ei määritelty"}

Sivut: ${formData.requiredPages.join(", ")}
Sisällön tuottaja: ${formData.contentOwnership}
Erityistoiminnot: ${formData.specialFeatures || "Ei"}

Integraatiot: ${formData.integrations.length > 0 ? formData.integrations.join(", ") : "Ei"}
Kielet: ${formData.languages.join(", ")}
SEO: ${formData.seo}

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
            websitePurpose: [],
            mainGoals: [],
            designStyle: "",
            colorPreferences: "",
            referenceSites: "",
            requiredPages: [],
            contentOwnership: "",
            specialFeatures: "",
            integrations: [],
            languages: [],
            seo: "",
            name: "",
            email: "",
            phone: "",
            message: "",
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
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
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

                <div className="space-y-6">
                  {steps[currentStep].fields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {field.label}
                      </label>

                      {field.type === "textarea" ? (
                        <textarea
                          name={field.name}
                          value={(formData[field.name as keyof FormData] as string) || ""}
                          onChange={(e) => handleInputChange(e, field.name)}
                          placeholder={"placeholder" in field ? field.placeholder : undefined}
                          required={field.required}
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors resize-none"
                        />
                      ) : field.type === "select" ? (
                        <select
                          name={field.name}
                          value={(formData[field.name as keyof FormData] as string) || ""}
                          onChange={(e) => handleInputChange(e, field.name)}
                          required={field.required}
                          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-white/20 transition-colors"
                        >
                          <option value="">Valitse...</option>
                          {"options" in field && field.options?.map((option: string) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : field.type === "multiselect" ? (
                        <div className="space-y-2">
                          {"options" in field && field.options?.map((option: string) => {
                            const isSelected = (
                              formData[field.name as keyof FormData] as string[]
                            ).includes(option);
                            return (
                              <label
                                key={option}
                                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                                  isSelected
                                    ? "bg-white/10 border-white/20"
                                    : "bg-black/40 border-white/10 hover:bg-black/60"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() =>
                                    handleMultiSelectChange(field.name, option)
                                  }
                                  className="w-4 h-4 text-white bg-black/40 border-white/20 rounded focus:ring-white/20"
                                />
                                <span className="text-white text-sm">{option}</span>
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
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Navigation */}
          {submitStatus === "idle" && (
            <div className="flex items-center justify-between p-6 border-t border-white/10">
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
                  type="submit"
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
          )}
        </form>
      </div>
    </div>
  );
};

export default WebsiteInquiryForm;

