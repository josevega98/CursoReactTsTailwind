import { useEffect, useState } from "react";

export default function RelojActual() {
  const [horaActual, setHoraActual] = useState<Date>(new Date());

  useEffect(() => {
    const intervaloId = setInterval(() => {
      setHoraActual(new Date());
    }, 1000);
    return () => clearInterval(intervaloId);
  }, []); // Arreglo de dependencias vacío: el efecto corre una sola vez.

  return (
    <p className="reloj-actual">
      Hora actual: <strong>{horaActual.toLocaleTimeString()}</strong>
    </p>
  );
}
