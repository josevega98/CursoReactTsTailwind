import { useEffect, useState } from "react";

// Custom hook: la lógica del reloj (estado + efecto + cleanup) vive aquí,
// separada de la interfaz.
export function useAhora(intervaloMs: number = 1000): Date {
  const [ahora, setAhora] = useState<Date>(new Date());

  useEffect(() => {
    const intervaloId = setInterval(() => setAhora(new Date()), intervaloMs);
    return () => clearInterval(intervaloId);
  }, [intervaloMs]); // El efecto usa intervaloMs, por eso es una dependencia.

  return ahora;
}
