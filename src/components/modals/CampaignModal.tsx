import React, { useState } from 'react'
import type { Campaign, CampaignFormData, ModalMode } from '../../types'

interface CampaignModalProps {
  mode: ModalMode
  initialData: Campaign | null
  onClose: () => void
  onSubmit: (data: CampaignFormData) => void
}

const emptyForm: CampaignFormData = { title: '', target: 0, raised: 0, status: 'Activa', description: '' }

function CampaignModal({ mode, initialData, onClose, onSubmit }: CampaignModalProps) {
  const [form, setForm] = useState<CampaignFormData>(
    initialData
      ? { title: initialData.title, target: initialData.target, raised: initialData.raised, status: initialData.status, description: initialData.description }
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
            <h3 className="modal-title h5 fw-bold mb-0 ong-font">Formulario de Registro de Campaña</h3>
            <button onClick={onClose} type="button" className="btn-close btn-close-white" aria-label="Close"></button>
          </div>

          <form onSubmit={handleSubmit} className="modal-body p-4 d-flex flex-column gap-3 overflow-y-auto" style={{ maxHeight: '75vh' }}>
            <div>
              <label className="form-label small fw-bold text-secondary mb-1">Título de Campaña</label>
              <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="form-control rounded-3" />
            </div>
            <div className="row g-3">
              <div className="col-6">
                <label className="form-label small fw-bold text-secondary mb-1">Meta a recaudar ($)</label>
                <input type="number" required value={form.target} onChange={(e) => setForm({ ...form, target: parseFloat(e.target.value) || 0 })} className="form-control rounded-3" />
              </div>
              <div className="col-6">
                <label className="form-label small fw-bold text-secondary mb-1">Recaudado Actual ($)</label>
                <input type="number" required value={form.raised} onChange={(e) => setForm({ ...form, raised: parseFloat(e.target.value) || 0 })} className="form-control rounded-3" />
              </div>
            </div>
            <div>
              <label className="form-label small fw-bold text-secondary mb-1">Estado</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="form-select rounded-3">
                <option value="Activa">Activa</option>
                <option value="Pausada">Pausada</option>
                <option value="Finalizada">Finalizada</option>
              </select>
            </div>
            <div>
              <label className="form-label small fw-bold text-secondary mb-1">Descripción</label>
              <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="form-control rounded-3" style={{ resize: 'none' }} />
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

export default CampaignModal
