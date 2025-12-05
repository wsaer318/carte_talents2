import { useState, useEffect } from 'react'
import { localStorageService } from '../../lib/localStorage'

export default function CollaborationsList({ userId }) {
    const [received, setReceived] = useState([])
    const [sent, setSent] = useState([])

    useEffect(() => {
        loadCollaborations()
    }, [userId])

    const loadCollaborations = () => {
        const collaborations = JSON.parse(localStorage.getItem('demo_collaborations') || '[]')
        const profiles = localStorageService.getAllProfiles()

        // Demandes reçues
        const receivedCollabs = collaborations
            .filter(c => c.target_id === userId)
            .map(c => {
                const requester = profiles.find(p => p.id === c.requester_id)
                return { ...c, requester }
            })

        // Demandes envoyées
        const sentCollabs = collaborations
            .filter(c => c.requester_id === userId)
            .map(c => {
                const target = profiles.find(p => p.id === c.target_id)
                return { ...c, target }
            })

        setReceived(receivedCollabs)
        setSent(sentCollabs)
    }

    const handleAccept = (collabId) => {
        const collaborations = JSON.parse(localStorage.getItem('demo_collaborations') || '[]')
        const updated = collaborations.map(c =>
            c.id === collabId ? { ...c, status: 'accepted' } : c
        )
        localStorage.setItem('demo_collaborations', JSON.stringify(updated))
        loadCollaborations()
    }

    const handleReject = (collabId) => {
        const collaborations = JSON.parse(localStorage.getItem('demo_collaborations') || '[]')
        const updated = collaborations.map(c =>
            c.id === collabId ? { ...c, status: 'rejected' } : c
        )
        localStorage.setItem('demo_collaborations', JSON.stringify(updated))
        loadCollaborations()
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending':
                return <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">En attente</span>
            case 'accepted':
                return <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">✓ Acceptée</span>
            case 'rejected':
                return <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">✗ Refusée</span>
            default:
                return null
        }
    }

    return (
        <div className="space-y-6">
            {/* Demandes reçues */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span>📨</span> Demandes reçues
                </h2>

                {received.length === 0 ? (
                    <p className="text-gray-500 text-sm">Aucune demande de collaboration reçue</p>
                ) : (
                    <div className="space-y-3">
                        {received.map(collab => (
                            <div key={collab.id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            {collab.requester?.prenom} {collab.requester?.nom}
                                        </p>
                                        <p className="text-sm text-gray-600">{collab.requester?.village_role}</p>
                                    </div>
                                    {getStatusBadge(collab.status)}
                                </div>

                                <p className="text-sm text-gray-700 mb-3">{collab.message}</p>

                                {collab.status === 'pending' && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleAccept(collab.id)}
                                            className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
                                        >
                                            ✓ Accepter
                                        </button>
                                        <button
                                            onClick={() => handleReject(collab.id)}
                                            className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
                                        >
                                            ✗ Refuser
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Demandes envoyées */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span>📤</span> Demandes envoyées
                </h2>

                {sent.length === 0 ? (
                    <p className="text-gray-500 text-sm">Aucune demande de collaboration envoyée</p>
                ) : (
                    <div className="space-y-3">
                        {sent.map(collab => (
                            <div key={collab.id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            À : {collab.target?.prenom} {collab.target?.nom}
                                        </p>
                                        <p className="text-sm text-gray-600">{collab.target?.village_role}</p>
                                    </div>
                                    {getStatusBadge(collab.status)}
                                </div>

                                <p className="text-sm text-gray-700">{collab.message}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
