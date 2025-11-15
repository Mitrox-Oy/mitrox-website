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
          overview: "Tämä opas on tarkoitettu tiimeille, jotka rakentavat verkkosivustonsa tai sovelluksensa Reactilla tai Next.js:llä. Tavoitteena on pitää kaikki rauhallista, yksinkertaista ja ystävällistä – vaikka et olisikaan kehittäjä. Jos osaat avata tiedoston ja liittää koodinpätkän, olet valmis.\n\nMitrox AI Advisorin voi lisätä mihin tahansa React- tai Next.js-projektiin pienellä skriptillä. Asetat skriptin tiedostoon, joka jaetaan kaikkien sivujen kesken (layout tai pää-HTML), sitten julkaiset sovelluksen uudelleen. Tämän jälkeen chat-kupla ilmestyy automaattisesti kaikkialle.",
          whatYouNeed: [
            "Sinun Mitrox AI Advisor -skriptisi.",
            "Pääsy React- tai Next.js -projektiin.",
          ],
          installationSteps: [
            {
              title: "Osa 1: React (Create React App, Vite ym.)",
              steps: [
                "Ajatus: Useimmissa React-asetuksissa on `public/index.html` -tiedosto, joka käärii koko sovelluksen. Kaikki mitä lisäät sinne (body-osaan) on mukana kaikilla sivuilla.",
                "",
                "1. Avaa projekti editorissa (esim. VS Code).",
                "2. Etsi `public/index.html`.",
                "3. Avaa tiedosto ja vieritä loppuun, kunnes näet `</body>`.",
                "4. Liitä koko Mitrox-skripti **heti ennen** `</body>`-tagia.",
                "5. Tallenna.",
                "6. Aja normaali build ja julkaisu (Netlify, Vercel tms.).",
                "7. Testaa, että chat-kupla näkyy julkaistulla sivulla.",
              ],
              code: `  <div id="root"></div>

  <script type="text/javascript">
    window.voiceflow = window.voiceflow || {};
    window.voiceflow.chat = { ... };
  </script>
  <script src="https://cdn.voiceflow.com/widget/bundle.mjs"></script>
</body>`,
            },
            {
              title: "Osa 2: Next.js – App Router (app/)",
              steps: [
                "Ajatus: App Router -projekteissa `app/layout.tsx` tai `app/layout.js` määrittelee yhteisen rakenteen. Kun skripti lisätään body-osaan, se toimii kaikilla reiteillä.",
                "",
                "Tärkeä huomio: Skriptin täytyy ajaa **selaimessa**, ei palvelinpuolen renderöinnin aikana. Teemme tämän käyttämällä `<script>`-tageja, jotka selain suorittaa.",
                "",
                "1. Avaa `app/layout.tsx` tai `app/layout.js`.",
                "2. Etsi `<body>`-osio.",
                "3. Lisää skriptit bodyyn esimerkiksi näin:",
              ],
              code: `<body>
  {children}
  <script
    dangerouslySetInnerHTML={{
      __html: \`
        window.voiceflow = window.voiceflow || {};
        window.voiceflow.chat = { ... };
      \`,
    }}
  />
  <script src="https://cdn.voiceflow.com/widget/bundle.mjs"></script>
</body>`,
              note: "Tämä varmistaa:\n• Sovelluksen sisältö renderöityy (`{children}`)\n• Sitten AI Advisor ladataan\n• Widget näkyy kaikilla sivuilla",
            },
            {
              title: "Osa 3: Next.js – Pages Router (pages/)",
              steps: [
                "Ajatus: Pages Router -projekteissa `_document.tsx` (tai `_document.js`) hallitsee HTML-rakennetta. Sinne voidaan lisätä skripti body-osaan, jolloin se on mukana kaikilla sivuilla.",
                "",
                "1. Avaa tai luo `pages/_document.tsx` tai `pages/_document.js`.",
                "2. Käytä Nextin dokumentaation mukaista pohjaa ja lisää skriptit bodyyn:",
              ],
              code: `import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: \`
              window.voiceflow = window.voiceflow || {};
              window.voiceflow.chat = { ... };
            \`,
          }}
        />
        <script src="https://cdn.voiceflow.com/widget/bundle.mjs"></script>
      </body>
    </Html>
  );
}`,
            },
          ],
          howToTest: [
            {
              steps: [
                "Avaa julkaistu sivusto (ei localhost, jos mahdollista).",
                "Tee kova päivitys (Ctrl/Cmd + Shift + R).",
                "Odota sekunti tai kaksi.",
                "Mitrox AI Advisor -kupla pitäisi näkyä näytön kulmassa.",
                "Klikkaa sitä ja lähetä testiviesti.",
              ],
            },
          ],
          troubleshooting: [
            {
              title: "Chat-kupla ei näy lainkaan",
              items: [
                "Tarkista:",
                "• Onko uusin koodi varmasti deployattu? (build valmis, ei virheitä)",
                "• Onhan skripti body-osassa, ei Headissa?",
                "• Näkyykö selaimen konsolissa virheitä (DevTools)?",
                "• Estääkö AdBlock tai muu lisäosa skriptejä?",
              ],
            },
            {
              title: "Chat näkyy vain joillain sivuilla",
              items: [
                "Skripti on todennäköisesti lisätty vain yhteen komponenttiin eikä yhteiseen pohjaan.",
                "Siirrä skripti:",
                "• React: `public/index.html`",
                "• Next App Router: `app/layout.tsx`",
                "• Next Pages Router: `_document.tsx`",
              ],
            },
            {
              title: "Ulkoasu tai asettelu näyttää oudolta",
              items: [
                "Kyseessä on usein CSS-ristiriita. Mitrox voi säätää tyylejä puolestasi.",
              ],
            },
          ],
          needHelp: "Jos haluat, Mitrox voi lisätä AI Advisorin suoraan React- tai Next.js-projektiisi ja varmistaa, että kaikki toimii sekä desktopilla että mobiilissa.",
        },
        en: {
          overview: "This guide is for teams building their website or app with React or Next.js. The goal is to keep everything calm, simple, and friendly – even if you're not a developer. If you can open a file and paste a code snippet, you're good.\n\nMitrox AI Advisor can be added to any React or Next.js project with a small script. You place the script in a file that is shared across all pages (layout or main HTML), then redeploy your app. After that, the chat bubble appears automatically everywhere.",
          whatYouNeed: [
            "Your Mitrox AI Advisor script.",
            "Access to your React or Next.js project.",
          ],
          installationSteps: [
            {
              title: "Part 1: React (Create React App / Vite / similar)",
              steps: [
                "Idea: In most React setups, there is a `public/index.html` file that wraps the whole app. Anything you add there (in the body) will be present on all pages.",
                "",
                "1. Open your project in your code editor (Use VS Code or your preferred editor).",
                "2. Locate `public/index.html` (In a typical React project, this file is in the `public` folder).",
                "3. Open `index.html` and scroll to the bottom (Look for the closing body tag).",
                "4. Paste the full Mitrox script right BEFORE </body>.",
                "5. Save the file (Make sure nothing is cut off or changed).",
                "6. Rebuild and deploy your app (Run your normal build and deployment steps, for example `npm run build` and then deploy to Netlify, Vercel, etc.).",
                "7. Test on the live site (Open the deployed app, refresh, and check for the chat bubble in the corner).",
              ],
              code: `  <div id="root"></div>

  <script type="text/javascript">
    window.voiceflow = window.voiceflow || {};
    window.voiceflow.chat = { ... };
  </script>
  <script src="https://cdn.voiceflow.com/widget/bundle.mjs"></script>
</body>`,
            },
            {
              title: "Part 2: Next.js (App Router – `app/` directory)",
              steps: [
                "Idea: In the App Router, you usually have a `app/layout.tsx` or `app/layout.js` file. This wraps every page. We'll use this to inject the script so that it exists on all routes.",
                "",
                "Important note: The script must run in the **browser**, not during server-side rendering. We do this by using `<script>` tags that the browser executes.",
                "",
                "1. Open `app/layout.tsx` or `app/layout.js` (This is usually at the root of the `app` folder).",
                "2. Inside the `<body>` section, add the following:",
              ],
              code: `<body>
  {children}
  <script
    dangerouslySetInnerHTML={{
      __html: \`
        window.voiceflow = window.voiceflow || {};
        window.voiceflow.chat = { ... };
      \`,
    }}
  />
  <script src="https://cdn.voiceflow.com/widget/bundle.mjs"></script>
</body>`,
              note: "This ensures:\n• The app content renders (`{children}`)\n• Then the AI Advisor is loaded\n• The widget appears on all pages",
            },
            {
              title: "Part 3: Next.js (Pages Router – `pages/` directory)",
              steps: [
                "Idea: With the Pages Router, `_document.tsx` (or `_document.js`) controls the HTML shell. We'll inject the script into the `<body>` so it loads on every page.",
                "",
                "1. Open or create `pages/_document.tsx` or `pages/_document.js` (If it doesn't exist, you can create one based on the Next.js docs template).",
                "2. Inside the custom Document, add the scripts:",
              ],
              code: `import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: \`
              window.voiceflow = window.voiceflow || {};
              window.voiceflow.chat = { ... };
            \`,
          }}
        />
        <script src="https://cdn.voiceflow.com/widget/bundle.mjs"></script>
      </body>
    </Html>
  );
}`,
            },
          ],
          howToTest: [
            {
              steps: [
                "Open the deployed site (not localhost, if possible).",
                "Hard refresh the page.",
                "Wait for 1–2 seconds.",
                "The Mitrox AI Advisor bubble should appear in a corner of the screen.",
                "Click it and send a test message.",
              ],
            },
          ],
          troubleshooting: [
            {
              title: "Chat bubble does not appear",
              items: [
                "Check:",
                "• Did you deploy the latest code (build completed, no errors)?",
                "• Is the script placed **after** your main content (inside body)?",
                "• Are there any console errors in the browser DevTools?",
                "• Is an ad blocker or script blocker active?",
              ],
            },
            {
              title: "Chat appears on one page but not others",
              items: [
                "Usually this means the script was added to a single page instead of the global layout or index file. Move the script to:",
                "• `public/index.html` (React)",
                "• `app/layout.tsx` (Next App Router)",
                "• `_document.tsx` (Next Pages Router)",
              ],
            },
            {
              title: "Layout or CSS issues",
              items: [
                "If something visual looks off, it's often CSS conflicts. Mitrox can fine-tune styles for you if needed.",
              ],
            },
          ],
          needHelp: "If you'd like, Mitrox can add the AI Advisor directly to your React or Next.js project and verify everything works. This is often the fastest option if you're busy or not comfortable editing code.",
        },
      }}
    />
  );
};

export default DocsReactPage;
