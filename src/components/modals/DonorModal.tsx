import React, { useState } from 'react'
import type { Donor, DonorFormData, ModalMode } from '../../types'

interface DonorModalProps {
  mode: ModalMode
  initialData: Donor | null
  onClose: () => void
  onSubmit: (data: DonorFormData) => void
}

const emptyForm: DonorFormData = { name: '', email: '', amount: 0, type: 'Mensual', status: 'Activo' }

function DonorModal({ mode, initialData, onClose, onSubmit }: DonorModalProps) {
  // Este estado vive solo aquí: escribir en el formulario ya no re-renderiza el panel completo
  const [form, setForm] = useState<DonorFormData>(
    initialData
      ? { name: initialData.name, email: initialData.email, amount: initialData.amount, type: initialData.type, status: initialData.status }
      : emptyForm
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    return
  }

  return (
    <div onClick={handleOverlayClick} className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1050 }}>
      <div className="modal-dialog w-100" style={{ maxWidth: '540px' }}>
        <div className="modal-content shadow-2xl border-0 rounded-4 overflow-hidden animate-in" style={{ backgroundColor: '#FAF6EE' }}>
          <div className="modal-header bg-dark text-white py-3 px-4 d-flex align-items-center justify-content-between">
            <h3 className="modal-title h5 fw-bold mb-0 ong-font">Formulario de Registro de Donante</h3>
            <button onClick={onClose} type="button" className="btn-close btn-close-white" aria-label="Close"></button>
          </div>

          <form onSubmit={handleSubmit} className="modal-body p-4 d-flex flex-column gap-3 overflow-y-auto" style={{ maxHeight: '75vh' }}>
            <div>
              <label className="form-label small fw-bold text-secondary mb-1">Nombre Completo</label>
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="form-control rounded-3" />
            </div>
            <div>
              <label className="form-label small fw-bold text-secondary mb-1">Correo Electrónico</label>
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="form-control rounded-3" />
            </div>
            <div className="row g-3">
              <div className="col-6">
                <label className="form-label small fw-bold text-secondary mb-1">Monto (USD)</label>
                <input type="number" step="0.01" required value={form.amount} onChange={(e) => setForm({ ...form, amount: parseFloat(e.target.value) || 0 })} className="form-control rounded-3" />
              </div>
              <div className="col-6">
                <label className="form-label small fw-bold text-secondary mb-1">Frecuencia</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="form-select rounded-3">
                  <option value="Mensual">Mensual</option>
                  <option value="Única">Única</option>
                  <option value="Anual">Anual</option>
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 pt-3 border-top mt-2">
              <button type="button" onClick={onClose} className="btn btn-danger px-4 rounded-3">Cancelar</button>
              <button type="submit" className="btn btn-success px-4 rounded-3 fw-bold shadow-sm">Confirmar Operación</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DonorModal
