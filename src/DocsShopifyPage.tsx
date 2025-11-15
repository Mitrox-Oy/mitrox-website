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
          whatYouNeed: [
            "Sinun Mitrox AI Advisor -skriptisi (Mitroxin tarjoama).",
            "Pääsy Shopify Adminiin.",
          ],
          installationSteps: [
            {
              title: "Asennusohjeet",
              steps: [
                "Avaa Shopify Admin.",
                "Siirry Online Store → Themes.",
                "Klikkaa \"Edit Code\" aktiiviselta teemalta.",
                "Avaa theme.liquid.",
                "Siirry tiedoston loppuun.",
                "Liitä skripti heti ennen </body>-tagia.",
                "Tallenna.",
              ],
            },
          ],
          troubleshooting: [
            {
              title: "Chat-kupla piilossa",
              items: [
                "Jos chat-kupla on piilossa, lisää tämä teeman CSS:ään:",
              ],
              code: `.voiceflow-chat, .vfrc-launcher {
  z-index: 999999 !important;
}`,
            },
          ],
        },
        en: {
          whatYouNeed: [
            "Your Mitrox AI Advisor script (provided by Mitrox).",
            "Access to Shopify Admin.",
          ],
          installationSteps: [
            {
              title: "Installation Steps",
              steps: [
                "Open Shopify Admin.",
                "Go to Online Store → Themes.",
                "Click \"Edit Code\" on your active theme.",
                "Open theme.liquid.",
                "Scroll to the very bottom.",
                "Paste the script right before </body>.",
                "Save.",
              ],
            },
          ],
          troubleshooting: [
            {
              title: "Chat bubble is hidden",
              items: [
                "If the chat bubble is hidden, add this to your theme CSS:",
              ],
              code: `.voiceflow-chat, .vfrc-launcher {
  z-index: 999999 !important;
}`,
            },
          ],
        },
      }}
    />
  );
};

export default DocsShopifyPage;

