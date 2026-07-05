import React, { useState, useEffect, useCallback, useMemo } from 'react'
import type {
  Donor, Campaign, GalleryItem, BlogPost, NotificationState,
  DonorFormData, CampaignFormData, GalleryFormData, BlogFormData,
  ModalType, ModalMode,
} from '../types'

import Notification from '../components/Notification'
import LoginScreen from '../components/LoginScreen'
import Sidebar from '../components/Sidebar'
import Dashboard from '../components/Dashboard'
import DonorsSection from '../components/DonorsSection'
import CampaignsSection from '../components/CampaignsSection'
import GallerySection from '../components/GallerySection'
import BlogSection from '../components/BlogSection'
import SupabaseConsole from '../components/SupabaseConsole'

import DonorModal from '../components/modals/DonorModal'
import CampaignModal from '../components/modals/CampaignModal'
import GalleryModal from '../components/modals/GalleryModal'
import BlogModal from '../components/modals/BlogModal'

import { ConnectionIcon } from "../components/Icons"

// =========================================================================
// CONFIGURACIÓN DE PRODUCCIÓN
// =========================================================================
const ENV_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const ENV_SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

interface ActiveModal {
  type: ModalType
  mode: ModalMode
  item: Donor | Campaign | GalleryItem | BlogPost | null
}

