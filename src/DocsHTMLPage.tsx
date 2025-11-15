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
          overview: "Tämä opas on tarkoitettu kaikille, jotka käyttävät räätälöityä verkkosivustoa – yksinkertaisia staattisia HTML-sivuja, käsin koodattuja sivustoja tai vanhempia projekteja, jotka eivät käytä Reactia, Webflowia, Wixiä jne. Se on kirjoitettu ei-teknisille käyttäjille, jotka haluavat selkeät, käytännölliset, stressittömät ohjeet.\n\nJos osaat avata tiedoston ja liittää koodinpätkän, osaat asentaa Mitrox AI Advisorin.",
          whatYouNeed: [
            "Sinun Mitrox AI Advisor -skriptisi.",
            "Pääsy verkkosivustosi HTML-tiedostoihin.",
          ],
          installationSteps: [
            {
              title: "1. Avaa sivustosi tiedostot",
              steps: [
                "Etsi HTML-tiedostot, kuten:",
                "• index.html",
                "• home.html",
                "• contact.html",
                "• services.html",
              ],
            },
            {
              title: "2. Avaa muokattava tiedosto editorissa",
              steps: [
                "Voit käyttää esimerkiksi:",
                "• VS Code",
                "• Notepad",
                "• Notepad++",
                "• TextEdit (pelkkä teksti -tila)",
              ],
            },
            {
              title: "3. Vieritä tiedoston loppuun",
              steps: [
                "Etsi kohta:",
              ],
              code: `</body>`,
              note: "Tämä tag sulkee verkkosivusi body-osion.",
            },
            {
              title: "4. Liitä koko Mitrox-skripti tämän yläpuolelle",
              steps: [
                "Esimerkki:",
              ],
              code: `  <!-- Your website content above this line -->

  <script type="text/javascript">
    window.voiceflow = window.voiceflow || {};
    window.voiceflow.chat = { ... };
  </script>
  <script src="https://cdn.voiceflow.com/widget/bundle.mjs"></script>
</body>`,
              note: "Varmista:\n• Skriptiä ei ole katkaistu tai lyhennetty\n• Se on liitetty oikein `</body>`-tagin yläpuolelle",
            },
            {
              title: "5. Tallenna tiedosto",
              steps: [
                "Tämä päivittää sivustosi AI Advisor -koodilla.",
              ],
            },
            {
              title: "6. Lataa päivitetty tiedosto palvelimelle",
              steps: [
                "Riippuen sivustosi hostingista tämä voi tarkoittaa:",
                "• Drag-and-drop -lähetystä hosting-hallintapaneeliin",
                "• FTP-lähetystä",
                "• Git-julkaisua",
                "• cPanel File Manager -päivitystä",
              ],
              note: "Kun tiedosto on ladattu, sivusto päivittyy heti.",
            },
            {
              title: "7. Avaa sivusto selaimessa ja testaa",
              steps: [
                "Avaa sivusto selaimessasi, päivitä ja odota 1–2 sekuntia. Chat-kupla ilmestyy oikeaan alakulmaan.",
              ],
            },
          ],
          howToTest: [
            {
              steps: [
                "Avaa sivustosi (live-versio).",
                "Tee kova päivitys (Ctrl/Cmd + Shift + R).",
                "Etsi Mitrox AI Advisor -kupla.",
                "Klikkaa sitä avataksesi chatin.",
                "Lähetä viesti vahvistaaksesi, että se vastaa.",
              ],
            },
          ],
          troubleshooting: [
            {
              title: "Chat-kupla ei näy",
              items: [
                "Tarkista seuraavat asiat:",
                "• Liititkö skriptin `</body>`-tagin yläpuolelle?",
                "• Latasitko päivitetyn tiedoston palvelimelle?",
                "• Näyttääkö selaimen välimuisti vanhan version? Kokeile Incognito-tilaa.",
                "• Estääkö mainosesto skriptejä? Kokeile poistaa se käytöstä.",
              ],
            },
            {
              title: "Chat näkyy yhdellä sivulla mutta ei muilla",
              items: [
                "Olet todennäköisesti päivittänyt vain yhden HTML-tiedoston. Toista asennus jokaiselle sivulle.",
              ],
            },
            {
              title: "Ulkoasu näyttää oudolta",
              items: [
                "Jotkut CSS-säännöt saattavat ohittaa chat-sijoittelun. Mitrox voi korjata tämän tarvittaessa.",
              ],
            },
          ],
          needHelp: "Mitrox voi asentaa Advisorin HTML-sivustollesi, jos haluat. Ota vain yhteyttä, ja hoidamme sen nopeasti.",
        },
        en: {
          overview: "This guide is for anyone using a custom-built website – simple static HTML pages, hand-coded sites, or older projects that don't use React, Webflow, Wix, etc. It is written for non-technical users who still want to follow clear, practical, no-stress instructions.\n\nIf you can open a file and paste a code snippet, you can install the Mitrox AI Advisor.",
          whatYouNeed: [
            "Your Mitrox AI Advisor script.",
            "Access to your website's HTML files.",
          ],
          installationSteps: [
            {
              title: "1. Open your website files",
              steps: [
                "Usually these are stored on your computer or on your hosting service. Look for files ending with `.html` such as:",
                "• index.html",
                "• home.html",
                "• contact.html",
                "• services.html",
              ],
            },
            {
              title: "2. Open the page you want to edit in a code editor",
              steps: [
                "Any editor works:",
                "• VS Code",
                "• Sublime Text",
                "• Notepad",
                "• Notepad++",
                "• Mac TextEdit (set to plain text)",
              ],
            },
            {
              title: "3. Scroll to the bottom of the file",
              steps: [
                "Find the line:",
              ],
              code: `</body>`,
              note: "This tag closes the body of your webpage.",
            },
            {
              title: "4. Paste the Mitrox AI Advisor script RIGHT BEFORE the closing </body>",
              steps: [
                "Example:",
              ],
              code: `  <!-- Your website content above this line -->

  <script type="text/javascript">
    window.voiceflow = window.voiceflow || {};
    window.voiceflow.chat = { ... };
  </script>
  <script src="https://cdn.voiceflow.com/widget/bundle.mjs"></script>
</body>`,
              note: "Make sure:\n• The script is not broken or shortened\n• It is pasted correctly above `</body>`",
            },
            {
              title: "5. Save the file",
              steps: [
                "This updates your website with the AI Advisor code.",
              ],
            },
            {
              title: "6. Upload or deploy the updated file",
              steps: [
                "Depending on your hosting setup, this may involve:",
                "• Drag-and-drop upload to your hosting control panel",
                "• FTP upload",
                "• Git publish",
                "• cPanel File Manager",
              ],
              note: "Once uploaded, the site updates immediately.",
            },
            {
              title: "7. Visit your website to test it",
              steps: [
                "Open the site in your browser, refresh, and wait 1–2 seconds. The chat bubble will appear in the lower corner.",
              ],
            },
          ],
          howToTest: [
            {
              steps: [
                "Open your website (live version).",
                "Hard refresh the page (Ctrl/Cmd + Shift + R).",
                "Look for the Mitrox AI Advisor bubble.",
                "Click it to open the chat.",
                "Send a message to confirm it responds.",
              ],
            },
          ],
          troubleshooting: [
            {
              title: "The chat bubble does not show",
              items: [
                "Check the following:",
                "• Did you paste the script above `</body>`?",
                "• Did you upload the updated file to your server?",
                "• Is the browser cache showing an old version? Try Incognito mode.",
                "• Is an ad-blocker hiding scripts? Try disabling it.",
              ],
            },
            {
              title: "The chat shows on one page but not others",
              items: [
                "You may have updated only one HTML file. Repeat the installation on each page.",
              ],
            },
            {
              title: "The layout looks strange",
              items: [
                "Some CSS rules may override chat positioning. Mitrox can fix this if needed.",
              ],
            },
          ],
          needHelp: "Mitrox can install the Advisor on your HTML site if you prefer. Just contact us and we'll take care of it quickly.",
        },
      }}
    />
  );
};

export default DocsHTMLPage;
