// src/DocsShopifyPage.tsx
import DocsPlatformPage from "./components/DocsPlatformPage";

const DocsShopifyPage: React.FC = () => {
  return (
    <DocsPlatformPage
      platformName="shopify"
      platformNameFi="Shopify"
      platformNameEn="Shopify"
      content={{
        fi: {
          overview: "Mitrox AI Advisorin lisääminen Shopify-kauppaan on helppoa ja nopeaa. Riittää, että liität yhden pienen skriptin teemasi loppuun. Tämän jälkeen chat-kupla näkyy automaattisesti kaikilla sivuilla – etusivulla, tuotesivuilla ja kassalla.",
          whatYouNeed: [
            "Sinun Mitrox AI Advisor -skriptisi (Mitroxin tarjoama).",
            "Pääsy Shopify Adminiin.",
          ],
          installationSteps: [
            {
              title: "1. Kirjaudu Shopify Adminiin",
              steps: [
                "Avaa kauppasi hallintapaneeli.",
              ],
            },
            {
              title: "2. Siirry aktiiviseen teemaasi",
              steps: [
                "Online Store → Themes",
                "",
                "Näet nykyisen live-teeman ylhäällä.",
              ],
            },
            {
              title: "3. Klikkaa \"Edit Code\"",
              steps: [
                "Tämä avaa näkymän, jossa kaikki teematiedostot ovat.",
                "",
                "Älä huoli, et tarvitse koodaustaitoja. Liität vain skriptin.",
              ],
            },
            {
              title: "4. Avaa theme.liquid",
              steps: [
                "Vasemmasta sivupalkista:",
                "**Layout → theme.liquid**",
                "",
                "Tämä tiedosto latautuu jokaisella sivulla, minkä vuoksi AI Advisor näkyy kaikkialla.",
              ],
            },
            {
              title: "5. Vieritä sivun loppuun",
              steps: [
                "Löydät kohdan:",
              ],
              code: `</body>`,
            },
            {
              title: "6. Liitä koko Mitrox-skripti tämän yläpuolelle",
              steps: [
                "Näin:",
              ],
              code: `<script> ... </script>
<script src="..."></script>
</body>`,
              note: "Sijoittaminen juuri tähän varmistaa:\n• Skripti latautuu vasta sivun sisällön jälkeen\n• Teemaan ei tule ristiriitoja\n• Chat toimii kaikilla sivuilla",
            },
            {
              title: "7. Tallenna muutokset",
              steps: [
                "Paina Save.",
              ],
            },
            {
              title: "8. Avaa kauppasi normaalisti",
              steps: [
                "Päivitä sivu, ja chat-kupla ilmestyy hetkessä.",
              ],
            },
          ],
          howToTest: [
            {
              steps: [
                "Avaa sivusto normaalisti (ei editorissa).",
                "Odota hetki.",
                "Chat-kupla pitäisi näkyä oikeassa alakulmassa.",
                "Klikkaa kuplaa avataksesi chatin.",
                "Lähetä testiviesti.",
              ],
            },
          ],
          troubleshooting: [
            {
              title: "Chat ei näy ollenkaan",
              items: [
                "Kokeile:",
                "• Tarkista, että tallensit theme.liquid-tiedoston",
                "• Varmista, että skripti on juuri ennen </body>",
                "• Tyhjennä selaimen välimuisti",
                "• Kokeile incognito-tilaa (Shopify välimuistittaa aggressiivisesti)",
                "• Jos käytät custom-teemaa, varmista että body-tagia ei ole siirretty",
              ],
            },
            {
              title: "Chat-kupla jää jonkin elementin taakse",
              items: [
                "Joissain Shopify-teemoissa on kiinteitä nappeja (esim. chat-työkalut, lisää-ostoskoriin-napit).",
                "",
                "Voit korjata tämän lisäämällä:",
              ],
              code: `.voiceflow-chat, .vfrc-launcher {
  z-index: 999999 !important;
}`,
              note: "Lisäys löytyy täältä:\nOnline Store → Themes → Customize → Theme Settings → Custom CSS",
            },
            {
              title: "Chat näkyy tietokoneella mutta ei mobiilissa",
              items: [
                "Tietyt teemat piilottavat päällekkäisiä elementtejä mobiilin puolella.",
                "Ota yhteyttä Mitroxiin – korjaamme tämän puolestasi.",
              ],
            },
          ],
          needHelp: "Jos haluat, Mitrox voi asentaa AI Advisor -widgetin Shopify-kauppaasi puolestasi. Se vie vain pari minuuttia.",
        },
        en: {
          overview: "Adding the Mitrox AI Advisor to your Shopify store is easy. You only need to add one small script into your main theme file. Once added, the chat bubble will automatically appear on every page such as the homepage, product pages and checkout.",
          whatYouNeed: [
            "Your Mitrox AI Advisor script (provided by Mitrox).",
            "Access to Shopify Admin.",
          ],
          installationSteps: [
            {
              title: "1. Log in to your Shopify Admin",
              steps: [
                "Go to your store's admin dashboard.",
              ],
            },
            {
              title: "2. Navigate to your active theme",
              steps: [
                "Online Store → Themes",
                "",
                "You will see your current live theme at the top.",
              ],
            },
            {
              title: "3. Click \"Edit Code\"",
              steps: [
                "This opens a panel containing all theme templates.",
                "",
                "Don't worry, you don't need coding skills. You will only paste the script.",
              ],
            },
            {
              title: "4. Open the theme.liquid file",
              steps: [
                "In the left sidebar, open:",
                "**Layout → theme.liquid**",
                "",
                "This file loads on every page, which is why the AI Advisor will appear everywhere.",
              ],
            },
            {
              title: "5. Scroll to the very bottom of the file",
              steps: [
                "Look for the closing body tag:",
              ],
              code: `</body>`,
            },
            {
              title: "6. Paste the entire Mitrox script right ABOVE the closing </body>",
              steps: [
                "Example:",
              ],
              code: `<script> ... </script>
<script src="..."></script>
</body>`,
              note: "Placing the script here is important because:\n• It ensures the widget loads after your content\n• It avoids conflicts with your theme\n• It makes the bubble appear correctly on all pages",
            },
            {
              title: "7. Click \"Save\"",
              steps: [
                "Your changes are saved instantly.",
              ],
            },
            {
              title: "8. Open your store in a new browser tab",
              steps: [
                "After refreshing, the Mitrox AI Advisor bubble should appear.",
              ],
            },
          ],
          howToTest: [
            {
              steps: [
                "Open your store normally (not in theme editor).",
                "Wait 1–2 seconds.",
                "The chat bubble appears in the lower corner.",
                "Click it to open the chat.",
                "Send a test message.",
              ],
            },
          ],
          troubleshooting: [
            {
              title: "The chat bubble doesn't show",
              items: [
                "Try this:",
                "• Make sure you saved the theme.liquid file",
                "• Confirm the script is ABOVE `</body>`",
                "• Clear your browser cache",
                "• Try incognito mode (Shopify caches aggressively)",
                "• If you use a custom theme, ensure it hasn't moved the body tag",
              ],
            },
            {
              title: "The bubble is partly hidden or covered",
              items: [
                "Some Shopify themes have sticky buttons (e.g., chat tools, add-to-cart buttons).",
                "",
                "You can fix this with a small CSS rule:",
              ],
              code: `.voiceflow-chat, .vfrc-launcher {
  z-index: 999999 !important;
}`,
              note: "Add it in:\nOnline Store → Themes → Customize → Theme Settings → Custom CSS",
            },
            {
              title: "The widget appears on desktop but not mobile",
              items: [
                "Themes sometimes hide overlapping items on mobile layouts.",
                "Tell Mitrox and we will adjust the position.",
              ],
            },
          ],
          needHelp: "If you prefer, Mitrox can install the Advisor on your Shopify store for you. It only takes a moment.",
        },
      }}
    />
  );
};

export default DocsShopifyPage;