export default function App() {
  // --- Estados de Conexión ---
  const [supabaseUrl, setSupabaseUrl] = useState<string>(() => localStorage.getItem('sb_url') || ENV_SUPABASE_URL)
  const [supabaseKey, setSupabaseKey] = useState<string>(() => localStorage.getItem('sb_key') || ENV_SUPABASE_KEY)
  const [supabaseClient, setSupabaseClient] = useState<any>(null)
  const [isReady, setIsReady] = useState<boolean>(false)

  // --- Estados de Autenticación Real ---
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [userSession, setUserSession] = useState<any>(null)
  const [authError, setAuthError] = useState<string>('')
  const [authLoading, setAuthLoading] = useState<boolean>(false)

  // --- Estados de Datos ---
  const [activeTab, setActiveTab] = useState<string>('dashboard')
  const [donors, setDonors] = useState<Donor[]>([])
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [dataLoading, setDataLoading] = useState<boolean>(false)

  // --- Estado del modal activo (null = ningún modal montado) ---
  const [activeModal, setActiveModal] = useState<ActiveModal | null>(null)

  const [notification, setNotification] = useState<NotificationState | null>(null)

  const showNotify = useCallback((text: string, type = 'success') => {
    setNotification({ text, type })
    setTimeout(() => setNotification(null), 4000)
  }, [])

  const closeNotification = useCallback(() => setNotification(null), [])

  // --- 1. CARGA DINÁMICA DE SDK DE SUPABASE ---
  useEffect(() => {
    const loadSupabaseSDK = async () => {
      const globalWindow = window as any
      if (!globalWindow.supabase) {
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'
        script.async = true
        script.onload = () => initSupabase()
        document.body.appendChild(script)
      } else {
        initSupabase()
      }
    }
    loadSupabaseSDK()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabaseUrl, supabaseKey])

  // --- 2. INICIALIZACIÓN Y CONTROL DE SESIÓN REAL ---
  const initSupabase = () => {
    const globalWindow = window as any
    if (globalWindow.supabase && supabaseUrl && supabaseKey) {
      try {
        const client = globalWindow.supabase.createClient(supabaseUrl, supabaseKey)
        setSupabaseClient(client)

        client.auth.getSession().then(({ data: { session } }: any) => {
          if (session) {
            setUserSession(session)
            setIsLoggedIn(true)
            syncData(client)
          }
          setIsReady(true)
        })

        client.auth.onAuthStateChange((_event: any, session: any) => {
          setUserSession(session)
          setIsLoggedIn(!!session)
          if (session) {
            syncData(client)
          } else {
            setDonors([])
            setCampaigns([])
            setGallery([])
            setBlogPosts([])
          }
        })
      } catch (error) {
        showNotify('Error de conexión con Supabase. Revisa tus credenciales.', 'error')
        setIsReady(true)
      }
    } else {
      setIsReady(true)
    }
  }

  // --- 3. SINCRONIZACIÓN DE DATOS CON RLS ACTIVO ---
  const syncData = async (clientInstance?: any) => {
    const client = clientInstance || supabaseClient
    if (!client) return

    setDataLoading(true)
    try {
      const [resDonors, resCampaigns, resGallery, resBlog] = await Promise.all([
        client.from('donors').select('*').order('date', { ascending: false }),
        client.from('campaigns').select('*'),
        client.from('gallery').select('*').order('date', { ascending: false }),
        client.from('blog').select('*').order('date', { ascending: false }),
      ])

      if (resDonors.error) throw resDonors.error
      if (resCampaigns.error) throw resCampaigns.error
      if (resGallery.error) throw resGallery.error
      if (resBlog.error) throw resBlog.error

      setDonors(resDonors.data || [])
      setCampaigns(resCampaigns.data || [])
      setGallery(resGallery.data || [])
      setBlogPosts(resBlog.data || [])
    } catch (err) {
      showNotify('Error al leer datos. Asegúrate de haber ejecutado el esquema SQL.', 'error')
    } finally {
      setDataLoading(false)
    }
  }

  // --- 4. INICIO DE SESIÓN REAL (Supabase Auth) ---
  const handleLogin = useCallback(async (email: string, password: string) => {
    if (!supabaseClient) {
      setAuthError('Supabase no está inicializado. Configura tus credenciales.')
      return
    }

    setAuthError('')
    setAuthLoading(true)

    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password })

      if (error) {
        setAuthError(error.message === 'Invalid login credentials' ? 'Correo o contraseña incorrectos en Supabase.' : error.message)
      } else {
        setIsLoggedIn(true)
        setUserSession(data.session)
        showNotify('Sesión iniciada correctamente', 'success')
        syncData(supabaseClient)
      }
    } catch (err) {
      setAuthError('Ocurrió un error inesperado al intentar conectar.')
    } finally {
      setAuthLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabaseClient])

  // --- 5. CIERRE DE SESIÓN REAL ---
  const handleLogout = useCallback(async () => {
    if (supabaseClient) {
      await supabaseClient.auth.signOut()
      setIsLoggedIn(false)
      setUserSession(null)
      showNotify('Sesión cerrada de forma segura', 'info')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabaseClient])

  // --- Guardar credenciales de forma manual ---
  const saveSupabaseConfig = useCallback((url: string, key: string) => {
    localStorage.setItem('sb_url', url)
    localStorage.setItem('sb_key', key)
    showNotify('Credenciales actualizadas. Recargando...', 'success')
    setTimeout(() => window.location.reload(), 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // --- 6. OPERACIONES DE ESCRITURA (CRUD) ---
  // Los modales solo se montan cuando activeModal no es null: abrir/cerrar/editar
  // ya no obliga a React a reevaluar tablas ni formularios que no cambiaron.
  const openAddModal = useCallback((type: ModalType) => {
    setActiveModal({ type, mode: 'add', item: null })
  }, [])

  const openEditModal = useCallback((type: ModalType, item: any) => {
    setActiveModal({ type, mode: 'edit', item })
  }, [])

  const closeModal = useCallback(() => setActiveModal(null), [])

  const handleDelete = useCallback(async (type: string, id: string) => {
    if (!window.confirm('¿Confirmas que deseas eliminar este registro de la base de datos cloud?')) return

    try {
      const table = type === 'donor' ? 'donors' : type === 'campaign' ? 'campaigns' : type === 'gallery' ? 'gallery' : 'blog'
      const { error } = await supabaseClient.from(table).delete().eq('id', id)

      if (error) throw error

      showNotify('Registro eliminado de la base de datos cloud', 'success')
      syncData(supabaseClient)
    } catch (err) {
      showNotify('Error RLS: No tienes permisos de escritura o expiró tu sesión.', 'error')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabaseClient])

  // Callbacks de borrado específicos por sección, memoizados para no romper React.memo en las secciones
  const handleDeleteDonor = useCallback((id: string) => handleDelete('donor', id), [handleDelete])
  const handleDeleteCampaign = useCallback((id: string) => handleDelete('campaign', id), [handleDelete])
  const handleDeleteGallery = useCallback((id: string) => handleDelete('gallery', id), [handleDelete])
  const handleDeleteBlog = useCallback((id: string) => handleDelete('blog', id), [handleDelete])

  const openEditDonor = useCallback((item: Donor) => openEditModal('donor', item), [openEditModal])
  const openEditCampaign = useCallback((item: Campaign) => openEditModal('campaign', item), [openEditModal])
  const openEditGallery = useCallback((item: GalleryItem) => openEditModal('gallery', item), [openEditModal])
  const openEditBlog = useCallback((item: BlogPost) => openEditModal('blog', item), [openEditModal])

  const handleAddDonor = useCallback(() => openAddModal('donor'), [openAddModal])
  const handleAddCampaign = useCallback(() => openAddModal('campaign'), [openAddModal])
  const handleAddGallery = useCallback(() => openAddModal('gallery'), [openAddModal])
  const handleAddBlog = useCallback(() => openAddModal('blog'), [openAddModal])

  // El modal llama a esta función solo al confirmar; hasta entonces todo su estado es local
  const handleModalSubmit = useCallback(async (
    type: ModalType,
    mode: ModalMode,
    selectedId: string | null,
    formData: DonorFormData | CampaignFormData | GalleryFormData | BlogFormData
  ) => {
    const newId = selectedId || Math.random().toString(36).substr(2, 9)
    const today = new Date().toISOString().split('T')[0]

    try {
      let table = ''
      let payload: any = {}

      if (type === 'donor') {
        const f = formData as DonorFormData
        table = 'donors'
        payload = { id: newId, name: f.name, email: f.email, amount: parseFloat(f.amount as any) || 0, type: f.type, date: today, status: f.status }
      } else if (type === 'campaign') {
        const f = formData as CampaignFormData
        table = 'campaigns'
        payload = { id: newId, title: f.title, target: parseFloat(f.target as any) || 0, raised: parseFloat(f.raised as any) || 0, status: f.status, description: f.description }
      } else if (type === 'gallery') {
        const f = formData as GalleryFormData
        table = 'gallery'
        payload = {
          id: newId,
          title: f.title,
          imageurl: f.imageurl || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
          tag: f.tag,
          date: today,
          description: f.description,
        }
      } else if (type === 'blog') {
        const f = formData as BlogFormData
        table = 'blog'
        payload = { id: newId, title: f.title, type: f.type, content: f.content, mediaurl: f.mediaurl, thumbnailurl: f.thumbnailurl, date: today, author: f.author }
      }

      const { error } = mode === 'add'
        ? await supabaseClient.from(table).insert([payload])
        : await supabaseClient.from(table).update(payload).eq('id', selectedId)

      if (error) throw error

      showNotify(mode === 'add' ? 'Registro creado con éxito' : 'Registro modificado con éxito', 'success')
      setActiveModal(null)
      syncData(supabaseClient)
    } catch (err: any) {
      console.error(err)
      showNotify(err.message, 'error')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabaseClient])

  const totalRaised = useMemo(() => donors.reduce((acc, d) => acc + parseFloat(d.amount as any || 0), 0), [donors])

  if (!isReady) {
    return (
      <div className="min-vh-screen d-flex align-items-center justify-content-center bg-dark text-white">
        <div className="text-center">
          <div className="spinner-border text-success mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="small text-uppercase tracking-wider text-muted font-monospace">Verificando Infraestructura de Seguridad...</p>
        </div>
      </div>
    )
  }

  return (
<div
  className="text-dark d-flex flex-column"
  style={{ minHeight: "100vh", marginLeft: "280px", backgroundColor: "#B9CCC1"}}
>
      <Notification notification={notification} onClose={closeNotification} />

      {!isLoggedIn ? (
        <LoginScreen
          supabaseUrl={supabaseUrl}
          supabaseKey={supabaseKey}
          onSaveConfig={saveSupabaseConfig}
          onLogin={handleLogin}
          authError={authError}
          authLoading={authLoading}
        />
      ) : (
        <div
  className="flex-grow-1 d-flex flex-column flex-md-row"
  style={{ minHeight: "100vh", alignItems: "flex-start" }}
>
          <Sidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            userEmail={userSession?.user?.email}
            onLogout={handleLogout}
          />

          <main className="flex-grow-1 p-4 p-md-5" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
            <header className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-5">
              <div>
                <h1 className="fw-black h2 text-dark mb-1 ong-font">
                  {activeTab === 'dashboard' ? 'Información de la ONG' :
                   activeTab === 'donors' ? 'Registro de Donadores' :
                   activeTab === 'campaigns' ? 'Campañas de Recaudación' :
                   activeTab === 'gallery' ? 'Galería Fotográfica' :
                   activeTab === 'blog' ? 'Gestor de Artículos' : 'Ajustes Técnicos'}
                </h1>
                <p className="text-success small fw-semibold mb-0 d-flex align-items-center gap-2">
                  <ConnectionIcon/>
                  Conexión activa • {userSession?.user?.email} • ADMINISTRADOR
                </p>
              </div>

              {['donors', 'campaigns', 'gallery', 'blog'].includes(activeTab) && (
                <button
                  onClick={
                    activeTab === 'donors' ? handleAddDonor :
                    activeTab === 'campaigns' ? handleAddCampaign :
                    activeTab === 'gallery' ? handleAddGallery :
                    handleAddBlog
                  }
                  className="btn btn-success px-4 py-2.5 rounded-3 fw-bold shadow-sm"
                >
                  Agregar Registro
                </button>
              )}
            </header>

            {dataLoading && (
              <div className="card border-0 p-5 text-center text-secondary rounded-4">
                <div className="spinner-border text-success mx-auto mb-3" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                Sincronizando datos con la nube de Supabase...
              </div>
            )}

            {/* Solo la sección activa se monta/actualiza; el resto ni siquiera existe en el árbol */}
            {!dataLoading && (
              <>
                {activeTab === 'dashboard' && (
                  <Dashboard donors={donors} campaigns={campaigns} gallery={gallery} blogPosts={blogPosts} />
                )}
                {activeTab === 'donors' && (
                  <DonorsSection donors={donors} onEdit={openEditDonor} onDelete={handleDeleteDonor} />
                )}
                {activeTab === 'campaigns' && (
                  <CampaignsSection campaigns={campaigns} onEdit={openEditCampaign} onDelete={handleDeleteCampaign} />
                )}
                {activeTab === 'gallery' && (
                  <GallerySection gallery={gallery} onEdit={openEditGallery} onDelete={handleDeleteGallery} />
                )}
                {activeTab === 'blog' && (
                  <BlogSection blogPosts={blogPosts} onEdit={openEditBlog} onDelete={handleDeleteBlog} />
                )}
                {activeTab === 'supabase' && (
                  <SupabaseConsole supabaseUrl={supabaseUrl} supabaseKey={supabaseKey} />
                )}
              </>
            )}
          </main>
        </div>
      )}

      {/* --- MODAL DE EDICIÓN/CREACIÓN ---
          Se monta únicamente cuando hay un activeModal: no vive permanentemente en el árbol,
          y su estado de formulario es local a cada modal (ver components/modals/*). */}
      {activeModal?.type === 'donor' && (
        <DonorModal
          mode={activeModal.mode}
          initialData={activeModal.item as Donor | null}
          onClose={closeModal}
          onSubmit={(data) => handleModalSubmit('donor', activeModal.mode, activeModal.item?.id ?? null, data)}
        />
      )}
      {activeModal?.type === 'campaign' && (
        <CampaignModal
          mode={activeModal.mode}
          initialData={activeModal.item as Campaign | null}
          onClose={closeModal}
          onSubmit={(data) => handleModalSubmit('campaign', activeModal.mode, activeModal.item?.id ?? null, data)}
        />
      )}
      {activeModal?.type === 'gallery' && (
        <GalleryModal
          mode={activeModal.mode}
          initialData={activeModal.item as GalleryItem | null}
          onClose={closeModal}
          onSubmit={(data) => handleModalSubmit('gallery', activeModal.mode, activeModal.item?.id ?? null, data)}
        />
      )}
      {activeModal?.type === 'blog' && (
        <BlogModal
          mode={activeModal.mode}
          initialData={activeModal.item as BlogPost | null}
          defaultAuthor={userSession?.user?.email || 'Administrador'}
          onClose={closeModal}
          onSubmit={(data) => handleModalSubmit('blog', activeModal.mode, activeModal.item?.id ?? null, data)}
        />
      )}
    </div>
  )
}
