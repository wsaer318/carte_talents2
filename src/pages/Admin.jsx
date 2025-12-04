import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { CheckCircle, XCircle, Eye } from 'lucide-react'

export default function Admin({ profile }) {
    const [pendingUsers, setPendingUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedUser, setSelectedUser] = useState(null)
    const [userProjects, setUserProjects] = useState([])

    // Vérifier que l'utilisateur est admin
    if (!profile || profile.role !== 'Administrateur') {
        return <Navigate to="/" />
    }

    useEffect(() => {
        fetchPendingUsers()
    }, [])

    const fetchPendingUsers = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('badge_verified', false)
                .order('created_at', { ascending: false })

            if (error) throw error
            setPendingUsers(data || [])
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs:', error)
        } finally {
            setLoading(false)
        }
    }

    const viewProjects = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('user_id', userId)

            if (error) throw error
            setUserProjects(data || [])
            setSelectedUser(userId)
        } catch (error) {
            console.error('Erreur lors de la récupération des projets:', error)
        }
    }

    const certifyUser = async (userId) => {
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ badge_verified: true })
                .eq('id', userId)

            if (error) throw error

            // Retirer l'utilisateur de la liste
            setPendingUsers(pendingUsers.filter((u) => u.id !== userId))
            setSelectedUser(null)
            setUserProjects([])

            alert('Utilisateur certifié avec succès !')
        } catch (error) {
            console.error('Erreur lors de la certification:', error)
            alert('Erreur lors de la certification')
        }
    }

    const rejectUser = async (userId) => {
        if (!confirm('Êtes-vous sûr de vouloir rejeter cet utilisateur ?')) {
            return
        }

        try {
            // Dans un vrai système, on pourrait soft-delete ou notifier l'utilisateur
            alert('Fonctionnalité de rejet à implémenter')
        } catch (error) {
            console.error('Erreur:', error)
        }
    }

    return (
        <div className="min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Administration - Validation des profils
                    </h1>
                    <p className="mt-2 text-gray-600">
                        {pendingUsers.length} profil(s) en attente de validation
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                    </div>
                ) : pendingUsers.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <p className="text-gray-600">Aucun profil en attente de validation</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Utilisateur
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Rôle
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date d'inscription
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {pendingUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {user.prenom} {user.nom}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(user.created_at).toLocaleDateString('fr-FR')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                                            <button
                                                onClick={() => viewProjects(user.id)}
                                                className="inline-flex items-center px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                                            >
                                                <Eye className="h-4 w-4 mr-1" />
                                                Voir Projets
                                            </button>
                                            <button
                                                onClick={() => certifyUser(user.id)}
                                                className="inline-flex items-center px-3 py-1 bg-green-600 rounded text-white hover:bg-green-700"
                                            >
                                                <CheckCircle className="h-4 w-4 mr-1" />
                                                Certifier
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Modal des projets */}
                {selectedUser && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-gray-900">
                                        Projets de l'utilisateur
                                    </h3>
                                    <button
                                        onClick={() => {
                                            setSelectedUser(null)
                                            setUserProjects([])
                                        }}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <XCircle className="h-6 w-6" />
                                    </button>
                                </div>

                                {userProjects.length === 0 ? (
                                    <p className="text-gray-500">Aucun projet</p>
                                ) : (
                                    <div className="space-y-4">
                                        {userProjects.map((project) => (
                                            <div
                                                key={project.id}
                                                className="border border-gray-200 rounded-lg p-4"
                                            >
                                                <h4 className="font-semibold text-gray-900">
                                                    {project.title}
                                                </h4>
                                                <p className="text-gray-600 mt-2">{project.description}</p>
                                                <p className="text-sm text-gray-500 mt-2">
                                                    Impact CO₂: {project.impact_carbone} kg
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
