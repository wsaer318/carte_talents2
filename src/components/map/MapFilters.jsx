import { useState } from 'react'
import { X, Search } from 'lucide-react'

export default function MapFilters({ onFilterChange }) {
    const [filters, setFilters] = useState({
        roles: [],
        search: ''
    })
    const [isOpen, setIsOpen] = useState(true)

    const handleRoleToggle = (role) => {
        const newRoles = filters.roles.includes(role)
            ? filters.roles.filter(r => r !== role)
            : [...filters.roles, role]

        const newFilters = { ...filters, roles: newRoles }
        setFilters(newFilters)
        onFilterChange(newFilters)
    }

    const handleSearchChange = (e) => {
        const newFilters = { ...filters, search: e.target.value }
        setFilters(newFilters)
        onFilterChange(newFilters)
    }

    const clearFilters = () => {
        const newFilters = { roles: [], search: '' }
        setFilters(newFilters)
        onFilterChange(newFilters)
    }

    const roleOptions = [
        { value: 'Enseignant', label: 'Enseignant', icon: '👨‍🏫' },
        { value: 'Technicien', label: 'Technicien', icon: '🔧' },
        { value: 'Eco-delegue', label: 'Éco-délégué', icon: '🌱' },
        { value: 'Association', label: 'Association', icon: '🤝' },
        { value: 'Administrateur', label: 'Admin', icon: '👑' }
    ]

    return (
        <div className={`h-full transition-all duration-300 flex ${isOpen ? 'w-80' : 'w-12 bg-transparent'}`}>
            <div className={`active-sidebar flex-1 bg-slate-900/90 backdrop-blur-xl border-r border-white/5 p-4 overflow-y-auto transition-transform ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 absolute w-80 h-full'}`}>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg text-white font-display uppercase tracking-wider">Filtres</h3>
                    <div className="flex gap-2">
                        {(filters.roles.length > 0 || filters.search) && (
                            <button
                                onClick={clearFilters}
                                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 uppercase font-bold"
                            >
                                <X className="h-3 w-3" />
                                Reset
                            </button>
                        )}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="md:hidden text-slate-400 hover:text-white"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Recherche */}
                <div className="mb-6">
                    <label className="block text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                        Recherche
                    </label>
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                        <input
                            type="text"
                            value={filters.search}
                            onChange={handleSearchChange}
                            placeholder="Nom, compétence..."
                            className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                        />
                    </div>
                </div>

                {/* Filtres par rôle */}
                <div className="mb-6">
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">Rôles</h4>
                    <div className="space-y-2">
                        {roleOptions.map(role => (
                            <label key={role.value} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-slate-800 transition-colors">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.roles.includes(role.value)
                                    ? 'bg-cyan-500 border-cyan-500'
                                    : 'border-slate-600 group-hover:border-cyan-500/50'
                                    }`}>
                                    {filters.roles.includes(role.value) && <X className="h-3 w-3 text-white rotate-45" />}
                                    <input
                                        type="checkbox"
                                        checked={filters.roles.includes(role.value)}
                                        onChange={() => handleRoleToggle(role.value)}
                                        className="hidden"
                                    />
                                </div>
                                <span className="text-lg opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">{role.icon}</span>
                                <span className="text-sm text-slate-300 group-hover:text-white font-medium">{role.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Statistiques */}
                <div className="mt-auto pt-6 border-t border-white/5">
                    <p className="text-xs text-slate-500 text-center uppercase tracking-widest">
                        {filters.roles.length > 0
                            ? `${filters.roles.length} filtre(s) actif(s)`
                            : 'Aucun filtre'}
                    </p>
                </div>
            </div>

            {/* Toggle Button (Visible when closed) */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="absolute top-4 left-4 z-50 p-2 bg-slate-900 border border-white/10 rounded-lg text-white hover:bg-slate-800 shadow-lg"
                >
                    <Search className="h-5 w-5" />
                </button>
            )}
        </div>
    )
}
