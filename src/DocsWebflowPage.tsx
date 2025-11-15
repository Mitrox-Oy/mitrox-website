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
          overview: "Mitrox AI Advisorin lisääminen Webflow-sivustolle on helppoa, kun tiedät mihin skripti asetetaan. Tarvitset vain pienen koodinpätkän, jonka liität Footer Code -kenttään. Tämän jälkeen chat-kupla ilmestyy automaattisesti kaikille sivuillesi.\n\nWebflow voi näyttää monimutkaiselta, mutta alla olevat ohjeet tekevät prosessista selkeän myös ei‑teknisille käyttäjille.",
          whatYouNeed: [
            "Sinun Mitrox AI Advisor -skriptisi.",
            "Pääsy Webflow Project Settingsiin.",
          ],
          installationSteps: [
            {
              title: "1. Avaa Webflow Dashboard",
              steps: [
                "Kirjaudu sisään ja avaa projektisi.",
              ],
            },
            {
              title: "2. Siirry projektin asetuksiin",
              steps: [
                "Klikkaa projektikortissa olevaa **Settings**-painiketta.",
                "",
                "Tässä ovat kaikki globaalit skriptit ja SEO-asetukset.",
              ],
            },
            {
              title: "3. Avaa Custom Code -välilehti",
              steps: [
                "Yläreunasta löytyy välilehtiä (Overview, Hosting, Custom Code...). Valitse **Custom Code**.",
              ],
            },
            {
              title: "4. Vieritä alas Footer Code -kohtaan",
              steps: [
                "Näet kaksi isoa laatikkoa: Head Code ja Footer Code.",
                "",
                "Liitä koko Mitrox AI Advisor -skripti **Footer Code** -ruutuun.",
                "",
                "Miksi Footeriin?",
                "• Skripti latautuu vasta sivun sisällön jälkeen",
                "• Vältytään konflikteilta animaatioiden ja muiden elementtien kanssa",
                "• Varmistetaan parempi yhteensopivuus Webflown rakenteen kanssa",
              ],
            },
            {
              title: "5. Tallenna asetukset",
              steps: [
                "Paina **Save Changes**.",
              ],
            },
            {
              title: "6. Julkaise sivusto",
              steps: [
                "Tämä vaihe on erittäin tärkeä.",
                "",
                "Skripti EI näy Webflow Designerissa tai Preview-tilassa.",
                "",
                "Klikkaa: **Publish → Publish to Selected Domains**.",
                "",
                "Hetken kuluttua sivusto päivittyy.",
              ],
            },
          ],
          howToTest: [
            {
              steps: [
                "Avaa sivusto normaalisti selaimessa.",
                "Odota hetki.",
                "Chat-kupla pitäisi näkyä oikeassa alakulmassa.",
                "Klikkaa kuplaa avataksesi chatin.",
                "Lähetä testiviesti.",
              ],
            },
          ],
          troubleshooting: [
            {
              title: "Chat ei näy lainkaan",
              items: [
                "Kokeile:",
                "• Tarkista, että koodi on Footer Codessa",
                "• Varmista, että painoit Publish",
                "• Tyhjennä selaimen välimuisti",
                "• Poista mahdollinen salasanasuojaus sivulta",
              ],
            },
            {
              title: "Jokin elementti peittää chat-kuplan",
              items: [
                "Webflowssa on usein:",
                "• Popupeja",
                "• Kiinteitä painikkeita",
                "• Cookie-ilmoituksia",
                "• Animaatioita",
                "",
                "Nämä saattavat peittää alakulman.",
                "",
                "Tarvittaessa Mitrox voi säätää widget-sijainnin puolestasi.",
              ],
            },
            {
              title: "Chat näkyy tietokoneella mutta ei mobiilissa",
              items: [
                "Joidenkin teemojen mobile layout piilottaa päällekkäiset elementit.",
                "Ota yhteyttä Mitroxiin – korjaamme tilanteen nopeasti.",
              ],
            },
          ],
          needHelp: "Mitrox asentaa Advisorin puolestasi tarvittaessa ja tarkistaa, että kaikki toimii.",
        },
        en: {
          overview: "Installing Mitrox AI Advisor on a Webflow website is simple and quick. You only need to paste one script into your project settings. After publishing, the chat bubble will automatically appear on every page of your site.\n\nWebflow is powerful, but it can feel confusing if you're not used to the settings. This guide explains everything in a calm, clear way.",
          whatYouNeed: [
            "Your Mitrox AI Advisor script.",
            "Access to Webflow Project Settings.",
          ],
          installationSteps: [
            {
              title: "1. Open Webflow Dashboard",
              steps: [
                "Sign in at webflow.com and open your project.",
              ],
            },
            {
              title: "2. Go to Project Settings",
              steps: [
                "Inside your project tile, click the small **gear icon** labeled \"Settings\".",
                "",
                "This is where all global scripts and SEO settings live.",
              ],
            },
            {
              title: "3. Open the \"Custom Code\" tab",
              steps: [
                "At the top you will see several tabs: Overview, Hosting, Editor, Custom Code, etc.",
                "",
                "Click **Custom Code**.",
              ],
            },
            {
              title: "4. Scroll down to the Footer Code section",
              steps: [
                "You will see two large boxes: one for **Head** code and one for **Footer Code**.",
                "",
                "Paste your entire Mitrox AI Advisor script inside the **Footer Code** box.",
                "",
                "Footer placement is important because:",
                "• It ensures the widget loads after your main content",
                "• It avoids conflicts with animations and interactions",
                "• It prevents styling issues with Webflow components",
              ],
            },
            {
              title: "5. Save changes",
              steps: [
                "Click the **Save Changes** button at the top right.",
              ],
            },
            {
              title: "6. Publish your site",
              steps: [
                "This part is critical.",
                "",
                "The AI Advisor will **not** show in Webflow Designer or Preview mode.",
                "",
                "You must click: **Publish → Publish to Selected Domains**.",
                "",
                "After a few seconds, your live website will update.",
              ],
            },
          ],
          howToTest: [
            {
              steps: [
                "Visit your website normally (not inside Webflow Designer).",
                "Wait 1–2 seconds.",
                "You should see the Mitrox AI Advisor bubble in the bottom corner.",
                "Click it to open the chat window.",
                "Send a test message.",
              ],
            },
          ],
          troubleshooting: [
            {
              title: "The chat bubble does not appear",
              items: [
                "Try the following:",
                "• Make sure the script is in **Footer Code**, not Head Code.",
                "• Confirm you clicked **Publish** after saving.",
                "• Clear your browser cache or open in Incognito.",
                "• Ensure your project is not password‑protected.",
              ],
            },
            {
              title: "Something overlaps the chat bubble",
              items: [
                "Webflow interactions or fixed-position elements can cover the lower corner.",
                "",
                "Close or reposition any:",
                "• Popups",
                "• Chat tools",
                "• Cookie banners",
                "• Fixed buttons",
                "",
                "If needed, Mitrox can adjust the widget position for you.",
              ],
            },
            {
              title: "The chat appears on desktop but not mobile",
              items: [
                "Some Webflow elements hide overlapping content on mobile.",
                "We can fix this quickly if you contact Mitrox.",
              ],
            },
          ],
          needHelp: "Mitrox can install and verify the Advisor for you if you prefer. It normally takes under 5 minutes.",
        },
      }}
    />
  );
};

export default DocsWebflowPage;
