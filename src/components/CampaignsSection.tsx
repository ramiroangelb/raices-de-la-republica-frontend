import React from 'react'
import type { Campaign } from '../types'

interface CampaignsSectionProps {
  campaigns: Campaign[]
  onEdit: (campaign: Campaign) => void
  onDelete: (id: string) => void
}

function CampaignsSection({ campaigns, onEdit, onDelete }: CampaignsSectionProps) {
  return (
    <div className="row g-4">
      {campaigns.map((c) => (
        <div key={c.id} className="col-12 col-md-6 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-column h-100 justify-content-between">
            <div>
              <span className="badge bg-light text-dark mb-3 px-2.5 py-1.5 border fw-bold">{c.status}</span>
              <h3 className="fw-bold h5 text-dark mb-2 ong-font">{c.title}</h3>
              <p className="text-secondary small mb-4">{c.description}</p>
            </div>
            <div className="border-top pt-3">
              <div className="d-flex justify-content-between small fw-bold mb-2">
                <span>Recaudado</span>
                <span>${c.raised.toLocaleString('es-AR', { minimumFractionDigits: 2 })} / ${c.target.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="d-flex justify-content-end gap-2">
                <button onClick={() => onEdit(c)} className="btn btn-sm btn-success">Editar</button>
                <button onClick={() => onDelete(c.id)} className="btn btn-sm btn-danger">Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default React.memo(CampaignsSection)
