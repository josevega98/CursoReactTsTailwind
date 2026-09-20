import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../../shared/api/supabase";
import { queryClient } from "../../shared/api/queryClient";

// Se conserva al navegar: volver a esta página no debe vaciar la caché.
let usuarioDeCache: string | undefined;

export function useSesionPractica() {
  const [sesion, setSesion] = useState<Session | null>(null);
  const [cargando, setCargando] = useState(Boolean(supabase));

  useEffect(() => {
    if (!supabase) return;
    // Incluye INITIAL_SESSION: recupera también la sesión guardada por el SDK.
    const { data } = supabase.auth.onAuthStateChange((_evento, siguiente) => {
      if (usuarioDeCache !== siguiente?.user.id) queryClient.clear();
      usuarioDeCache = siguiente?.user.id;
      setSesion(siguiente);
      setCargando(false);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  return { sesion, cargando };
}
