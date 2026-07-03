import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="mqa-footer pt-5 pb-4 mt-auto">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <img
                src="/logo_raices_solitario.png"
                alt="Logo de Manos que Alimentan"
                width={48}
                height={48}
                style={{ borderRadius: "50%", background: "#fff" }}
              />
              <span className="mt-1 p-lg-1 fw-bolder fs-5 text-white">Raíces de la República</span>
            </div>
            <p className="mb-0" style={{ maxWidth: 320 }}>
              Trabajamos cada día construyendo un futuro brillante para los niños. Tu ayuda transforma vidas.
            </p>
          </div>

          <div className="col-6 col-lg-2">
            <h6 className="text-white fw-bold mb-3">Navegación</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/informacion">Información</Link></li>
              <li><Link to="/donar">Donar</Link></li>
            </ul>
          </div>

          <div className="col-6 col-lg-3">
            <h6 className="text-white fw-bold mb-3">Contacto</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              <li>hola@manosquealimentan.org</li>
              <li>+34 900 123 456</li>
              <li>Calle Solidaridad 12, Madrid</li>
            </ul>
          </div>

          <div className="col-lg-3">
            <h6 className="text-white fw-bold mb-3">Recibe novedades</h6>
            <form className="d-flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                className="form-control"
                placeholder="Tu correo"
                aria-label="Tu correo electrónico"
                required
              />
              <button className="btn btn-amber" type="submit">
                Ir
              </button>
            </form>
          </div>
        </div>

        <hr className="my-4" style={{ borderColor: "rgba(255,255,255,0.15)" }} />
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small">
          <span>© {new Date().getFullYear()} Raíces de la República. ONG sin fines de lucro.</span>
          <span>Hecho con propósito · Transparencia · Compromiso</span>
          <span>Desarrollado por Ramiro Bahilez</span>
        </div>
      </div>
    </footer>
  )
}
