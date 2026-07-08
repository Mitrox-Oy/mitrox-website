import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { hasLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export const alt = "Mitrox";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = (hasLocale(lang) ? lang : "fi") as Locale;
  const dict = await getDictionary(locale);
  const logo = await readFile(join(process.cwd(), "public/logo-icon.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#05050a",
          backgroundImage:
            "radial-gradient(60% 50% at 50% 40%, rgba(120,150,255,0.28), transparent 70%)",
          padding: "80px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" width={104} height={84} style={{ objectFit: "contain" }} />
        <div
          style={{
            marginTop: 36,
            fontSize: 76,
            fontWeight: 700,
            color: "white",
            letterSpacing: "-0.02em",
          }}
        >
          Mitrox
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 32,
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
            maxWidth: 860,
          }}
        >
          {dict.meta.homeTitle}
        </div>
      </div>
    ),
    { ...size }
  );
}
