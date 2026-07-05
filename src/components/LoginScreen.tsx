import React, { useState } from 'react'

interface LoginScreenProps {
  supabaseUrl: string
  supabaseKey: string
  onSaveConfig: (url: string, key: string) => void
  onLogin: (email: string, password: string) => Promise<void>
  authError: string
  authLoading: boolean
}

function LoginScreen({ supabaseUrl, supabaseKey, onSaveConfig, onLogin, authError, authLoading }: LoginScreenProps) {
  // Estado local: escribir en estos campos ya no re-renderiza nada fuera de este componente
  const [urlInput, setUrlInput] = useState(supabaseUrl)
  const [keyInput, setKeyInput] = useState(supabaseKey)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const handleConfigSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSaveConfig(urlInput, keyInput)
  }

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(loginEmail, loginPassword)
  }

  return (
    <div
      className="flex-grow-1 d-flex align-items-center justify-content-center p-3"
      style={{ background: 'radial-gradient(circle at 10% 20%, rgb(242, 252, 243) 0%, rgb(222, 244, 226) 90.1%)' }}
    >
      <div className="card shadow-lg border-0 p-4 w-100" style={{ maxWidth: '440px', borderRadius: '1.25rem' }}>
        <div className="text-center mb-4">
          <div className="bg-success-subtle text-success p-3 rounded-4 d-inline-block mb-3">
            <svg className="bi" width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="fw-bold h4 ong-font">PANEL DE CONTROL</h2>
          <p className="text-muted small">Acceso restringido a personal de la ONG.</p>
        </div>

        {(!supabaseUrl || !supabaseKey) ? (
          <div className="alert alert-warning small border-0 shadow-sm p-3 mb-3">
            <p className="fw-bold mb-1">⚠️ Falta configuración de Base de Datos</p>
            <p className="mb-3">Para conectar tu base de datos cloud de Supabase en producción, ingresa las credenciales a continuación:</p>
            <form onSubmit={handleConfigSubmit} className="d-flex flex-column gap-2">
              <input
                type="text"
                required
                placeholder="Supabase URL"
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                className="form-control form-control-sm"
              />
              <input
                type="password"
                required
                placeholder="Supabase Anon Key"
                value={keyInput}
                onChange={e => setKeyInput(e.target.value)}
                className="form-control form-control-sm"
              />
              <button type="submit" className="btn btn-warning btn-sm fw-bold">Guardar Parámetros</button>
            </form>
          </div>
        ) : (
          <form onSubmit={handleLoginSubmit} className="d-flex flex-column gap-3">
            {authError && (
              <div className="alert alert-danger border-0 small py-2 px-3 fw-semibold">
                {authError}
              </div>
            )}
            <div>
              <label className="form-label text-secondary small fw-bold text-uppercase">Correo del Administrador</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="form-control p-3 rounded-3"
                placeholder="ejemplo@ong.org"
              />
            </div>
            <div>
              <label className="form-label text-secondary small fw-bold text-uppercase">Contraseña</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="form-control p-3 rounded-3"
                placeholder="Contraseña"
              />
            </div>
            <button
              type="submit"
              disabled={authLoading}
              className="btn btn-success p-3 fw-bold rounded-3 shadow-sm mt-2 w-100"
            >
              {authLoading ? 'Verificando...' : 'Ingresar'}
            </button>
          </form>
        )}
        <div className="text-center mt-4 pt-3 border-top text-muted small" style={{ fontSize: '11px' }}>
          Sólo administradores autorizados.
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
