// src/DocsWixPage.tsx
import DocsPlatformPage from "./components/DocsPlatformPage";

const DocsWixPage: React.FC = () => {
  return (
    <DocsPlatformPage
      platformName="wix"
      platformNameFi="Wix"
      platformNameEn="Wix"
      content={{
        fi: {
          overview: "Mitrox AI Advisorin lisääminen Wix‑sivustolle on todella helppoa. Tarvitset vain yhden pienen koodinpätkän, jonka liität sivuston asetuksiin. Sen jälkeen chat‑widget ilmestyy automaattisesti sivuillesi.\n\nEt tarvitse teknistä osaamista tai kooditaitoja.",
          whatYouNeed: [
            "Sinun Mitrox AI Advisor -skriptisi (Mitroxin tarjoama).",
            "Pääsy Wix Editoriin.",
          ],
          installationSteps: [
            {
              title: "1. Mene Wix‑sivustosi hallintaan",
              steps: [
                "Avaa sivustosi Dashboard, josta yleensä muokkaat sivua ja sen asetuksia.",
              ],
            },
            {
              title: "2. Siirry kohtaan Custom Code",
              steps: [
                "Settings → Custom Code",
                "",
                "Tässä kohdassa Wix sallii pienten koodien lisäämisen koko sivustolle.",
              ],
            },
            {
              title: "3. Valitse \"Add Custom Code\"",
              steps: [
                "Avautuu laatikko, johon voit liittää Mitroxin antaman skriptin.",
              ],
            },
            {
              title: "4. Liitä koko Mitrox AI Advisor -skripti",
              steps: [
                "Kopioi ja liitä skripti sellaisenaan. Mitään ei tarvitse muuttaa.",
              ],
            },
            {
              title: "5. Aseta näkyvyys ja sijainti",
              steps: [
                "Valitse:",
                "• Sivut: **All Pages** (Kaikki sivut)",
                "• Sijainti: **Footer** (Alatunniste)",
                "",
                "Footeriin sijoittaminen varmistaa, että chat latautuu oikein eikä häiritse sivun asettelua.",
              ],
            },
            {
              title: "6. Tallenna ja julkaise sivusto",
              steps: [
                "Wixin Preview‑tila ei aina näytä lisättyä koodia. Siksi on tärkeää julkaista sivu, jotta chat tulee näkyviin.",
              ],
            },
          ],
          howToTest: [
            {
              steps: [
                "Avaa sivusto normaalisti (ei Editor‑tilassa).",
                "Odota hetki.",
                "Chat‑kupla ilmestyy oikeaan alakulmaan.",
                "Klikkaa kuplaa avataksesi chatin.",
                "Lähetä testiviesti.",
              ],
            },
          ],
          troubleshooting: [
            {
              title: "Chat ei näy",
              items: [
                "• Muistitko painaa **Publish**?",
                "• Varmista, että koodi on Footerissa eikä Headerissa.",
                "• Jokin toinen lisäosa tai popup voi peittää nurkan.",
              ],
            },
            {
              title: "Chat näyttää oudolta tai värit ovat väärin",
              items: [
                "Tämä johtuu yleensä sivupohjan tyyleistä. Mitrox hoitaa korjauksen nopeasti.",
              ],
            },
            {
              title: "Chat näkyy tietokoneella mutta ei puhelimessa",
              items: [
                "Tietyt Wix‑teemat piilottavat joitain elementtejä mobiilin puolella. Ota yhteyttä Mitroxiin niin korjaamme tilanteen.",
              ],
            },
          ],
          needHelp: "Jos haluat, Mitrox asentaa AI Advisorin puolestasi Wix‑sivullesi. Se vie vain pari minuuttia.",
        },
        en: {
          overview: "Mitrox AI Advisor is very easy to add to any Wix website. You only need to paste one small code snippet, and the chat widget will appear automatically on every page. You don't need coding experience.",
          whatYouNeed: [
            "Your Mitrox AI Advisor script (provided by Mitrox).",
            "Access to Wix Editor.",
          ],
          installationSteps: [
            {
              title: "1. Open your Wix Dashboard",
              steps: [
                "Go to your website's main dashboard where you normally edit the site and settings.",
              ],
            },
            {
              title: "2. Navigate to Custom Code",
              steps: [
                "Settings → Custom Code",
                "",
                "This is where Wix allows you to inject small pieces of code that run across your entire site.",
              ],
            },
            {
              title: "3. Click \"Add Custom Code\"",
              steps: [
                "A box will appear where you can paste the script.",
              ],
            },
            {
              title: "4. Paste the entire Mitrox AI Advisor script",
              steps: [
                "Copy the full script exactly as provided and paste it into the code box.",
                "",
                "Nothing needs to be edited inside the code.",
              ],
            },
            {
              title: "5. Set where the code applies",
              steps: [
                "Choose:",
                "• Apply to: **All Pages**",
                "• Location: **Footer**",
                "",
                "Footer placement ensures the chat widget loads correctly and doesn't interfere with your site design.",
              ],
            },
            {
              title: "6. Save and Publish the site",
              steps: [
                "Wix Preview mode may hide injected code, so always publish before testing.",
              ],
            },
          ],
          howToTest: [
            {
              steps: [
                "Open your site normally (not in Editor view).",
                "Wait 1–2 seconds.",
                "The Mitrox AI Advisor bubble should appear in the lower corner.",
                "Click it to open the chat window.",
                "Send a test message.",
              ],
            },
          ],
          troubleshooting: [
            {
              title: "The chat bubble doesn't show",
              items: [
                "• Make sure you clicked **Publish** after adding the code.",
                "• Double‑check that location is **Footer**, not Header.",
                "• If you have many popups or apps, one might be covering the corner — try closing them.",
              ],
            },
            {
              title: "The chat looks strange or styled incorrectly",
              items: [
                "This is usually due to your theme styling. Contact Mitrox and we can fix it for you.",
              ],
            },
            {
              title: "The widget appears on desktop but not mobile",
              items: [
                "Some Wix templates hide overlapping elements on mobile. Let Mitrox know and we'll adjust the placement.",
              ],
            },
          ],
          needHelp: "If you prefer, Mitrox can install the AI Advisor on your Wix site for you. It takes just a few minutes.",
        },
      }}
    />
  );
};

export default DocsWixPage;
