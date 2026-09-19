import { useState } from "react";
import Button from "../../shared/components/Button";

// Solo para la demostración en clase: al hacer clic se cambia el estado y, en
// el siguiente render, el componente lanza un error. Ese error (de render) sí
// lo atrapa el ErrorBoundary; lanzarlo directamente dentro del onClick no.
export default function BotonQueFalla() {
  const [debeFallar, setDebeFallar] = useState<boolean>(false);

  if (debeFallar) {
    throw new Error("Error simulado al renderizar BotonQueFalla");
  }

  return (
    <Button variante="danger" onClick={() => setDebeFallar(true)}>
      Simular error de render
    </Button>
  );
}
