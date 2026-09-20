export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, "") ?? "";
export const supabasePublicKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "";
export const apiConfigurada = Boolean(supabaseUrl && supabasePublicKey);
