import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

export default function MapPage({ profile }) {
    useEffect(() => {
        // Import Leaflet CSS dynamically
        import('leaflet/dist/leaflet.css')
    }, [])

    // Bloquer l'accès si le badge n'est pas vérifié
    if (!profile?.badge_verified) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="max-w-md text-center space-y-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">
                            🔒 Accès restreint
                        </h2>
                        <p className="text-gray-700">
                            Votre profil est en attente de validation. Un administrateur doit
                            vérifier votre compte avant que vous puissiez accéder à la carte.
                        </p>
                        <p className="text-sm text-gray-600 mt-4">
                            Vous recevrez une notification dès que votre profil sera approuvé.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="h-screen flex">
            <div className="flex-1 relative">
                {/* La carte Leaflet sera implémentée ici */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Carte Interactive
                        </h2>
                        <p className="text-gray-600">
                            L'intégration Leaflet est en cours de développement...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
