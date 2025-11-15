// src/DocsReactPage.tsx
import DocsPlatformPage from "./components/DocsPlatformPage";

const DocsReactPage: React.FC = () => {
  return (
    <DocsPlatformPage
      platformName="react"
      platformNameFi="React & Next.js"
      platformNameEn="React & Next.js"
      content={{
        fi: {
          whatYouNeed: [
            "Sinun Mitrox AI Advisor -skriptisi.",
            "Pääsy React- tai Next.js -projektiin.",
          ],
          installationSteps: [
            {
              title: "React-asennus",
              steps: [
                "Vaihtoehto 1: Lisää public/index.html-tiedostoon",
                "Avaa public/index.html.",
                "Siirry tiedoston loppuun.",
                "Liitä skriptisi heti ennen </body>-tagia.",
                "Tallenna ja uudelleenrakenna.",
              ],
            },
            {
              title: "Next.js-asennus",
              steps: [
                "Vaihtoehto 1: Käyttäen app-kansiota",
                "Lisää skripti app/layout.js- tai app/layout.tsx-tiedostoon:",
              ],
              code: `<script dangerouslySetInnerHTML={{ __html: \`
  window.voiceflow = window.voiceflow || {};
  window.voiceflow.chat = { ... };
\`}} />
<script src="https://cdn.voiceflow.com/widget/bundle.mjs"></script>`,
            },
            {
              title: "Vaihtoehto 2: Mukautettu Document (pages-kansio)",
              steps: [
                "Käytä _document.js-tiedostoa:",
              ],
              code: `<Head></Head>
<body>
  <Main />
  <NextScript />
  <script dangerouslySetInnerHTML={{ __html: \`
    window.voiceflow = window.voiceflow || {};
    window.voiceflow.chat = { ... };
  \`}} />
  <script src="https://cdn.voiceflow.com/widget/bundle.mjs"></script>
</body>`,
            },
          ],
          troubleshooting: [
            {
              title: "Vianetsintä",
              items: [
                "Varmista, että skriptiä ei renderöidä palvelimella.",
                "Jos widget ei lataudu, vahvista asiakaspuolen suoritus.",
                "Vältä sijoittamista <Head>-osiin.",
              ],
            },
          ],
        },
        en: {
          whatYouNeed: [
            "Your Mitrox AI Advisor script.",
            "Access to your React or Next.js project.",
          ],
          installationSteps: [
            {
              title: "React Installation",
              steps: [
                "Option 1: Add to public/index.html",
                "Open public/index.html.",
                "Scroll to the bottom.",
                "Paste your script right before </body>.",
                "Save and rebuild.",
              ],
            },
            {
              title: "Next.js Installation",
              steps: [
                "Option 1: Using the app directory",
                "Add the script inside app/layout.js or app/layout.tsx:",
              ],
              code: `<script dangerouslySetInnerHTML={{ __html: \`
  window.voiceflow = window.voiceflow || {};
  window.voiceflow.chat = { ... };
\`}} />
<script src="https://cdn.voiceflow.com/widget/bundle.mjs"></script>`,
            },
            {
              title: "Option 2: Custom Document (pages directory)",
              steps: [
                "Use _document.js:",
              ],
              code: `<Head></Head>
<body>
  <Main />
  <NextScript />
  <script dangerouslySetInnerHTML={{ __html: \`
    window.voiceflow = window.voiceflow || {};
    window.voiceflow.chat = { ... };
  \`}} />
  <script src="https://cdn.voiceflow.com/widget/bundle.mjs"></script>
</body>`,
            },
          ],
          troubleshooting: [
            {
              title: "Troubleshooting",
              items: [
                "Ensure the script is not server-rendered.",
                "If widget does not load, confirm client-side execution.",
                "Avoid placing in <Head>.",
              ],
            },
          ],
        },
      }}
    />
  );
};

export default DocsReactPage;

