import React from 'react'
import type { Donor } from '../types'

interface DonorsSectionProps {
  donors: Donor[]
  onEdit: (donor: Donor) => void
  onDelete: (id: string) => void
}

function DonorsSection({ donors, onEdit, onDelete }: DonorsSectionProps) {
  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light text-secondary small text-uppercase">
            <tr>
              <th className="p-4 border-0">Nombre / Correo</th>
              <th className="p-4 border-0">Monto (USD)</th>
              <th className="p-4 border-0">Frecuencia</th>
              <th className="p-4 border-0">Fecha</th>
              <th className="p-4 text-center border-0">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((d) => (
              <tr key={d.id}>
                <td className="p-4 border-light">
                  <div className="fw-bold text-dark">{d.name}</div>
                  <div className="text-secondary small">{d.email}</div>
                </td>
                <td className="p-4 border-light fw-bold text-dark">${parseFloat(d.amount as any).toLocaleString('es-AR', { minimumFractionDigits: 2 })}</td>
                <td className="p-4 border-light">
                  <span className="badge bg-success-subtle text-success px-3 py-1.5 rounded-pill">{d.type}</span>
                </td>
                <td className="p-4 border-light text-secondary small">{d.date}</td>
                <td className="p-4 border-light text-center">
                  <button onClick={() => onEdit(d)} className="btn btn-sm btn btn-sm btn-success me-2">Editar</button>
                  <button onClick={() => onDelete(d.id)} className="btn btn-sm btn-danger">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default React.memo(DonorsSection)
