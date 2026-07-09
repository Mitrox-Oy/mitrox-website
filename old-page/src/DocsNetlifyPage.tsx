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
          overview: "Tämä opas on kirjoitettu ei-teknisille käyttäjille, jotka hostaavat sivustonsa Netlifyssä. Olipa sivustosi yksinkertainen HTML-sivu tai moderni React/Next.js-sovellus, asennusprosessi on suoraviivainen. Seuraa vaiheita rauhallisesti, ja Mitrox AI Advisor on käynnissä muutamassa minuutissa.\n\nNetlify toimii erinomaisesti sekä tavallisten HTML-sivujen että React-, Next.js- ja muiden kehitysalustojen kanssa.",
          whatYouNeed: [
            "Sinun Mitrox AI Advisor -skriptisi.",
            "Pääsy projektikansioon.",
          ],
          installationSteps: [
            {
              title: "Osa 1: HTML-sivustot (index.html)",
              steps: [
                "1. Avaa projektikansio",
                "Etsi `index.html`-tiedosto.",
                "",
                "2. Avaa index.html",
                "Voit käyttää mitä tahansa editoria.",
                "",
                "3. Vieritä sivun loppuun",
                "Etsi kohta:",
              ],
              code: `</body>`,
            },
            {
              title: "4. Liitä skripti tämän yläpuolelle",
              steps: [
                "Esimerkki:",
              ],
              code: `<script> ... </script>
<script src="..."></script>
</body>`,
            },
            {
              title: "5. Tallenna tiedosto",
              steps: [],
            },
            {
              title: "6. Julkaise Netlifyssä",
              steps: [
                "• Vedä ja pudota",
                "• GitHub-automaatio",
                "• Netlify CLI",
              ],
            },
            {
              title: "Osa 2: React, Next.js, Vue, Svelte ja muut kehykset",
              steps: [
                "Modernit kehykset eivät aina käytä index.html-tiedostoa suoraan. Tässä on miten asennat sen turvallisesti.",
                "",
                "**React:**",
                "Avaa `public/index.html` ja liitä skripti ennen `</body>`.",
                "",
                "**Next.js (App Router):**",
                "Lisää skripti `app/layout.js` - tai `.tsx` -tiedostoon.",
                "",
                "**Next.js (Pages Router):**",
                "Lisää skripti `_document.js` -tiedostoon.",
                "",
                "**Vue / Nuxt / muut:**",
                "Liitä skripti pääasettelutiedostoon (layout) tai käytä footer-alueen injektiota.",
              ],
            },
          ],
          howToTest: [
            {
              steps: [
                "Avaa Netlify-sivustosi.",
                "Tee kova päivitys (Ctrl/Cmd + Shift + R).",
                "Odota hetki.",
                "Chat-kupla ilmestyy oikeaan alakulmaan.",
                "Lähetä testiviesti.",
              ],
            },
          ],
          troubleshooting: [
            {
              title: "Chat ei näy",
              items: [
                "• Tarkista, että julkaisu onnistui Netlifyn lokien mukaan.",
                "• Onhan skripti juuri ennen `</body>`?",
                "• Tyhjennä välimuisti.",
                "• Incognito-tila.",
                "• Poista AdBlock.",
              ],
            },
            {
              title: "Chat näkyy vain tietokoneella",
              items: [
                "Jotkut kehykset piilottavat elementtejä mobiilissa.",
                "Mitrox voi säätää sijoittelun.",
              ],
            },
            {
              title: "Ulkoasu näyttää oudolta",
              items: [
                "Kyseessä on yleensä tyyliristiriita. Mitrox korjaa tämän nopeasti.",
              ],
            },
          ],
          needHelp: "Mitrox voi asentaa Advisorin puolestasi ja varmistaa, että se toimii kaikissa näkymissä.",
        },
        en: {
          overview: "This guide is written for non-technical users who host their sites on Netlify. Whether your site is a simple HTML page or a modern React/Next.js app, the installation process is straightforward. Follow the steps calmly and you'll have the Mitrox AI Advisor running in just a few minutes.\n\nNetlify is a hosting platform that serves static websites and modern frontend applications. Adding the Mitrox AI Advisor is simple: you only need to place one script inside your site's main HTML or layout file. After deploying, the chat bubble appears automatically on every page.",
          whatYouNeed: [
            "Your Mitrox AI Advisor script.",
            "Access to your project folder.",
          ],
          installationSteps: [
            {
              title: "Part 1: Installation for Simple HTML Sites",
              steps: [
                "This applies if your site uses plain HTML files (e.g., index.html).",
                "",
                "1. Open your project folder",
                "Locate the file **index.html** inside your project. It is usually under:",
                "• `public/`",
                "• root folder",
                "",
                "2. Open index.html in an editor",
                "Any editor works: VS Code, Notepad, etc.",
                "",
                "3. Scroll to the very bottom of the file",
                "Find the closing body tag:",
              ],
              code: `</body>`,
            },
            {
              title: "4. Paste the entire Mitrox script right above </body>",
              steps: [
                "Example:",
              ],
              code: `<script> ... </script>
<script src="..."></script>
</body>`,
            },
            {
              title: "5. Save the file",
              steps: [
                "Make sure the script is included fully and correctly.",
              ],
            },
            {
              title: "6. Deploy to Netlify",
              steps: [
                "Upload or push your changes, depending on your setup:",
                "• Netlify drag-and-drop",
                "• GitHub auto-deploy",
                "• Netlify CLI",
              ],
            },
            {
              title: "Part 2: Installation for React, Next.js, Vue, Svelte, or other frameworks",
              steps: [
                "Modern frameworks do not always use index.html directly. Here's how to install it safely.",
                "",
                "**React:**",
                "1. Open `public/index.html`.",
                "2. Paste the script right before `</body>`.",
                "3. Save and redeploy.",
                "",
                "**Next.js (App Router):**",
                "Place the script in `app/layout.js` or `app/layout.tsx`:",
                "",
                "**Next.js (Pages Router):**",
                "Use `_document.js` or `_document.tsx` to inject the script before the closing body.",
                "",
                "**Vue / Nuxt:**",
                "Place the script inside the main layout file or use the `<head>`/footer injection options, always ensuring it loads at the bottom.",
              ],
            },
          ],
          howToTest: [
            {
              steps: [
                "Open your live Netlify site.",
                "Hard refresh (Ctrl + Shift + R on Windows, Cmd + Shift + R on Mac).",
                "Wait for 1–2 seconds.",
                "The chat bubble should appear in the bottom corner.",
                "Click the bubble and send a test message.",
              ],
            },
          ],
          troubleshooting: [
            {
              title: "The chat bubble does not appear",
              items: [
                "Try the following:",
                "• Ensure deployment succeeded (check Netlify logs).",
                "• Make sure the script is placed **before `</body>`**.",
                "• Clear browser cache.",
                "• Try in private/incognito mode.",
                "• Check that no ad-blocker is blocking external scripts.",
              ],
            },
            {
              title: "The chat appears on desktop but not mobile",
              items: [
                "Some frontend frameworks hide overlapping floating elements on mobile.",
                "Mitrox can adjust the widget placement for you.",
              ],
            },
            {
              title: "The widget loads incorrectly or has visual bugs",
              items: [
                "This usually means theme CSS is interfering. Mitrox can fix this quickly.",
              ],
            },
          ],
          needHelp: "If you'd prefer, Mitrox can install the AI Advisor for you directly in your Netlify project. It's quick and worry-free.",
        },
      }}
    />
  );
};

export default DocsNetlifyPage;
