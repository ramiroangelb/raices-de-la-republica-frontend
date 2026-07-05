import React from 'react'
import type { BlogPost } from '../types'
import { getYoutubeEmbedId } from '../utils'

interface BlogSectionProps {
  blogPosts: BlogPost[]
  onEdit: (post: BlogPost) => void
  onDelete: (id: string) => void
}

function BlogSection({ blogPosts, onEdit, onDelete }: BlogSectionProps) {
  return (
    <div className="row g-4">
      {
        [...blogPosts].reverse().map((post) => {
        const embedId = getYoutubeEmbedId(post.mediaurl)
        console.log([...blogPosts])
        console.log([...blogPosts].reverse())
        return (
          <div key={post.id} className="col-12 col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 d-flex flex-column justify-content-between">
              <div>
                {post.type === 'video' && embedId && (
                  <div className="ratio ratio-16x9">
                    <iframe
                      src={`https://www.youtube.com/embed/${embedId}`}
                      title={post.title}
                      allowFullScreen
                    ></iframe>
                  </div> //TODO: Que los blogs se carguen primero los más nuevos. + Que tengan fecha en la base de datos.
                )}
                {post.type === 'image' && post.thumbnailurl && (
                  <div style={{ height: '260px' }}>
                    <img src={post.thumbnailurl} alt={post.title} className="w-100 h-100 object-fit-cover" />
                  </div>
                )}
                <div className="p-4">
                  <span className="small text-uppercase text-secondary fw-bold font-monospace mb-2 d-block">{post.type} • Por {post.author}</span>
                  <h3 className="fw-bold h5 text-dark mb-3 ong-font">{post.title}</h3>
                  <p className="text-secondary small mb-0" style={{ whiteSpace: 'pre-line' }}>{post.content}</p>
                </div>
              </div>
              <div className="p-4 bg-light border-top d-flex justify-content-end gap-2">
                <button onClick={() => onEdit(post)} className="btn btn-sm btn-success">Editar</button>
                <button onClick={() => onDelete(post.id)} className="btn btn-sm btn-danger">Eliminar</button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default React.memo(BlogSection)
