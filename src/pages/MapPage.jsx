import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import InteractiveMap from '../components/map/InteractiveMap'
import MapFilters from '../components/map/MapFilters'

export default function MapPage({ profile }) {
    const { user, loading } = useAuth()
    const [filters, setFilters] = useState({ roles: [], search: '' })

    useEffect(() => {
        // Import Leaflet CSS dynamically
        import('leaflet/dist/leaflet.css')
    }, [])

    // Afficher un loader pendant la vérification de l'authentification
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        )
    }

    // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    if (!user) {
        return <Navigate to="/login" replace />
    }

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            {/* Header de la carte */}
            <div className="bg-white shadow-sm border-b px-6 py-4 z-10">
                <h1 className="text-2xl font-bold text-gray-900">Carte des Talents NIRD</h1>
                <p className="text-sm text-gray-600 mt-1">
                    Découvrez les professionnels du numérique responsable près de chez vous
                </p>
            </div>

            {/* Corps : Filtres + Carte */}
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar Filtres */}
                <MapFilters onFilterChange={setFilters} />

                {/* Carte */}
                <div className="flex-1 relative">
                    <InteractiveMap filters={filters} />
                </div>
            </div>
        </div>
    )
}
