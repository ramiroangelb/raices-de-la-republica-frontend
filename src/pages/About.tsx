import { Link } from "react-router-dom"
import { ArrowRightIcon, HeartIcon, LeafIcon, ShieldIcon, UsersIcon,} from "../components/Icons"

const startingYear = 2024

const values = [
  {
    icon: <HeartIcon size={26} />,
    title: "Dignidad",
    text: "Tratamos a cada persona con el respeto y el cuidado que merece, sin excepciones.",
  },
  {
    icon: <ShieldIcon size={26} />,
    title: "Transparencia",
    text: "Rendimos cuentas de cada peso. El 100% de lo donado llega directo a la causa.",
  },
  {
    icon: <LeafIcon size={26} />,
    title: "Recreación",
    text: "Brindamos espacios de aprendizaje, entretenimiento, juego y actividad física.",
  },
  {
    icon: <UsersIcon size={26} />,
    title: "Comunidad",
    text: "Creemos en el poder de las personas organizadas para transformar su entorno.",
  },
]

const timeline = [
  { year: "2012", text: "Nace Raíces de la República con un pequeño comedor en un barrio de La Plata." },
  { year: "2016", text: "Abrimos 10 comedores comunitarios y creamos la red de voluntariado." },
  { year: "2020", text: "Durante la pandemia triplicamos el reparto de alimentos a domicilio." },
  { year: "2024", text: "Servimos más de 1,2 millones de comidas al año en 45 centros." },
]

const faqs = [
  {
    q: "¿A dónde va mi donación?",
    a: "El 100% de cada aporte se destina directamente a comprar alimentos, sostener los comedores y financiar los programas sociales. Publicamos nuestras cuentas cada año.",
  },
  {
    q: "¿Puedo ser voluntario si tengo poco tiempo?",
    a: "Sí. Contamos con turnos flexibles, desde unas horas puntuales hasta compromisos semanales. Cada mano suma.",
  },
  {
    q: "¿Cómo pueden colaborar los individuos?",
    a: "Los individuos pueden donar dinero, ropa y/o alimentos, y presentándose como voluntarios. Cada aporte, grande o pequeño, contribuye a que más personas accedan a una alimentación y formación digna.",
  },
  {
    q: "¿Cómo pueden colaborar las empresas?",
    a: "Las empresas pueden donar excedentes de ropa y/o alimentos, apadrinar un comedor o realizar voluntariado corporativo. Escríbenos y diseñamos la colaboración.",
  },
]

export default function About() {
  return (
    <>
      {/* HEADER */}
      <section className="bg-cream-deep">
        <div className="container section">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <p className="eyebrow mb-2">Quiénes somos</p>
              <h1 className="display-5 fw-bold mb-3 text-balance">
                Una red de personas que no se resigna al hambre
              </h1>
              <p className="fs-5 text-muted text-pretty">
                Desde {startingYear} trabajamos para garantizar el derecho a una alimentación digna. Lo hacemos junto a
                miles de voluntarios, familias y aliados que comparten un mismo sueño: que nadie pase hambre.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-5">
            <p className="eyebrow mb-2">Nuestros valores</p>
            <h2 className="fw-bold text-balance">Lo que nos mueve cada día</h2>
          </div>
          <div className="row g-4">
            {values.map((v) => (
              <div className="col-sm-6 col-lg-3" key={v.title}>
                <div className="mqa-card p-4 text-center">
                  <span className="mqa-icon-badge mx-auto mb-3">{v.icon}</span>
                  <h3 className="h5 fw-bold">{v.title}</h3>
                  <p className="text-muted small mb-0">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY + TIMELINE */}
      <section className="section bg-cream-deep">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5">
              <img
                src="/community.png"
                alt="Voluntarios preparando cajas de alimentos"
                className="w-100"
                style={{ borderRadius: "1.5rem", boxShadow: "0 20px 40px rgba(31,82,51,0.15)" }}
              />
            </div>
            <div className="col-lg-7">
              <p className="eyebrow mb-2">Nuestra historia</p>
              <h2 className="fw-bold mb-4 text-balance">De un comedor de barrio a toda una comunidad</h2>
              <div className="d-flex flex-column gap-4">
                {timeline.map((t) => (
                  <div className="d-flex gap-3" key={t.year}>
                    <div
                      className="flex-shrink-0 fw-bold d-flex align-items-center justify-content-center"
                      style={{
                        width: 68,
                        height: 68,
                        borderRadius: "1rem",
                        background: "var(--mqa-green)",
                        color: "#fff",
                        fontFamily: "Fraunces, serif",
                      }}
                    >
                      {t.year}
                    </div>
                    <p className="mb-0 align-self-center">{t.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5">
                <p className="eyebrow mb-2">Preguntas frecuentes</p>
                <h2 className="fw-bold text-balance">Resolvemos tus dudas</h2>
              </div>
              <div className="accordion" id="faqAccordion">
                {faqs.map((f, i) => (
                  <div className="accordion-item border-0 mb-3 mqa-card" key={i}>
                    <h3 className="accordion-header">
                      <button
                        className="accordion-button collapsed fw-bold bg-transparent"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#faq${i}`}
                        aria-expanded="false"
                        aria-controls={`faq${i}`}
                      >
                        {f.q}
                      </button>
                    </h3>
                    <div id={`faq${i}`} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                      <div className="accordion-body text-muted">{f.a}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-5">
        <div className="container">
          <div
            className="p-5 text-center"
            style={{ background: "var(--mqa-green-dark)", color: "#fff", borderRadius: "1.75rem" }}
          >
            <h2 className="fw-bold mb-3 text-balance">¿Listo para formar parte del cambio?</h2>
            <p className="fs-5 mb-4 mx-auto text-pretty" style={{ maxWidth: 520, opacity: 0.9 }}>
              Tu apoyo hace posible que sigamos llevando comida y esperanza a los niños.
            </p>
            <Link to="/donar" className="btn btn-amber btn-lg d-inline-flex align-items-center gap-2">
              Colaborar ahora <ArrowRightIcon size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
