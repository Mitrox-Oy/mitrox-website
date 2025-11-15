// src/DocsWordPressPage.tsx
import DocsPlatformPage from "./components/DocsPlatformPage";

const DocsWordPressPage: React.FC = () => {
  return (
    <DocsPlatformPage
      platformName="wordpress"
      platformNameFi="WordPress"
      platformNameEn="WordPress"
      content={{
        fi: {
          whatYouNeed: [
            "Sinun Mitrox AI Advisor -skriptisi.",
            "Pääsy WordPress Adminiin.",
          ],
          installationSteps: [
            {
              title: "Asennusohjeet (Suositeltu)",
              steps: [
                "Siirry Plugins → Add New.",
                "Asenna \"Insert Headers and Footers\" tai \"WPCode\".",
                "Avaa laajennuksen asetukset.",
                "Siirry Footer-osion.",
                "Liitä skriptisi.",
                "Tallenna.",
              ],
            },
          ],
          troubleshooting: [
            {
              title: "Widget ei näy",
              items: [
                "Lisää tämä kohtaan Appearance → Customize → Additional CSS:",
              ],
              code: `.voiceflow-chat, .vfrc-launcher {
  z-index: 999999 !important;
  display: block !important;
  visibility: visible !important;
}`,
            },
            {
              title: "Syöttökentän tausta tumma",
              items: [],
              code: `.vfrc-footer, .vfrc-input {
  background: white !important;
}`,
            },
          ],
        },
        en: {
          whatYouNeed: [
            "Your Mitrox AI Advisor script.",
            "Access to WordPress Admin.",
          ],
          installationSteps: [
            {
              title: "Installation Steps (Recommended)",
              steps: [
                "Go to Plugins → Add New.",
                "Install \"Insert Headers and Footers\" or \"WPCode\".",
                "Open the plugin settings.",
                "Scroll to Footer.",
                "Paste your script.",
                "Save.",
              ],
            },
          ],
          troubleshooting: [
            {
              title: "Widget invisible",
              items: [
                "Add this under Appearance → Customize → Additional CSS:",
              ],
              code: `.voiceflow-chat, .vfrc-launcher {
  z-index: 999999 !important;
  display: block !important;
  visibility: visible !important;
}`,
            },
            {
              title: "Input bar background dark",
              items: [],
              code: `.vfrc-footer, .vfrc-input {
  background: white !important;
}`,
            },
          ],
        },
      }}
    />
  );
};

export default DocsWordPressPage;

