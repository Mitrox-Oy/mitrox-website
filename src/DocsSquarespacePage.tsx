// src/DocsSquarespacePage.tsx
import DocsPlatformPage from "./components/DocsPlatformPage";

const DocsSquarespacePage: React.FC = () => {
  return (
    <DocsPlatformPage
      platformName="squarespace"
      platformNameFi="Squarespace"
      platformNameEn="Squarespace"
      content={{
        fi: {
          whatYouNeed: [
            "Sinun Mitrox AI Advisor -skriptisi.",
            "Squarespace-suunnitelma, jossa Code Injection on käytössä.",
          ],
          installationSteps: [
            {
              title: "Asennusohjeet",
              steps: [
                "Kirjaudu Squarespaceen.",
                "Avaa Settings → Advanced → Code Injection.",
                "Siirry Footer-osion.",
                "Liitä koko skriptisi.",
                "Tallenna muutokset.",
              ],
            },
          ],
          troubleshooting: [
            {
              title: "Ongelmia",
              items: [
                "Code Injection toimii vain maksullisilla suunnitelmilla.",
                "Jos widget ei näy, tarkista Design → Custom CSS ristiriitaisilta säännöiltä.",
              ],
            },
          ],
        },
        en: {
          whatYouNeed: [
            "Your Mitrox AI Advisor script.",
            "A Squarespace plan with Code Injection enabled.",
          ],
          installationSteps: [
            {
              title: "Installation Steps",
              steps: [
                "Log in to Squarespace.",
                "Open Settings → Advanced → Code Injection.",
                "Scroll to the Footer section.",
                "Paste your entire script.",
                "Save changes.",
              ],
            },
          ],
          troubleshooting: [
            {
              title: "Troubleshooting",
              items: [
                "Code Injection works only on paid plans.",
                "If the widget doesn't show, check Design → Custom CSS for conflicting rules.",
              ],
            },
          ],
        },
      }}
    />
  );
};

export default DocsSquarespacePage;

