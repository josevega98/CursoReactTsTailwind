import { useEffect, useState, type ReactNode } from "react";
import { TemaContext, type Tema } from "./TemaContext";

interface TemaProviderProps {
  children: ReactNode;
}

// Estado inicial: el tema que tenga el sistema operativo o el navegador.
function temaInicial(): Tema {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "oscuro"
    : "claro";
}

export default function TemaProvider({ children }: TemaProviderProps) {
  const [tema, setTema] = useState<Tema>(temaInicial);

  // Sincroniza el estado con el DOM: Tailwind activa las clases "dark:" de
  // toda la app cuando el <html> tiene la clase "dark".
  useEffect(() => {
    document.documentElement.classList.toggle("dark", tema === "oscuro");
  }, [tema]);

  const alternarTema = () => {
    setTema((actual) => (actual === "oscuro" ? "claro" : "oscuro"));
  };

  // React 19: el contexto se usa directamente como proveedor
  // (antes se escribía <TemaContext.Provider>).
  return <TemaContext value={{ tema, alternarTema }}>{children}</TemaContext>;
}
