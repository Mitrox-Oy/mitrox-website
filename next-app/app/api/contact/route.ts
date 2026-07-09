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
    console.error("WEB3FORMS_ACCESS_KEY not set in env");
    return NextResponse.json({ success: false, message: "Not configured" }, { status: 500 });
  }

  const formData = new FormData();
  formData.append("access_key", accessKey);
  formData.append("subject", "New contact form message");
  formData.append("from_name", name || "");
  formData.append("email", email);
  formData.append("to", "info@mitrox.io");
  formData.append("message", message || "");

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!data?.success) {
    console.error("Web3Forms error:", { status: res.status, data });
    return NextResponse.json({ success: false, message: data?.message }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
