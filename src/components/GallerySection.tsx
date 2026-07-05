import React from 'react'
import type { GalleryItem } from '../types'

interface GallerySectionProps {
  gallery: GalleryItem[]
  onEdit: (item: GalleryItem) => void
  onDelete: (id: string) => void
}

function GallerySection({ gallery, onEdit, onDelete }: GallerySectionProps) {
  return (
    <div className="row g-4">
      {gallery.map((g) => (
        <div key={g.id} className="col-12 col-sm-6 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 d-flex flex-column justify-content-between">
            <div>
              <div className="position-relative" style={{ height: '220px' }}>
                <img src={g.imageurl} alt={g.title} className="w-100 h-100 object-fit-cover" />
                <span className="position-absolute top-0 start-0 m-3 badge bg-dark text-white">{g.tag}</span>
              </div>
              <div className="p-4">
                <h4 className="fw-bold h5 text-dark mb-2 ong-font">{g.title}</h4>
                <p className="text-secondary small mb-0">{g.description}</p>
              </div>
            </div>
            <div className="p-4 border-top bg-light d-flex justify-content-end gap-2">
              <button onClick={() => onEdit(g)} className="btn btn-sm btn-success">Editar</button>
              <button onClick={() => onDelete(g.id)} className="btn btn-sm btn-danger">Eliminar</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default React.memo(GallerySection)
