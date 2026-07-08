import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, botcheck } = body as { email?: string; botcheck?: string };

  if (botcheck) {
    return NextResponse.json({ success: true });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, message: "Invalid email" }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ success: false, message: "Not configured" }, { status: 500 });
  }

  const { error } = await supabase.from("waitlist").insert({ email });

  // A unique-constraint violation just means this email already signed up —
  // treat that as a success from the user's point of view, not an error.
  if (error && error.code !== "23505") {
    return NextResponse.json({ success: false, message: error.message }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
