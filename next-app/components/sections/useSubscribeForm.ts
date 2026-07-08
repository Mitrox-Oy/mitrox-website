"use client";

import { useState } from "react";

export function useSubscribeForm(endpoint: "/api/waitlist" | "/api/contact") {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function submit(fields: { email: string; name?: string; message?: string; botcheck?: string }) {
    setStatus("submitting");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      setStatus(data.success ? "success" : "error");
      return data.success as boolean;
    } catch {
      setStatus("error");
      return false;
    }
  }

  return { status, submit };
}
