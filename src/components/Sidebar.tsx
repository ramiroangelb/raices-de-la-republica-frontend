import React from 'react'
import { AdminIcon } from "../components/Icons"


interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  userEmail: string | undefined
  onLogout: () => void
}

function Sidebar({ activeTab, onTabChange, userEmail, onLogout }: SidebarProps) {
  return (
    <aside
      className="bg-dark text-white-50 p-4 d-flex flex-column justify-content-between border-end border-secondary"
      style={{ width: '100%', maxWidth: '280px', minHeight: '100vh' }}
    >
      <div>
        <div className="d-flex align-items-center gap-3 mb-4">
          <div className="bg-success text-white p-2 rounded-3">
            <AdminIcon/>
          </div>
          <div>
            <h2 className="fw-bold text-white h5 mt-2 mb-0 font-monospace">PANEL DE CONTROL</h2>
            <span className="text-success small fw-bold text-uppercase font-monospace" style={{ fontSize: '12px' }}>MODO PRODUCCIÓN</span>
          </div>
        </div>

        <nav className="nav flex-column gap-2">
          <button
            onClick={() => onTabChange('dashboard')}
            className={`btn btn-outline-success btn-sm w-100 fw-medium py-2 rounded-3 ${activeTab === 'dashboard' ? 'bg-success text-white shadow-sm' : 'text-light'}`}
            style={{fontSize: "1rem"}}
          >
            Vista General
          </button>
          <button
            onClick={() => onTabChange('donors')}
            className={`btn btn-outline-success btn-sm w-100 fw-medium py-2 rounded-3 ${activeTab === 'donors' ? 'bg-success text-white shadow-sm' : 'text-light'}`}
            style={{fontSize: "1rem"}}
          >
            Donadores
          </button>
          <button
            onClick={() => onTabChange('campaigns')}
            className={`btn btn-outline-success btn-sm w-100 fw-medium py-2 rounded-3 ${activeTab === 'campaigns' ? 'bg-success text-white shadow-sm' : 'text-light'}`}
            style={{fontSize: "1rem"}}
          >
            Campañas
          </button>
          <button
            onClick={() => onTabChange('gallery')}
            className={`btn btn-outline-success btn-sm w-100 fw-medium py-2 rounded-3 ${activeTab === 'gallery' ? 'bg-success text-white shadow-sm' : 'text-light'}`}
            style={{fontSize: "1rem"}}
          >
            Galería
          </button>
          <button
            onClick={() => onTabChange('blog')}
            className={`btn btn-outline-success btn-sm w-100 fw-medium py-2 rounded-3 ${activeTab === 'blog' ? 'bg-success text-white shadow-sm' : 'text-light'}`}
            style={{fontSize: "1rem"}}
          >
            Artículos
          </button>
          <button
            onClick={() => onTabChange('supabase')}
            className={`btn btn-outline-warning mt-3 btn-sm w-100 fw-medium py-2 rounded-3 ${activeTab === 'supabase' ? 'bg-warning text-white shadow-sm' : 'text-light'}`}
            style={{fontSize: "1rem"}}
          >
            Consola SQL / API
          </button>
        </nav>
      </div>

      <div className="border-top border-secondary pt-3 mt-4">
        <div className="d-flex align-items-center gap-2 mb-3">
          <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white font-weight-bold" style={{ width: '36px', height: '36px', fontSize: '14px' }}>
            {userEmail?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="overflow-hidden">
            <p className="text-white small mb-0 text-truncate">{userEmail}</p>
            <p className="text-success small mb-0 fw-bold text-uppercase font-monospace" style={{ fontSize: '9px' }}>Token Verificado</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="btn btn-outline-danger btn-sm w-100 fw-bold py-2 rounded-3"
        >
          Cerrar Sesión Segura
        </button>
      </div>
    </aside>
  )
}

export default React.memo(Sidebar)
