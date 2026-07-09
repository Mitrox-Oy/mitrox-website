// src/DocsWordPressPage.tsx
import DocsPlatformPage from "./components/DocsPlatformPage";

const DocsWordPressPage: React.FC = () => {
  return (
    <DocsPlatformPage
      platformName="wordpress"
      platformNameFi="WordPress"
      platformNameEn="WordPress"
      content={{
        fi: {
          overview: "WordPress on yksi helpoimmista alustoista Mitrox AI Advisorin asentamiseen. Riittää, että liität pienen skriptin sivuston alatunnisteeseen. Et tarvitse mitään teknistä osaamista.\n\nKoko prosessi kestää yleensä alle kaksi minuuttia.",
          whatYouNeed: [
            "Sinun Mitrox AI Advisor -skriptisi (Mitroxin tarjoama).",
            "Pääsy WordPress Adminiin.",
          ],
          installationSteps: [
            {
              title: "1. Kirjaudu WordPress-hallintaan",
              steps: [
                "Mene osoitteeseen **omaosoite.fi/wp-admin** ja kirjaudu sisään.",
              ],
            },
            {
              title: "2. Asenna apulaislisäosa",
              steps: [
                "Helpoin vaihtoehto on jokin näistä:",
                "• \"Insert Headers and Footers\"",
                "• \"WPCode – Insert Headers & Footers\"",
                "",
                "Asennus:",
                "1. Siirry **Plugins → Add New**.",
                "2. Etsi jompikumpi lisäosan nimi.",
                "3. Klikkaa **Install** ja sitten **Activate**.",
                "",
                "Näiden avulla voit lisätä skriptejä turvallisesti koskematta teematiedostoihin.",
              ],
            },
            {
              title: "3. Avaa lisäosan asetukset",
              steps: [
                "Ne löytyvät yleensä täältä:",
                "• Settings → Insert Headers and Footers, tai",
                "• Code Snippets → Header & Footer (jos käytät WPCodea)",
              ],
            },
            {
              title: "4. Liitä Mitrox-skripti Footer-kohtaan",
              steps: [
                "Vieritä alas kunnes näet kohdan **Footer** tai **Scripts in Footer**.",
                "",
                "Liitä skripti kokonaisuudessaan.",
                "",
                "Miksi Footeriin?",
                "Chat-widgetin tulee latautua vasta sivun muun sisällön jälkeen. Footer takaa tämän.",
              ],
            },
            {
              title: "5. Tallenna asetukset",
              steps: [
                "Paina **Save** tai **Update**.",
              ],
            },
            {
              title: "6. Avaa sivustosi normaalisti",
              steps: [
                "Chat-kupla ilmestyy oikeaan alakulmaan sekunnin tai kahden kuluttua.",
              ],
            },
          ],
          howToTest: [
            {
              steps: [
                "Avaa sivusto normaalisti (ei editorissa).",
                "Päivitä sivu.",
                "Odota hetki – chat-kupla ilmestyy.",
                "Klikkaa kuplaa avataksesi chatin.",
                "Lähetä testiviesti.",
              ],
            },
          ],
          troubleshooting: [
            {
              title: "Chat ei näy sivustolla",
              items: [
                "Kokeile:",
                "• Tyhjennä selaimen välimuisti",
                "• Varmista, että koodi on Footerissa",
                "• Poista väliaikaisesti välimuistilisäosat (esim. WP Rocket)",
                "• Tarkista, että skripti liitettiin kokonaan",
              ],
            },
            {
              title: "Teema piilottaa chat-kuplan",
              items: [
                "Jos teema käyttää päällekkäisiä kerroksia, chat voi jäädä niiden taakse.",
                "",
                "Lisää tämä CSS:",
              ],
              code: `.voiceflow-chat, .vfrc-launcher {
  z-index: 999999 !important;
  visibility: visible !important;
  display: block !important;
}`,
              note: "Asetus löytyy: Appearance → Customize → Additional CSS",
            },
            {
              title: "Viestikentän tausta on liian tumma tai väärä",
              items: [
                "Lisää:",
              ],
              code: `.vfrc-footer, .vfrc-input {
  background: white !important;
}`,
            },
            {
              title: "Käytössäsi on Elementor, Divi tai WPBakery",
              items: [
                "Kaikki toimii silti – skripti toimii koko sivuston laajuisesti.",
              ],
            },
          ],
          needHelp: "Mitrox voi asentaa Advisorin puolestasi WordPress-sivustolle nopeasti ja vaivattomasti.",
        },
        en: {
          overview: "WordPress is one of the easiest platforms for installing the Mitrox AI Advisor. All you need to do is paste a small script into the site footer using a simple plugin. The whole process usually takes less than two minutes.\n\nYou don't need coding knowledge – just follow the steps and the chat widget will appear automatically.",
          whatYouNeed: [
            "Your Mitrox AI Advisor script (provided by Mitrox).",
            "Access to WordPress Admin.",
          ],
          installationSteps: [
            {
              title: "1. Log in to your WordPress Dashboard",
              steps: [
                "Go to **yourwebsite.com/wp-admin** and sign in.",
              ],
            },
            {
              title: "2. Install a small helper plugin",
              steps: [
                "The easiest option is one of these:",
                "• \"Insert Headers and Footers\"",
                "• \"WPCode – Insert Headers & Footers\"",
                "",
                "To install:",
                "1. Go to **Plugins → Add New**.",
                "2. Search for either plugin name.",
                "3. Click **Install** and then **Activate**.",
                "",
                "These plugins make it safe and simple to add scripts without touching theme files.",
              ],
            },
            {
              title: "3. Open the plugin settings",
              steps: [
                "You'll find the new menu under:",
                "• Settings → Insert Headers and Footers, or",
                "• Code Snippets → Header & Footer (if using WPCode)",
              ],
            },
            {
              title: "4. Paste the entire Mitrox script into the Footer section",
              steps: [
                "Scroll down until you find a box labeled:",
                "• **Footer** or **Scripts in Footer**",
                "",
                "Paste the full script exactly as provided.",
                "",
                "Why footer placement is important:",
                "The AI Advisor must load after the rest of your website to avoid conflicts. Footer ensures this.",
              ],
            },
            {
              title: "5. Save changes",
              steps: [
                "Click **Save** or **Update**.",
              ],
            },
            {
              title: "6. Open your website in a new browser tab",
              steps: [
                "The chat bubble should appear in the bottom corner within 1–2 seconds.",
              ],
            },
          ],
          howToTest: [
            {
              steps: [
                "Open your website (not the WP Editor).",
                "Refresh the page.",
                "Wait briefly – the chat icon should appear.",
                "Click it to open the AI Advisor window.",
                "Send a test message.",
              ],
            },
          ],
          troubleshooting: [
            {
              title: "The chat bubble does not appear",
              items: [
                "Try the following:",
                "• Clear your browser cache.",
                "• Make sure you added the script to **Footer** not Header.",
                "• Disable caching plugins briefly (e.g., WP Rocket, LiteSpeed Cache).",
                "• Check that you pasted the script completely.",
              ],
            },
            {
              title: "Theme hides the chat bubble",
              items: [
                "Some themes use aggressive layering which hides floating elements.",
                "",
                "Add this custom CSS:",
              ],
              code: `.voiceflow-chat, .vfrc-launcher {
  z-index: 999999 !important;
  visibility: visible !important;
  display: block !important;
}`,
              note: "Add it under: Appearance → Customize → Additional CSS",
            },
            {
              title: "The input bar background looks dark or wrong",
              items: [
                "Add:",
              ],
              code: `.vfrc-footer, .vfrc-input {
  background: white !important;
}`,
            },
            {
              title: "You use a page builder (Elementor, Divi, WPBakery)",
              items: [
                "Everything still works normally because the script runs globally.",
              ],
            },
          ],
          needHelp: "If you prefer, Mitrox can install the AI Advisor for you directly on your WordPress site. It takes only a moment.",
        },
      }}
    />
  );
};

export default DocsWordPressPage;
