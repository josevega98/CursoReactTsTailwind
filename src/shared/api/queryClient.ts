import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10_000,
      gcTime: 5 * 60_000,
      retry: false,
      refetchOnWindowFocus: false,
      // En clase queremos observar el fallo HTTP incluso con DevTools Offline.
      // El modo predeterminado de Query puede pausar una consulta sin conexión.
      networkMode: "always",
    },
    mutations: { retry: false, networkMode: "always" },
  },
});
