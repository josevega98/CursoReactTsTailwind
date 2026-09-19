import { useState, type ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface EnlaceNav { label: string; to: string; }
interface NavbarProps { enlaces: EnlaceNav[]; acciones?: ReactNode; }

// El slot acciones mantiene shared independiente de las features.
export default function Navbar({ enlaces, acciones }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="site-nav" aria-label="Navegación principal">
      <div className="page-width nav-row">
        <button type="button" className="menu-toggle nav-link" aria-expanded={isOpen}
          aria-controls="enlaces-principales" onClick={() => setIsOpen((actual) => !actual)}>
          {isOpen ? "Cerrar menú" : "Abrir menú"}
        </button>
        <ul id="enlaces-principales" className={`nav-links ${isOpen ? "is-open" : ""}`}>
          {enlaces.map((enlace) => (
            <li key={enlace.to}>
              <NavLink to={enlace.to} end={enlace.to === "/"} onClick={() => setIsOpen(false)}
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                {enlace.label}
              </NavLink>
            </li>
          ))}
        </ul>
        {acciones}
      </div>
    </nav>
  );
}
