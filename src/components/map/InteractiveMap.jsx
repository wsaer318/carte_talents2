import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { localStorageService } from '../../lib/localStorage'
import ProfileModal from './ProfileModal'
import CollaborationForm from '../collaboration/CollaborationForm'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../contexts/ToastContext'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix pour les icônes Leaflet par défaut avec Vite
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
})

// Coordonnées de démo pour les utilisateurs (en attendant de vraies coordonnées géographiques)
const DEMO_COORDINATES = {
    'user-001': [48.8566, 2.3522], // Paris - Jean Martin
    'user-002': [45.7640, 4.8357], // Lyon - Sophie Bernard  
    'user-003': [43.2965, 5.3698], // Marseille - Alex Dubois
    'admin-001': [47.2184, -1.5536], // Nantes - Marie Dupont
}

const getRoleIcon = (villageRole) => {
    switch (villageRole) {
        case 'Administrateur':
            return '👑'
        case 'Enseignant':
            return '👨‍🏫'
        case 'Technicien':
            return '🔧'
        case 'Eco-delegue':
            return '🌱'
        case 'Association':
            return '🤝'
        default:
            return '👤'
    }
}

export default function InteractiveMap({ filters }) {
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [collaborationTarget, setCollaborationTarget] = useState(null)
    const { user } = useAuth()
    const toast = useToast()

    useEffect(() => {
        const profiles = localStorageService.getAllProfiles()
        // Filtrer uniquement les utilisateurs validés
        const validated = profiles.filter(p => p.badge_verified === true)
        setUsers(validated)
        setFilteredUsers(validated)
    }, [])

    // Appliquer les filtres
    useEffect(() => {
        if (!filters) {
            setFilteredUsers(users)
            return
        }

        let filtered = [...users]

        // Filtre par rôle
        if (filters.roles && filters.roles.length > 0) {
            filtered = filtered.filter(u => filters.roles.includes(u.village_role))
        }

        // Filtre par recherche
        if (filters.search) {
            const searchLower = filters.search.toLowerCase()
            filtered = filtered.filter(u => {
                const nameMatch = (u.nom + ' ' + u.prenom).toLowerCase().includes(searchLower)
                const emailMatch = u.email?.toLowerCase().includes(searchLower)
                const skillMatch = u.skills?.some(s => s.skill_name.toLowerCase().includes(searchLower))
                return nameMatch || emailMatch || skillMatch
            })
        }

        setFilteredUsers(filtered)
    }, [filters, users])

    const handleCollaborateClick = (targetUser) => {
        setSelectedUser(null)
        setCollaborationTarget(targetUser)
    }

    const handleCollaborationSubmit = async (message) => {
        if (!user) return

        // Créer la collaboration dans localStorage
        const collaborations = JSON.parse(localStorage.getItem('demo_collaborations') || '[]')

        const newCollaboration = {
            id: `collab-${Date.now()}`,
            requester_id: user.id,
            target_id: collaborationTarget.id,
            message,
            status: 'pending',
            created_at: new Date().toISOString()
        }

        collaborations.push(newCollaboration)
        localStorage.setItem('demo_collaborations', JSON.stringify(collaborations))

        // Toast de succès au lieu d'alert
        toast.success(`Demande envoyée à ${collaborationTarget.prenom} ${collaborationTarget.nom} !`)
        setCollaborationTarget(null)
    }

    return (
        <>
            <MapContainer
                center={[46.603354, 1.888334]} // Centre de la France
                zoom={6}
                style={{ height: '100%', width: '100%' }}
                className="z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {filteredUsers.map(targetUser => {
                    const position = DEMO_COORDINATES[targetUser.id] || [46.603354, 1.888334]
                    return (
                        <Marker
                            key={targetUser.id}
                            position={position}
                            eventHandlers={{
                                click: () => setSelectedUser(targetUser)
                            }}
                        >
                            <Popup>
                                <div className="text-center">
                                    <span className="text-2xl">{getRoleIcon(targetUser.village_role)}</span>
                                    <p className="font-bold">{targetUser.prenom} {targetUser.nom}</p>
                                    <p className="text-sm text-gray-600">{targetUser.village_role}</p>
                                    <button
                                        onClick={() => setSelectedUser(targetUser)}
                                        className="mt-2 text-xs text-primary-600 hover:underline"
                                    >
                                        Voir le profil complet
                                    </button>
                                </div>
                            </Popup>
                        </Marker>
                    )
                })}
            </MapContainer>

            {/* Modale Profil */}
            {selectedUser && (
                <ProfileModal
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                    onCollaborate={handleCollaborateClick}
                />
            )}

            {/* Formulaire de Collaboration */}
            {collaborationTarget && (
                <CollaborationForm
                    targetUser={collaborationTarget}
                    onSubmit={handleCollaborationSubmit}
                    onCancel={() => setCollaborationTarget(null)}
                />
            )}
        </>
    )
}
