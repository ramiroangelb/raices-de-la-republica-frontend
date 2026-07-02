import { useState } from "react"
import { Link, NavLink } from "react-router-dom"

const links = [
  { to: "/", label: "Inicio", end: true },
  { to: "/informacion", label: "Información" },
  { to: "/donar", label: "Donar" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="mqa-navbar">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between py-2">
          {/* Brand + oversized circular logo */}
          <Link
            to="/"
            className="d-flex align-items-center gap-3 text-decoration-none"
            onClick={() => setOpen(false)}
          >
            <span className="mqa-logo-wrap">
              <img src="/logo_raices_solitario.png" alt="Logo de Raíces de la República" className="" style={{marginLeft: "0.5rem",marginTop: "-1.6rem", width: "100px", WebkitFilter: "drop-shadow(5px 5px 5px #222)", filter: "drop-shadow(-2px 2px 1px #2226)"}} />
            </span>
            <span className="d-flex flex-column lh-1">
              <img src="/texto_raices.png" alt="Raíces de la República asociación civil Leg. 239598 Mat. 46251" className=""  style={{marginLeft: "-0.5rem",width: "365px"}} />
            </span>
          </Link>

          {/* Mobile toggle */}
          <button
            className="btn btn-sm d-lg-none border"
            type="button"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="navbar-toggler-icon d-inline-block" style={{ width: 20, height: 20 }}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              </svg>
            </span>
          </button>

          {/* Desktop links */}
          <div className="d-none d-lg-flex align-items-center gap-2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) => `nav-link mqa-nav-link${isActive ? " active" : ""}`}
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/donar" className="btn btn-amber ms-2">
              Colaborar ahora
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="d-lg-none pb-3">
            <div className="d-flex flex-column gap-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => `nav-link mqa-nav-link${isActive ? " active" : ""}`}
                >
                  {l.label}
                </NavLink>
              ))}
              <Link to="/donar" className="btn btn-amber mt-2" onClick={() => setOpen(false)}>
                Colaborar ahora
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
