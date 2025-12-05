import { useState } from 'react'
import { X, Send } from 'lucide-react'

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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-fade-in" onClick={onCancel}>
            <div
                className="bg-slate-900 border border-white/10 rounded-2xl max-w-lg w-full p-8 shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-bold text-white font-display">
                        Collaboration
                    </h3>
                    <button
                        onClick={onCancel}
                        className="text-slate-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="mb-6 p-4 bg-slate-800/50 rounded-xl border border-white/5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-xl">
                        👤
                    </div>
                    <div>
                        <p className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Destinataire</p>
                        <p className="font-bold text-white text-lg">
                            {targetUser.prenom} {targetUser.nom}
                        </p>
                        <p className="text-sm text-slate-400">{targetUser.village_role}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">
                            Message
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={`Bonjour ${targetUser.prenom}, je suis intéressé par vos compétences en...`}
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 h-40 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
                            required
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 px-4 py-3 bg-transparent border border-white/10 text-slate-300 rounded-xl hover:bg-white/5 hover:text-white transition font-medium"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-[2] bg-cyan-600 text-white px-4 py-3 rounded-xl hover:bg-cyan-500 transition font-bold shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loading ? 'Envoi...' : (
                                <>
                                    <span>Envoyer</span>
                                    <Send className="h-4 w-4" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
