import { useState } from "react"
import { Link } from "react-router-dom"
import { CheckIcon, HeartIcon, CopyIcon } from "../components/Icons"

type Mode = "transferencia" | "fisica"

const itemTypes = [
  { id: "alimentos", label: "Alimentos", hint: "No perecederos, enlatados" },
  { id: "ropa", label: "Ropa", hint: "Limpia y en buen estado" },
  { id: "insumos", label: "Insumos", hint: "Útiles, ingredientes" },
]

const bankDetails = [
  { label: "Beneficiario", value: "ASOCIACION CIVIL SIN FINES DE LUCRO RAICES DE LA REPUBLICA" },
  { label: "CBU", value: "111111111111111111111111111111" },
  { label: "ALIAS", value: "RAICES33BIS" },
  { label: "Concepto", value: "Donación + tu nombre" },
]

export default function Donate() {
  const [mode, setMode] = useState<Mode>("transferencia")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [form, setForm] = useState({ nombre: "", email: "", detalle: "", mensaje: "" })
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)

  function toggleItem(id: string) {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function copyIban() {
    navigator.clipboard?.writeText("ES91 2100 0418 4502 0005 1332").then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function resetAll() {
    setSubmitted(false)
    setForm({ nombre: "", email: "", detalle: "", mensaje: "" })
    setSelectedItems(["alimentos"])
  }

  if (submitted) {
    const items = itemTypes
      .filter((t) => selectedItems.includes(t.id))
      .map((t) => t.label.toLowerCase())
    const itemsText =
      items.length > 1
        ? `${items.slice(0, -1).join(", ")} y ${items[items.length - 1]}`
        : items[0] || "insumos"

    return (
      <section className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="mqa-card p-5 text-center">
                <span
                  className="mqa-icon-badge mx-auto mb-4"
                  style={{ width: 72, height: 72, background: "var(--mqa-green)", color: "#fff" }}
                >
                  <CheckIcon size={34} />
                </span>
                <h1 className="fw-bold mb-3 text-balance">¡Gracias, {form.nombre || "amig@"}!</h1>
                <p className="fs-5 text-muted text-pretty mb-4">
                  Hemos registrado tu intención de donar{" "}
                  <strong className="text-green-dark">{itemsText}</strong>. Cada aporte se transforma en
                  platos llenos y sonrisas. Te escribiremos a{" "}
                  <strong>{form.email || "tu correo"}</strong> para coordinar la entrega o recogida.
                </p>
                <div className="d-flex flex-wrap gap-3 justify-content-center">
                  <Link to="/" className="btn btn-primary btn-lg">
                    Volver al inicio
                  </Link>
                  <button className="btn btn-outline-primary btn-lg" onClick={resetAll}>
                    Hacer otra donación
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="bg-cream-deep">
        <div className="container pt-5 pb-4 text-center">
          <p className="eyebrow mb-2">Tu ayuda cuenta</p>
          <h1 className="display-5 fw-bold mb-3 text-balance">Formá parte del cambio</h1>
          <p className="fs-5 text-muted mx-auto text-pretty" style={{ maxWidth: 560 }}>
            Podés ayudarnos aportando dinero por transferencia o donando alimentos, ropa e insumos. Elegí la
            forma que mejor se adapte a vos.
          </p>
        </div>
      </section>

      <section className="section pt-5">
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className="col-lg-7">
              {/* Mode toggle */}
              <div
                className="btn-group w-100 mb-4"
                role="group"
                aria-label="Tipo de donación"
              >
                <button
                  type="button"
                  className={`btn btn-lg ${mode === "transferencia" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setMode("transferencia")}
                  aria-pressed={mode === "transferencia"}
                >
                  Transferencia
                </button>
                <button
                  type="button"
                  className={`btn btn-lg ${mode === "fisica" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setMode("fisica")}
                  aria-pressed={mode === "fisica"}
                >
                  Donación física
                </button>
              </div>

              {/* Option A: transfer */}
              {mode === "transferencia" && (
                <div className="mqa-card p-4 p-md-5">
                  <h2 className="h4 fw-bold mb-2">Donar por transferencia</h2>
                  <p className="text-muted text-pretty mb-4">
                    Realiza tu aporte con una transferencia bancaria a la siguiente cuenta. Incluye tu nombre
                    en el concepto para que podamos agradecértelo.
                  </p>

                  <ul className="list-unstyled d-flex flex-column gap-3 mb-4">
                    {bankDetails.map((d) => (
                      <li
                        key={d.label}
                        className="d-flex justify-content-between align-items-center gap-3 pb-3 border-bottom"
                      >
                        <span className="text-muted small fw-semibold">{d.label}</span>
                        <span className="fw-bold text-end" style={{ letterSpacing: "0.02em" }}>
                          {d.value}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className="btn btn-amber btn-lg w-100 d-inline-flex align-items-center justify-content-center gap-2"
                    onClick={copyIban}
                  >
                    {copied ? <CheckIcon size={20} /> : <CopyIcon size={20} />}
                    {copied ? "CBU copiado" : "Copiar CBU"}
                  </button>
                  <p className="text-muted small text-center mt-3 mb-0">
                    Estos datos bancarios son de demostración. No se procesan pagos reales.
                  </p>
                </div>
              )}

              {/* Option B: physical donation intent */}
              {mode === "fisica" && (
                <form className="mqa-card p-4 p-md-5" onSubmit={handleSubmit}>
                  <h2 className="h4 fw-bold mb-2">Donación de alimentos, ropa o insumos</h2>
                  <p className="text-muted text-pretty mb-4">
                    Contanos qué te gustaría donar y nos ponemos en contacto con vos para coordinar la entrega o recogida.
                  </p>

                  <label className="fw-bold mb-2 d-block">¿Qué quieres donar?</label>
                  <div className="row g-3 mb-4">
                    {itemTypes.map((t) => (
                      <div className="col-12 col-md-4" key={t.id}>
                        <button
                          type="button"
                          className={`amount-btn ${selectedItems.includes(t.id) ? "selected" : ""}`}
                          onClick={() => toggleItem(t.id)}
                          aria-pressed={selectedItems.includes(t.id)}
                        >
                          {t.label}
                          <small>{t.hint}</small>
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="row g-3">
                    <div className="col-12">
                      <label htmlFor="detalle" className="form-label fw-semibold">
                        Detalle de la donación
                      </label>
                      <textarea
                        id="detalle"
                        className="form-control"
                        rows={3}
                        placeholder="Ej.: 10 kg de arroz y pasta, 2 bolsas de ropa de invierno..."
                        value={form.detalle}
                        onChange={(e) => setForm({ ...form, detalle: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="nombre" className="form-label fw-semibold">
                        Nombre
                      </label>
                      <input
                        id="nombre"
                        type="text"
                        className="form-control form-control-lg"
                        required
                        value={form.nombre}
                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label fw-semibold">
                        Correo electrónico
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-control form-control-lg"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="mensaje" className="form-label fw-semibold">
                        Mensaje (opcional)
                      </label>
                      <textarea
                        id="mensaje"
                        className="form-control"
                        rows={2}
                        placeholder="Deja un mensaje de aliento"
                        value={form.mensaje}
                        onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-amber btn-lg w-100 mt-4 d-inline-flex align-items-center justify-content-center gap-2"
                    disabled={selectedItems.length === 0}
                  >
                    <HeartIcon size={20} /> Enviar intención de donación
                  </button>
                  <p className="text-muted small text-center mt-3 mb-0">
                    Nos pondremos en contacto para coordinar la entrega o recogida.
                  </p>
                </form>
              )}
            </div>

            {/* Aside impact */}
            <div className="col-lg-4">
              {mode === "fisica" && (
              <div className="mqa-card h-auto p-4 mb-4">
                <h3 className="h5 fw-bold mb-3">Tu impacto</h3>
                <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
                  {[
                    "Una bolsa de alimentos es comida para los niños por una semana.",
                    "Ropa de abrigo es calor para quienes pasan el invierno en situaciones vulnerables.",
                    "Zapatillas son un paso más para quienes buscan salir adelante.",
                    "Insumos es dignidad para las personas vulnerables.",
                  ].map((t, i) => (
                    <li key={i} className="d-flex gap-2">
                      <span className="text-green-dark flex-shrink-0">
                        <CheckIcon size={20} />
                      </span>
                      <span className="small">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              )}
              {mode === "transferencia" && (
                <div className="mqa-card h-auto p-4 mb-4">
                  <h3 className="h5 fw-bold mb-3">Tu impacto</h3>
                  <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
                    {[
                      "$15.000 es comida para una familia una semana.",
                      "$30.000 es alimentación de un niño durante un mes.",
                      "$60.000 es un comedor comunitario funcionando un día entero.",
                    ].map((t, i) => (
                      <li key={i} className="d-flex gap-2">
                        <span className="text-green-dark flex-shrink-0">
                          <CheckIcon size={20} />
                        </span>
                        <span className="small">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Aside impact */}
              <div className="mqa-card h-auto p-4" style={{ background: "var(--mqa-green-dark)" }}>
                <p className="mb-2 fw-bold text-white">Transparencia total</p>
                <p className="small mb-0" style={{ color: "#e9f0ea" }}>
                  El 100% de cada donación se destina directamente a la causa. Publicamos nuestras cuentas cada
                  año para que sepas exactamente cómo se usa tu ayuda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
