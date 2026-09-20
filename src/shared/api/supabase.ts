import { createClient } from "@supabase/supabase-js";
import { apiConfigurada, supabasePublicKey, supabaseUrl } from "./config";

// El SDK solo gestiona Auth. Las citas se consultan por REST con Fetch/Axios.
export const supabase = apiConfigurada
  ? createClient(supabaseUrl, supabasePublicKey)
  : null;
