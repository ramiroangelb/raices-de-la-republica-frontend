import { Link } from "react-router-dom"
import {
  ArrowRightIcon,
  BowlIcon,
  HeartIcon,
  LeafIcon,
  TruckIcon,
  UsersIcon,
  EducationIcon,
  VolunteerIcon,
} from "../components/Icons"


const stats = [
  { number: "156", label: "Comidas servidas al año" },
  { number: "2", label: "Comedores comunitarios" },
  { number: "9", label: "Voluntarios activos" },
  { number: "100%", label: "De lo donado va a la causa" },
]

const ways = [
  {
    icon: <HeartIcon size={26} />,
    title: "Doná",
    text: "Con $15.000 asegurás comidas calientes para los niños durante una semana entera.",
  },
  {
    icon: <UsersIcon size={26} />,
    title: "Sumate como voluntario",
    text: "Sumá tus manos a un equipo que reparte esperanza cada semana.",
  },
  {
    icon: <TruckIcon size={26} />,
    title: "Doná alimentos/ropa",
    text: "Individuos, empresas y comercios pueden donar excedentes para que nada se desperdicie.",
  },
]

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="mqa-hero">
        <div className="container section">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <p className="mqa-hero-eyebrow mb-3">Juntos contra el hambre</p>
              <h1 className="display-4 fw-bold mb-3 text-balance">
                Cada plato lleno es una <span className="text-green-dark">historia que cambia</span>
              </h1>
              <p className="fs-5 text-muted mb-4 text-pretty" style={{ maxWidth: 520 }}>
                Somos Raíces de la República, una ONG que combate por los derechos de los niños en nuestras
                comunidades. Con tu ayuda, llevamos comida, dignidad y futuro a quienes más lo necesitan.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/donar" className="btn btn-primary btn-lg d-inline-flex align-items-center gap-2">
                  Quiero colaborar <ArrowRightIcon size={18} />
                </Link>
                <Link to="/informacion" className="btn btn-outline-primary btn-lg">
                  Conoce nuestra labor
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div style={{ height: 420 }}>
                <img src="/hero.png" alt="Voluntarios repartiendo alimentos a familias" className="mqa-hero-img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-green-dark">
        <div className="container py-5">
          <div className="row text-center g-4">
            {stats.map((s) => (
              <div className="col-6 col-lg-3" key={s.label}>
                <div className="stat-number display-5 text-amber">{s.number}</div>
                <div className="mt-2 small text-uppercase" style={{ letterSpacing: "0.08em", opacity: 0.85 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 order-lg-2">
              <p className="eyebrow mb-2">Nuestra misión</p>
              <h2 className="fw-bold mb-3 text-balance">Comida hoy, oportunidades para mañana</h2>
              <p className="text-muted mb-4 text-pretty">
                No solo repartimos alimentos: acompañamos a los niños con actividades,
                apoyo social y formación para que puedan salir adelante por sí mismas. Creemos en una ayuda
                que devuelve la dignidad y abre caminos.
              </p>
              <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
                {[
                  { icon: <BowlIcon size={22} />, t: "Comedores y reparto de alimentos frescos." },
                  { icon: <LeafIcon size={22} />, t: "Actividades, juegos y cine en grupo." },
                  { icon: <EducationIcon size={22} />, t: "Formación en inglés, manualidades y karate." },
                  { icon: <VolunteerIcon size={22} />, t: "Acompañamiento social a cada familia." },
                ].map((item, i) => (
                  <li key={i} className="d-flex align-items-center gap-3">
                    <span className="mqa-icon-badge flex-shrink-0" style={{ width: 44, height: 44 }}>
                      {item.icon}
                    </span>
                    <span className="fw-semibold">{item.t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-6 order-lg-1">
              <img
                src="/mission.png"
                alt="Manos compartiendo un plato de comida caliente"
                className="w-100"
                style={{ borderRadius: "1.5rem", boxShadow: "0 20px 40px rgba(31,82,51,0.15)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* WAYS TO HELP */}
      <section className="section bg-cream-deep">
        <div className="container">
          <div className="text-center mb-5">
            <p className="eyebrow mb-2">Cómo podés ayudar</p>
            <h2 className="fw-bold text-balance">Hay muchas formas de sumarte</h2>
          </div>
          <div className="row g-4">
            {ways.map((w) => (
              <div className="col-md-4" key={w.title}>
                <div className="mqa-card p-4">
                  <span className="mqa-icon-badge mb-3">{w.icon}</span>
                  <h3 className="h4 fw-bold">{w.title}</h3>
                  <p className="text-muted mb-0">{w.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div
            className="p-5 text-center"
            style={{ background: "var(--mqa-green-dark)", color: "#fff", borderRadius: "1.75rem" }}
          >
            <h2 className="fw-bold mb-3 text-balance">Tu ayuda se convierte en platos llenos</h2>
            <p className="fs-5 mb-4 mx-auto text-pretty" style={{ maxWidth: 560, opacity: 0.9 }}>
              Cada aporte, por pequeño que sea, se transforma en comida caliente para una familia. Únete hoy.
            </p>
            <Link to="/donar" className="btn btn-amber btn-lg d-inline-flex align-items-center gap-2">
              Hacer una donación <ArrowRightIcon size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
