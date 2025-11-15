// src/DocsHTMLPage.tsx
import DocsPlatformPage from "./components/DocsPlatformPage";

const DocsHTMLPage: React.FC = () => {
  return (
    <DocsPlatformPage
      platformName="html"
      platformNameFi="HTML (Räätälöidyt verkkosivut)"
      platformNameEn="HTML (Custom Websites)"
      content={{
        fi: {
          whatYouNeed: [
            "Sinun Mitrox AI Advisor -skriptisi.",
            "Pääsy verkkosivustosi HTML-tiedostoihin.",
          ],
          installationSteps: [
            {
              title: "Asennusohjeet",
              steps: [
                "Avaa pää-HTML-tiedosto (yleensä index.html).",
                "Siirry tiedoston loppuun.",
                "Liitä koko skriptisi heti ennen:",
              ],
              code: `</body>`,
            },
            {
              title: "Tallennus",
              steps: [
                "Tallenna.",
                "Lataa uudelleen tai ota käyttöön sivustosi.",
              ],
            },
          ],
          troubleshooting: [
            {
              title: "Vianetsintä",
              items: [
                "Varmista, että skriptiä ei katkaistu tai automaattisesti muotoiltu väärin.",
                "Poista käytöstä tai säädä Content Security Policy (CSP), joka estää ulkoiset skriptit.",
                "Tarkista selaimen konsoli virheitä varten.",
              ],
            },
          ],
        },
        en: {
          whatYouNeed: [
            "Your Mitrox AI Advisor script.",
            "Access to your website's HTML files.",
          ],
          installationSteps: [
            {
              title: "Installation Steps",
              steps: [
                "Open the main HTML file (usually index.html).",
                "Scroll to the bottom of the file.",
                "Paste your entire script right before:",
              ],
              code: `</body>`,
            },
            {
              title: "Save",
              steps: [
                "Save.",
                "Re-upload or deploy your site.",
              ],
            },
          ],
          troubleshooting: [
            {
              title: "Troubleshooting",
              items: [
                "Make sure the script was not cut off or auto-formatted incorrectly.",
                "Disable or adjust any Content Security Policy (CSP) blocking external scripts.",
                "Check browser console for errors.",
              ],
            },
          ],
        },
      }}
    />
  );
};

export default DocsHTMLPage;

