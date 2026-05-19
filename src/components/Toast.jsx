import { useEffect } from 'react'
import { useToastStore } from '../store/toastStore'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle
}

function Toast({ toast }) {
  const removeToast = useToastStore(state => state.removeToast)
  const Icon = iconMap[toast.type] || Info

  return (
    <div className={`toast toast-${toast.type}`}>
      <Icon size={20} className="toast-icon" />
      <span className="toast-message">{toast.message}</span>
      <button 
        className="toast-close" 
        onClick={() => removeToast(toast.id)}
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  )
}

export default function ToastContainer() {
  const toasts = useToastStore(state => state.toasts)

  if (toasts.length === 0) return null

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  )
}