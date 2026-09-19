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
    <nav className="px-6 py-3">
      <button
        onClick={handleToggle}
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white
                   hover:bg-slate-700
                   focus:outline-none focus:ring-4 focus:ring-slate-300
                   active:scale-95
                   dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus:ring-slate-600"
      >
        {isOpen ? "Cerrar menú" : "Abrir menú"}
      </button>
      {isOpen && (
        <ul className="mt-3 flex flex-wrap gap-3">
          {enlaces.map((enlace) => (
            <li key={enlace.to}>
              <Link
                to={enlace.to}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-700
                           hover:bg-slate-100
                           dark:text-slate-300 dark:hover:bg-slate-800"
              >
                {enlace.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
