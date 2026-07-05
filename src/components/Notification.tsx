import React from 'react'
import type { NotificationState } from '../types'

interface NotificationProps {
  notification: NotificationState | null
  onClose: () => void
}

function NotificationComponent({ notification, onClose }: NotificationProps) {
  if (!notification) return null

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1100 }}>
      <div
        className={`toast show align-items-center text-white border-0 bg-${
          notification.type === 'success' ? 'success' : notification.type === 'error' ? 'danger' : 'info'
        }`}
        role="alert"
      >
        <div className="d-flex">
          <div className="toast-body fw-bold">{notification.text}</div>
          <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={onClose}></button>
        </div>
      </div>
    </div>
  )
}

export default React.memo(NotificationComponent)
