import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import InteractiveMap from '../components/map/InteractiveMap'
import MapFilters from '../components/map/MapFilters'
import { MapPin } from 'lucide-react'

export default function MapPage({ profile }) {
    const { user, loading } = useAuth()
    const [filters, setFilters] = useState({ roles: [], search: '' })

    useEffect(() => {
        import('leaflet/dist/leaflet.css')
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return (
        <div className="h-[calc(100vh-80px)] flex flex-col overflow-hidden relative">
            {/* Header de la carte */}
            <div className="bg-slate-900/80 backdrop-blur-md border-b border-white/5 px-6 py-4 z-20 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <MapPin className="text-cyan-400" />
                        Carte des Talents
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">
                        Découvrez les professionnels du numérique responsable
                    </p>
                </div>
            </div>

            {/* Corps : Filtres + Carte */}
            <div className="flex-1 flex overflow-hidden relative">
                {/* Sidebar Filtres */}
                <div className="absolute left-0 top-0 bottom-0 z-[1000] pointer-events-none">
                    <div className="pointer-events-auto h-full">
                        <MapFilters onFilterChange={setFilters} />
                    </div>
                </div>

                {/* Carte */}
                <div className="flex-1 relative z-0">
                    <InteractiveMap filters={filters} />
                </div>
            </div>
        </div>
    )
}
