import { createContext, useContext, useState } from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

const ToastContext = createContext()

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([])

    const addToast = (message, type = 'info') => {
        const id = Date.now()
        setToasts(prev => [...prev, { id, message, type }])

        // Auto-remove after 3 seconds
        setTimeout(() => {
            removeToast(id)
        }, 3000)
    }

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }

    const success = (message) => addToast(message, 'success')
    const error = (message) => addToast(message, 'error')
    const info = (message) => addToast(message, 'info')

    return (
        <ToastContext.Provider value={{ success, error, info }}>
            {children}

            {/* Toast Container */}
            <div className="fixed top-4 right-4 z-[10000] space-y-2">
                {toasts.map(toast => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    )
}

function Toast({ message, type, onClose }) {
    const styles = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        info: 'bg-blue-500 text-white'
    }

    const icons = {
        success: <CheckCircle className="h-5 w-5" />,
        error: <AlertCircle className="h-5 w-5" />,
        info: <Info className="h-5 w-5" />
    }

    return (
        <div className={`${styles[type]} px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-md animate-fade-in`}>
            {icons[type]}
            <p className="flex-1 text-sm font-medium">{message}</p>
            <button onClick={onClose} className="hover:opacity-80">
                <X className="h-4 w-4" />
            </button>
        </div>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within ToastProvider')
    }
    return context
}
