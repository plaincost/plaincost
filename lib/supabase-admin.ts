import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabaseAdmin: SupabaseClient | null = null;

export type WaitlistSignup = {
  email: string;
  created_at: string;
};

export function getSupabaseAdminClient(): SupabaseClient {
  if (supabaseAdmin) {
    return supabaseAdmin;
  }

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.",
    );
  }

  supabaseAdmin = createClient(url, serviceRoleKey);
  return supabaseAdmin;
}

export async function listWaitlistSignups(): Promise<WaitlistSignup[]> {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("waitlist_signups")
    .select("email, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as WaitlistSignup[];
}