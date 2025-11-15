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
          overview: "Mitrox AI Advisorin lisääminen Squarespace-sivustolle on helppoa ja nopeaa. Tarvitset vain pienen skriptin, jonka lisäät Code Injection -asetuksiin. Tämän jälkeen chat-kupla ilmestyy automaattisesti kaikille sivuillesi.\n\n**Huom:** Code Injection on käytettävissä vain Squarespacen maksetuissa paketeissa.",
          whatYouNeed: [
            "Sinun Mitrox AI Advisor -skriptisi.",
            "Squarespace-suunnitelma, jossa Code Injection on käytössä.",
          ],
          installationSteps: [
            {
              title: "1. Kirjaudu Squarespace-tilillesi",
              steps: [
                "Avaa Squarespace ja valitse sivustosi.",
              ],
            },
            {
              title: "2. Avaa Settings (Asetukset)",
              steps: [
                "Valikon vasemmasta reunasta.",
              ],
            },
            {
              title: "3. Siirry Advanced-valikkoon",
              steps: [
                "Vieritä alas ja avaa **Advanced**.",
              ],
            },
            {
              title: "4. Valitse \"Code Injection\"",
              steps: [
                "Täällä Squarespace sallii omien koodien lisäämisen.",
              ],
            },
            {
              title: "5. Vieritä Footer-kohtaan",
              steps: [
                "Näet kaksi laatikkoa:",
                "• Header",
                "• Footer",
                "",
                "Liitä koko Mitrox AI Advisor -skripti **Footer**-laatikkoon.",
                "",
                "Miksi Footeriin?",
                "• Skripti latautuu oikeassa järjestyksessä",
                "• Vältytään tyyliongelmilta",
                "• Chat näkyy kaikilla sivuilla",
              ],
            },
            {
              title: "6. Tallenna muutokset",
              steps: [
                "Paina Save.",
              ],
            },
            {
              title: "7. Avaa sivustosi normaalisti selaimessa",
              steps: [
                "Päivitä sivu ja hetken kuluttua chat-kupla ilmestyy.",
              ],
            },
          ],
          howToTest: [
            {
              steps: [
                "Avaa sivusto normaalisti.",
                "Odota pari sekuntia.",
                "Chat-kupla ilmestyy oikeaan alakulmaan.",
                "Klikkaa kuplaa.",
                "Lähetä testiviesti.",
              ],
            },
          ],
          troubleshooting: [
            {
              title: "Chat ei näy",
              items: [
                "Tarkista:",
                "• Onko sinulla maksettu Squarespace-paketti? (Code Injection ei toimi ilmaisversiossa)",
                "• Liititkö koodin Footer-kohtaan?",
                "• Tyhjennä selaimen välimuisti.",
                "• Kokeile incognito-tilaa.",
                "• Tallenna ja julkaise kaikki muutokset.",
              ],
            },
            {
              title: "Chat jää jonkin elementin taakse",
              items: [
                "Squarespacessa voi olla:",
                "• Ilmoituspalkkeja",
                "• Cookie-ilmoituksia",
                "• Popuppeja",
                "",
                "Sulje ne testauksen ajaksi.",
              ],
            },
            {
              title: "Chat näkyy tietokoneella mutta ei mobiilissa",
              items: [
                "Tietyt Squarespacen teemat piilottavat päällekkäisiä elementtejä mobiilissa.",
                "Ota yhteyttä Mitroxiin – korjaamme tilanteen.",
              ],
            },
          ],
          needHelp: "Mitrox voi asentaa AI Advisorin puolestasi Squarespace-sivustolle ja varmistaa, että kaikki toimii moitteettomasti.",
        },
        en: {
          overview: "Adding the Mitrox AI Advisor to Squarespace is very straightforward. You only need to paste a small script into the **Code Injection** settings. Once it's added, the chat bubble will appear automatically on all pages of your website.\n\n**Important:** Code Injection is only available on paid Squarespace plans.",
          whatYouNeed: [
            "Your Mitrox AI Advisor script.",
            "A Squarespace plan with Code Injection enabled.",
          ],
          installationSteps: [
            {
              title: "1. Log in to your Squarespace account",
              steps: [
                "Go to Squarespace.com → Log in → Choose your website.",
              ],
            },
            {
              title: "2. Open Settings",
              steps: [
                "In the main left-hand menu, click **Settings**.",
              ],
            },
            {
              title: "3. Go to \"Advanced\"",
              steps: [
                "Scroll down until you see **Advanced**. Open it.",
              ],
            },
            {
              title: "4. Select \"Code Injection\"",
              steps: [
                "This is the area where Squarespace allows custom scripts.",
              ],
            },
            {
              title: "5. Scroll to the Footer section",
              steps: [
                "You will see two main boxes:",
                "• Header",
                "• Footer",
                "",
                "Paste the entire Mitrox AI Advisor script into the **Footer** box.",
                "",
                "Footer placement ensures:",
                "• Correct loading order",
                "• Fewer styling conflicts",
                "• The chat widget appearing consistently across all pages",
              ],
            },
            {
              title: "6. Click Save",
              steps: [
                "Your script is now active.",
              ],
            },
            {
              title: "7. Refresh your live website",
              steps: [
                "Squarespace may take a moment to update, but after refreshing the live site, the chat bubble should appear.",
              ],
            },
          ],
          howToTest: [
            {
              steps: [
                "Open your website in a normal browser window.",
                "Scroll or wait for 1–2 seconds.",
                "The Mitrox AI Advisor bubble should show in the lower corner.",
                "Click the chat bubble.",
                "Send a test message.",
              ],
            },
          ],
          troubleshooting: [
            {
              title: "Chat bubble does not appear",
              items: [
                "Try the following:",
                "• Make sure you have a **paid Squarespace plan** (Code Injection does not work on free trials).",
                "• Double-check that the script is pasted in the **Footer**, not Header.",
                "• Clear browser cache.",
                "• Try an incognito/private window.",
                "• Publish any pending site changes.",
              ],
            },
            {
              title: "The chat is hidden behind another element",
              items: [
                "Some templates use sticky bars or popups that may overlap.",
                "",
                "Close or temporarily disable:",
                "• Announcement bars",
                "• Cookie banners",
                "• Custom popups",
              ],
            },
            {
              title: "Chat shows on desktop but not on mobile",
              items: [
                "Some Squarespace templates hide overlapping elements on mobile.",
                "Mitrox can adjust the widget position for you if needed.",
              ],
            },
          ],
          needHelp: "If you prefer, Mitrox can install and verify the AI Advisor for you. Most installations take only a few minutes.",
        },
      }}
    />
  );
};

export default DocsSquarespacePage;
