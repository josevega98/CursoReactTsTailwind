import { useContext } from "react";
import { TemaContext } from "./TemaContext";

export function useTema() {
  const contexto = useContext(TemaContext);

  if (contexto === null) {
    throw new Error("useTema debe usarse dentro de <TemaProvider>");
  }

  return contexto;
}
