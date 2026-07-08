import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client for the waitlist API route. Uses the service
 * role key (never exposed to the browser — this file is imported only from
 * app/api/* route handlers) so inserts work regardless of RLS policy while
 * still keeping the key out of client bundles entirely.
 */
export function getSupabaseServerClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
