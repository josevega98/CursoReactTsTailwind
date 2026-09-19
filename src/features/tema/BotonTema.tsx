import Button from "../../shared/components/Button";
import { useTema } from "./useTema";

export default function BotonTema() {
  const { tema, alternarTema } = useTema();
  return (
    <Button
      variante="secondary"
      onClick={alternarTema}
      aria-label="Modo oscuro"
      aria-pressed={tema === "oscuro"}
    >
      <span aria-hidden="true" className="mr-2">{tema === "oscuro" ? "☀" : "◐"}</span>
      {tema === "oscuro" ? "Modo claro" : "Modo oscuro"}
    </Button>
  );
}
