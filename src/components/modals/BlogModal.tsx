import React, { useState, useRef } from 'react'
import type { BlogPost, BlogFormData, ModalMode } from '../../types'

interface BlogModalProps {
  mode: ModalMode
  initialData: BlogPost | null
  defaultAuthor: string
  onClose: () => void
  onSubmit: (data: BlogFormData) => void
}

function BlogModal({ mode, initialData, defaultAuthor, onClose, onSubmit }: BlogModalProps) {
  const [form, setForm] = useState<BlogFormData>(
    initialData
      ? {
          title: initialData.title,
          type: initialData.type,
          content: initialData.content,
          mediaurl: initialData.mediaurl || '',
          thumbnailurl: initialData.thumbnailurl || '',
          author: initialData.author,
        }
      : { title: '', type: 'text', content: '', mediaurl: '', thumbnailurl: '', author: defaultAuthor }
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
            <h3 className="modal-title h5 fw-bold mb-0 ong-font">Formulario de Registro de Artículo</h3>
            <button onClick={onClose} type="button" className="btn-close btn-close-white" aria-label="Close"></button>
          </div>

          <form onSubmit={handleSubmit} className="modal-body p-4 d-flex flex-column gap-3 overflow-y-auto" style={{ maxHeight: '75vh' }}>
            <div>
              <label className="form-label small fw-bold text-secondary mb-1">Título del Artículo</label>
              <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="form-control rounded-3" />
            </div>
            <div>
              <label className="form-label small fw-bold text-secondary mb-1">Formato</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as any })} className="form-select rounded-3">
                <option value="text">Solo Texto</option>
                <option value="image">Con Imagen de Portada</option>
                <option value="video">Vídeo de YouTube</option>
              </select>
            </div>
            {form.type === 'image' && (
              <div>
                <label className="form-label small fw-bold text-secondary mb-1">URL de Imagen de Portada</label>
                <input type="url" required value={form.thumbnailurl} onChange={(e) => setForm({ ...form, thumbnailurl: e.target.value })} className="form-control rounded-3" />
              </div>
            )}
            {form.type === 'video' && (
              <div>
                <label className="form-label small fw-bold text-secondary mb-1">URL de Vídeo de YouTube</label>
                <input type="url" required value={form.mediaurl} onChange={(e) => setForm({ ...form, mediaurl: e.target.value })} className="form-control rounded-3" />
              </div>
            )}
            <div>
              <label className="form-label small fw-bold text-secondary mb-1">Autor de la Entrada</label>
              <input type="text" required value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="form-control rounded-3" />
            </div>
            <div>
              <label className="form-label small fw-bold text-secondary mb-1">Contenido Escrito</label>
              <textarea required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={5} className="form-control rounded-3" />
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

export default BlogModal
