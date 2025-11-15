// src/DocsWebflowPage.tsx
import DocsPlatformPage from "./components/DocsPlatformPage";

const DocsWebflowPage: React.FC = () => {
  return (
    <DocsPlatformPage
      platformName="webflow"
      platformNameFi="Webflow"
      platformNameEn="Webflow"
      content={{
        fi: {
          whatYouNeed: [
            "Sinun Mitrox AI Advisor -skriptisi.",
            "Pääsy Webflow Project Settingsiin.",
          ],
          installationSteps: [
            {
              title: "Asennusohjeet",
              steps: [
                "Avaa Webflow Dashboard.",
                "Valitse Project → Project Settings.",
                "Siirry Custom Code -välilehteen.",
                "Etsi Footer Code -kenttä.",
                "Liitä koko Mitrox AI Advisor -skriptisi.",
                "Tallenna.",
                "Julkaise sivustosi.",
              ],
            },
          ],
          troubleshooting: [
            {
              title: "Widget ei näy",
              items: [
                "Jos widget ei näy, varmista, että sivustosi on täysin julkaistu (Designer-preview saattaa piilottaa injektoidun koodin).",
                "Varmista, että kiinteät elementit eivät peitä oikean alakulman.",
              ],
            },
          ],
        },
        en: {
          whatYouNeed: [
            "Your Mitrox AI Advisor script.",
            "Access to Webflow Project Settings.",
          ],
          installationSteps: [
            {
              title: "Installation Steps",
              steps: [
                "Open Webflow Dashboard.",
                "Select your Project → Project Settings.",
                "Go to Custom Code tab.",
                "Find the Footer Code field.",
                "Paste your entire Mitrox AI Advisor script.",
                "Save.",
                "Publish your site.",
              ],
            },
          ],
          troubleshooting: [
            {
              title: "Widget does not appear",
              items: [
                "If the widget does not appear, make sure your site is fully published (Designer preview may hide injected code).",
                "Ensure no fixed-position elements overlap the bottom-right corner.",
              ],
            },
          ],
        },
      }}
    />
  );
};

export default DocsWebflowPage;

