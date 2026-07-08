import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Used only by the "Get in touch" contact form — sends the message to
// info@mitrox.io via Web3Forms. Waitlist signups go to /api/waitlist instead
// (stored in Supabase, not emailed).
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, name, message, botcheck } = body as {
    email?: string;
    name?: string;
    message?: string;
    botcheck?: string;
  };

  if (botcheck) {
    return NextResponse.json({ success: true });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, message: "Invalid email" }, { status: 400 });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return NextResponse.json({ success: false, message: "Not configured" }, { status: 500 });
  }

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      to: "info@mitrox.io",
      subject: "New contact form message",
      email,
      name,
      message,
    }),
  });

  const data = await res.json();
  if (!data?.success) {
    return NextResponse.json({ success: false, message: data?.message }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
