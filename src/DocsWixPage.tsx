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
          whatYouNeed: [
            "Sinun Mitrox AI Advisor -skriptisi (Mitroxin tarjoama).",
            "Pääsy Wix Editoriin.",
          ],
          installationSteps: [
            {
              title: "Asennusohjeet",
              steps: [
                "Avaa Wix Dashboard.",
                "Siirry Settings → Custom Code.",
                "Klikkaa \"Add Custom Code\".",
                "Liitä koko skripti laatikkoon.",
                "Sovella kaikille sivuille (All Pages).",
                "Valitse Place Code in Footer.",
                "Tallenna ja julkaise.",
              ],
            },
          ],
          troubleshooting: [
            {
              title: "Widget ei näy",
              items: [
                "Widget ei välttämättä näy Preview-tilassa. Julkaise sivusto vahvistaaksesi.",
                "Jos muut ponnahdusikkunat peittävät sen, siirrä ne uudelleen.",
              ],
            },
          ],
        },
        en: {
          whatYouNeed: [
            "Your Mitrox AI Advisor script (provided by Mitrox).",
            "Access to Wix Editor.",
          ],
          installationSteps: [
            {
              title: "Installation Steps",
              steps: [
                "Open Wix Dashboard.",
                "Go to Settings → Custom Code.",
                "Click \"Add Custom Code\".",
                "Paste the full script into the box.",
                "Apply to All Pages.",
                "Choose Place Code in Footer.",
                "Save and publish.",
              ],
            },
          ],
          troubleshooting: [
            {
              title: "Widget does not appear",
              items: [
                "The widget may not appear in Preview mode. Publish the site to confirm.",
                "If other popups overlap, reposition them.",
              ],
            },
          ],
        },
      }}
    />
  );
};

export default DocsWixPage;

