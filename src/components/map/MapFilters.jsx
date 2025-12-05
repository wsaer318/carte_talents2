import { useState } from 'react'
import { X } from 'lucide-react'

export default function MapFilters({ onFilterChange }) {
    const [filters, setFilters] = useState({
        roles: [],
        search: ''
    })

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
        <div className="bg-white shadow-lg p-4 w-64 h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Filtres</h3>
                {(filters.roles.length > 0 || filters.search) && (
                    <button
                        onClick={clearFilters}
                        className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                    >
                        <X className="h-3 w-3" />
                        Effacer
                    </button>
                )}
            </div>

            {/* Recherche */}
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Recherche
                </label>
                <input
                    type="text"
                    value={filters.search}
                    onChange={handleSearchChange}
                    placeholder="Nom, compétence..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
            </div>

            {/* Filtres par rôle */}
            <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Rôle</h4>
                <div className="space-y-2">
                    {roleOptions.map(role => (
                        <label key={role.value} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                            <input
                                type="checkbox"
                                checked={filters.roles.includes(role.value)}
                                onChange={() => handleRoleToggle(role.value)}
                                className="rounded text-primary-600 focus:ring-primary-500"
                            />
                            <span className="text-lg">{role.icon}</span>
                            <span className="text-sm text-gray-700">{role.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Statistiques */}
            <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                    {filters.roles.length > 0 && (
                        <span>{filters.roles.length} filtre(s) actif(s)</span>
                    )}
                </p>
            </div>
        </div>
    )
}
