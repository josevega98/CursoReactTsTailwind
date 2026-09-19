import { createContext } from "react";

// Union type (Unidad 1): el tema solo puede ser uno de estos dos valores.
export type Tema = "claro" | "oscuro";

export interface TemaContextValue {
  tema: Tema;
  alternarTema: () => void;
}

// null significa "no hay un TemaProvider más arriba en el árbol";
// useTema lo detecta y lanza un error claro en vez de fallar en silencio.
export const TemaContext = createContext<TemaContextValue | null>(null);
