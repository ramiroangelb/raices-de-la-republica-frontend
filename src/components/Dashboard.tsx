import React, { useMemo } from 'react'
import type { Donor, Campaign, GalleryItem, BlogPost } from '../types'

interface DashboardProps {
  donors: Donor[]
  campaigns: Campaign[]
  gallery: GalleryItem[]
  blogPosts: BlogPost[]
}

function Dashboard({ donors, campaigns, gallery, blogPosts }: DashboardProps) {
  const totalRaised = useMemo(
    () => {
      return donors.reduce((acc, d) => acc + parseFloat(d.amount as any || 0), 0) +
      campaigns.reduce((acc, c) => acc + (c.raised || 0), 0)
    },
    [donors, campaigns]
  )
  const activeCampaignsCount = useMemo(
    () => campaigns.filter(c => c.status === 'Activa').length,
    [campaigns]
  )
  const totalDonationsCount = donors.length;
  const totalRaisedThisMonth = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth(); // 0-11
    const currentYear = now.getFullYear();
  
    return donors.reduce((acc, donor) => {
      const donorDate = new Date(donor.date);
      
      // Comparamos mes y año para asegurar que es el mes actual del año actual
      if (
        donorDate.getMonth() === currentMonth &&
        donorDate.getFullYear() === currentYear
      ) {
        return acc + (Number(donor.amount) || 0);
      }
      
      return acc;
    }, 0);
  }, [donors]);

  return (
    <div className="row g-4">
    <div className="w-50 col-12 col-sm-6 col-lg-3">
        <div className="card border-0 p-4 shadow-sm rounded-4 h-100">
          <span className="text-secondary small fw-bold text-uppercase">Recaudación del periodo (SIN CONTAR CAMPAÑAS)</span>
          <h3 className="fw-black text-dark mt-2 mb-0">${totalRaisedThisMonth.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</h3>
        </div>
      </div>
      <div className="w-50 col-12 col-sm-6 col-lg-3">
        <div className="card border-0 p-4 shadow-sm rounded-4 h-100">
          <span className="text-secondary small fw-bold text-uppercase">Recaudación Histórica</span>
          <h3 className="fw-black text-dark mt-2 mb-0">${totalRaised.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</h3>
        </div>
      </div>
      <div className="col-12 col-sm-6 col-lg-3">
        <div className="card border-0 p-4 shadow-sm rounded-4 h-100">
          <span className="text-secondary small fw-bold text-uppercase">Campañas Activas</span>
          <h3 className="fw-black text-dark mt-2 mb-0">{activeCampaignsCount}</h3>
        </div>
      </div>
      <div className="col-12 col-sm-6 col-lg-3">
        <div className="card border-0 p-4 shadow-sm rounded-4 h-100">
          <span className="text-secondary small fw-bold text-uppercase">Fotos en Galería</span>
          <h3 className="fw-black text-dark mt-2 mb-0">{gallery.length}</h3>
        </div>
      </div>
      <div className="col-12 col-sm-6 col-lg-3">
        <div className="card border-0 p-4 shadow-sm rounded-4 h-100">
          <span className="text-secondary small fw-bold text-uppercase">Entradas de Blog</span>
          <h3 className="fw-black text-dark mt-2 mb-0">{blogPosts.length}</h3>
        </div>
      </div>
      <div className="col-12 col-sm-6 col-lg-3">
        <div className="card border-0 p-4 shadow-sm rounded-4 h-100">
          <span className="text-secondary small fw-bold text-uppercase">Donaciones totales</span>
          <h3 className="fw-black text-dark mt-2 mb-0">{totalDonationsCount}</h3>
        </div>
      </div>
      
      <div className="col-12 col-lg-8">
        <div className="card border-0 p-4 shadow-sm rounded-4">
          <h3 className="fw-bold h5 mb-4">Donaciones Recibidas</h3>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr className="text-secondary small text-uppercase">
                  <th className="border-0">Donador</th>
                  <th className="border-0">Frecuencia</th>
                  <th className="border-0 text-end">Monto</th>
                </tr>
              </thead>
              <tbody>
                {donors.slice(0, 5).map((d) => (
                  <tr key={d.id}>
                    <td className="fw-medium py-3 border-light">{d.name}</td>
                    <td className="py-3 border-light">
                      <span className="badge bg-success-subtle text-success rounded-pill px-2.5 py-1">{d.type}</span>
                    </td>
                    <td className="py-3 text-end fw-bold text-dark border-light">${parseFloat(d.amount as any).toLocaleString('es-AR', { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))}
                {donors.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center py-5 text-secondary">Sin datos de donadores.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-4">
        <div className="card border-0 p-4 shadow-sm rounded-4 h-100">
          <h3 className="fw-bold h5 mb-4">Progreso de Metas</h3>
          <div className="d-flex flex-column gap-4">
            {campaigns.map((c) => {
              const percent = Math.min(Math.round((c.raised / c.target) * 100), 100)
              return (
                <div key={c.id}>
                  <div className="d-flex justify-content-between small fw-bold mb-2">
                    <span className="text-truncate" style={{ maxWidth: '160px' }}>{c.title}</span>
                    <span className="text-success">{percent}%</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div className="progress-bar bg-success" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Dashboard)
