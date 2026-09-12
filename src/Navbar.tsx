import { useState } from "react";
import { Link } from "react-router-dom";

interface EnlaceNav {
  label: string;
  to: string;
}

interface NavbarProps {
  enlaces: EnlaceNav[];
}

export default function Navbar({ enlaces }: NavbarProps) {
  // Estado local tipado: solo puede ser true o false.
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Evento tipado: el manejador de un botón HTML.
  const handleToggle: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="app-navbar">
      <button onClick={handleToggle}>{isOpen ? "Cerrar menú" : "Abrir menú"}</button>
      {isOpen && (
        <ul>
          {enlaces.map((enlace) => (
            <li key={enlace.to}>
              <Link to={enlace.to}>{enlace.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
