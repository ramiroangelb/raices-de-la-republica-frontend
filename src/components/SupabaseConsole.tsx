import React from 'react'

interface SupabaseConsoleProps {
  supabaseUrl: string
  supabaseKey: string
}

const SQL_SCHEMA = `-- Crear tablas normales
CREATE TABLE IF NOT EXISTS donors ( id TEXT PRIMARY KEY, name TEXT, email TEXT, amount NUMERIC, type TEXT, date DATE, status TEXT )
CREATE TABLE IF NOT EXISTS campaigns ( id TEXT PRIMARY KEY, title TEXT, target NUMERIC, raised NUMERIC, status TEXT, description TEXT )
CREATE TABLE IF NOT EXISTS gallery ( id TEXT PRIMARY KEY, title TEXT, imageurl TEXT, tag TEXT, date DATE, description TEXT )
CREATE TABLE IF NOT EXISTS blog ( id TEXT PRIMARY KEY, title TEXT, type TEXT, content TEXT, mediaUrl TEXT, thumbnailUrl TEXT, date DATE, author TEXT )

-- 1. HABILITAR SEGURIDAD RLS (Filtro por fila)
ALTER TABLE donors ENABLE ROW LEVEL SECURITY
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY
ALTER TABLE blog ENABLE ROW LEVEL SECURITY

-- 2. POLÍTICAS DE LECTURA (Cualquier visitante de GitHub Pages puede ver el contenido)
CREATE POLICY "Lectura publica de donors" ON donors FOR SELECT USING (true)
CREATE POLICY "Lectura publica de campaigns" ON campaigns FOR SELECT USING (true)
CREATE POLICY "Lectura publica de gallery" ON gallery FOR SELECT USING (true)
CREATE POLICY "Lectura publica de blog" ON blog FOR SELECT USING (true)

-- 3. POLÍTICAS DE ESCRITURA (Solo el administrador autenticado puede modificar datos)
CREATE POLICY "Escritura protegida de donors" ON donors FOR ALL TO authenticated USING (true) WITH CHECK (true)
CREATE POLICY "Escritura protegida de campaigns" ON campaigns FOR ALL TO authenticated USING (true) WITH CHECK (true)
CREATE POLICY "Escritura protegida de gallery" ON gallery FOR ALL TO authenticated USING (true) WITH CHECK (true)
CREATE POLICY "Escritura protegida de blog" ON blog FOR ALL TO authenticated USING (true) WITH CHECK (true)`

function SupabaseConsole({ supabaseUrl, supabaseKey }: SupabaseConsoleProps) {
  return (
    <div className="d-flex flex-column gap-4">
      <div className="card border-0 p-4 shadow-sm rounded-4">
        <h3 className="fw-bold h5 mb-2">Conexión de API</h3>
        <p className="text-secondary small mb-4">Esta es la clave pública de tu proyecto. El backend utiliza políticas de seguridad a nivel de fila (RLS) para filtrar las escrituras de manera segura.</p>
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <label className="form-label small fw-bold text-secondary">SUPABASE URL</label>
            <input type="text" readOnly value={supabaseUrl} className="form-control bg-light text-secondary small" />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label small fw-bold text-secondary">SUPABASE KEY</label>
            <input type="password" readOnly value={supabaseKey} className="form-control bg-light text-secondary small" />
          </div>
        </div>
      </div>

      <div className="card border-0 p-4 shadow-sm rounded-4 bg-dark text-light font-monospace">
        <h4 className="fw-bold text-white mb-2">Esquema SQL Obligatorio para Producción</h4>
        <p className="text-secondary small mb-4">Ejecuta esto en tu Consola SQL de Supabase para habilitar RLS.</p>
        <pre className="bg-black text-success p-3 rounded-3 small overflow-x-auto select-all" style={{ maxHeight: '350px' }}>
          {SQL_SCHEMA}
        </pre>
      </div>
    </div>
  )
}

export default React.memo(SupabaseConsole)
