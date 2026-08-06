import { Link } from "react-router-dom"
import { ArrowRightIcon, BowlIcon, HeartIcon } from "../components/Icons"

export default function NotFound() {
  return (
    <section className="py-5">
      <div className="container py-5">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8">
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
              style={{
                width: 110,
                height: 110,
                background: "var(--mqa-cream-dark)",
                color: "var(--mqa-green-dark)",
              }}
            >
              <BowlIcon size={54} />
            </div>

            <p className="fw-bold text-uppercase mb-2" style={{ letterSpacing: "0.12em", color: "var(--mqa-green)" }}>
              Error 404
            </p>
            <h1 className="display-3 fw-bold mb-3">Esta página está vacía</h1>
            <p className="fs-5 text-secondary mb-4 mx-auto" style={{ maxWidth: 560 }}>
              No encontramos lo que buscabas, pero hay muchos platos por llenar. Volvamos al camino para seguir
              alimentando esperanza.
            </p>

            <div className="d-flex flex-wrap gap-3 justify-content-center">
              <Link to="/" className="btn btn-primary btn-lg d-inline-flex align-items-center gap-2">
                <ArrowRightIcon size={20} />
                Volver al inicio
              </Link>
              <Link to="/donar" className="btn btn-amber btn-lg d-inline-flex align-items-center gap-2">
                <HeartIcon size={20} />
                Quiero colaborar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
