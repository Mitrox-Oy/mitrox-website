// src/DocsNetlifyPage.tsx
import DocsPlatformPage from "./components/DocsPlatformPage";

const DocsNetlifyPage: React.FC = () => {
  return (
    <DocsPlatformPage
      platformName="netlify"
      platformNameFi="Netlify"
      platformNameEn="Netlify"
      content={{
        fi: {
          whatYouNeed: [
            "Sinun Mitrox AI Advisor -skriptisi.",
            "Pääsy projektikansioon.",
          ],
          installationSteps: [
            {
              title: "Vaihtoehto 1: Staattinen HTML-sivusto",
              steps: [
                "Avaa projektikansiosi.",
                "Siirry public-kansioon.",
                "Avaa index.html.",
                "Liitä skriptisi heti ennen </body>-tagia.",
                "Ota käyttöön tai ota uudelleen käyttöön sivustosi.",
              ],
            },
            {
              title: "Vaihtoehto 2: Framework-sivusto (React, Next.js, Vue)",
              steps: [
                "Käytä React-oppasta, jos sivustosi käyttää modernia frameworkia.",
              ],
            },
          ],
          troubleshooting: [
            {
              title: "Vianetsintä",
              items: [
                "Varmista, että Netlify ei minimoinut tai poistanut skriptejä buildin aikana.",
                "Tarkista selaimen konsoli estetyistä skripteistä tai CSP-virheistä.",
              ],
            },
          ],
        },
        en: {
          whatYouNeed: [
            "Your Mitrox AI Advisor script.",
            "Access to your project folder.",
          ],
          installationSteps: [
            {
              title: "Option 1: Static HTML Site",
              steps: [
                "Open your project folder.",
                "Go to the public directory.",
                "Open index.html.",
                "Paste your script right before </body>.",
                "Deploy or redeploy your site.",
              ],
            },
            {
              title: "Option 2: Framework Site (React, Next.js, Vue)",
              steps: [
                "Use the dedicated React guide if your site uses a modern framework.",
              ],
            },
          ],
          troubleshooting: [
            {
              title: "Troubleshooting",
              items: [
                "Confirm that Netlify did not minify or remove scripts during build.",
                "Check browser console for blocked scripts or CSP errors.",
              ],
            },
          ],
        },
      }}
    />
  );
};

export default DocsNetlifyPage;

