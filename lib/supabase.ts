import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { FormState } from "./types";

let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient | null {
  if (typeof window === "undefined") return null;
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn("Supabase env vars not configured. Submissions will not be saved.");
    return null;
  }

  _client = createClient(url, key);
  return _client;
}

interface SubmissionPayload {
  session_id: string;
  email: string;
  form_data: FormState;
  generated_prompt: string;
  markdown_export: string;
}

export async function saveSubmission(payload: SubmissionPayload) {
  const client = getClient();
  if (!client) return { data: null, error: null };

  const { data, error } = await client.from("submissions").insert({
    session_id: payload.session_id,
    email: payload.email,
    brand_name: payload.form_data.brand_name || null,
    form_data: payload.form_data,
    generated_prompt: payload.generated_prompt,
    markdown_export: payload.markdown_export,
  });

  if (error) {
    console.error("Supabase submission error:", error);
  }

  return { data, error };
}
