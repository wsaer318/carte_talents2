import { useState } from 'react'
import { X } from 'lucide-react'

export default function CollaborationForm({ targetUser, onSubmit, onCancel }) {
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            await onSubmit(message)
            setMessage('')
        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4" onClick={onCancel}>
            <div
                className="bg-white rounded-lg max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                        Proposer une collaboration
                    </h3>
                    <button
                        onClick={onCancel}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">À :</p>
                    <p className="font-semibold text-gray-900">
                        {targetUser.prenom} {targetUser.nom}
                    </p>
                    <p className="text-sm text-gray-500">{targetUser.village_role}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Décrivez votre projet de collaboration
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Exemple: Je souhaiterais organiser un atelier sur l'éco-conception web pour mes élèves. Seriez-vous disponible pour intervenir ?"
                            className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            required
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
                        >
                            {loading ? 'Envoi...' : '🤝 Envoyer la demande'}
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                        >
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
