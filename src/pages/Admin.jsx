import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { CheckCircle, XCircle, Eye, ShieldAlert } from 'lucide-react'
import { localStorageService } from '../lib/localStorage'

export default function Admin({ profile }) {
    const [pendingUsers, setPendingUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedUser, setSelectedUser] = useState(null)
    const [userProjects, setUserProjects] = useState([])

    if (!profile || profile.system_role !== 'admin') {
        return <Navigate to="/" />
    }

    useEffect(() => {
        fetchPendingUsers()
    }, [])

    const fetchPendingUsers = async () => {
        try {
            const profiles = localStorageService.getAllProfiles()
            const pending = profiles.filter(p =>
                p.badge_verified === false && p.system_role !== 'admin'
            )
            setPendingUsers(pending)
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

            // Simuler la mise à jour locale également pour la cohérence démo
            const profiles = localStorageService.getAllProfiles()
            const updated = profiles.map(p => p.id === userId ? { ...p, badge_verified: true } : p)
            localStorage.setItem('demo_profiles', JSON.stringify(updated))

            setPendingUsers(pendingUsers.filter((u) => u.id !== userId))
            setSelectedUser(null)
            setUserProjects([])

            alert('Utilisateur certifié avec succès !')
        } catch (error) {
            console.error('Erreur lors de la certification:', error)
            alert('Erreur lors de la certification')
        }
    }

    return (
        <div className="min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white font-display mb-2 flex items-center gap-3">
                            <ShieldAlert className="text-red-500" />
                            Administration du Village
                        </h1>
                        <p className="text-slate-400">
                            Validation des profils et gestion de la sécurité
                        </p>
                    </div>
                    <div className="bg-slate-900 border border-white/10 px-4 py-2 rounded-lg">
                        <span className="text-2xl font-bold text-white">{pendingUsers.length}</span>
                        <span className="text-slate-500 text-sm ml-2">en attente</span>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : pendingUsers.length === 0 ? (
                    <div className="glass-panel p-12 text-center rounded-2xl">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4 opacity-50" />
                        <h2 className="text-xl font-bold text-white">Tout est en ordre</h2>
                        <p className="text-slate-500 mt-2">Aucun profil en attente de validation pour le moment.</p>
                    </div>
                ) : (
                    <div className="glass-panel rounded-2xl overflow-hidden border border-white/5">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-white/10">
                                <thead className="bg-slate-900/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                                            Utilisateur
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                                            Rôle
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {pendingUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-bold text-white">
                                                    {user.prenom} {user.nom}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-slate-400">{user.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                    {user.system_role === 'admin' ? 'Admin' : 'Utilisateur'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                                {new Date(user.created_at).toLocaleDateString('fr-FR')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2 flex items-center">
                                                <button
                                                    onClick={() => viewProjects(user.id)}
                                                    className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition"
                                                    title="Voir Projets"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => certifyUser(user.id)}
                                                    className="flex items-center gap-2 px-3 py-1.5 bg-green-600/20 text-green-400 hover:bg-green-600/30 border border-green-600/30 rounded-lg transition font-bold text-xs uppercase tracking-wide"
                                                >
                                                    <CheckCircle className="h-4 w-4" /> Certifier
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Modal des projets - Dark Mode */}
                {selectedUser && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-slate-900 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <h3 className="text-xl font-bold text-white font-display">
                                        Projets soumis
                                    </h3>
                                    <button
                                        onClick={() => {
                                            setSelectedUser(null)
                                            setUserProjects([])
                                        }}
                                        className="text-slate-500 hover:text-white hover:bg-white/10 p-1 rounded-full transition"
                                    >
                                        <XCircle className="h-6 w-6" />
                                    </button>
                                </div>

                                {userProjects.length === 0 ? (
                                    <div className="text-center py-8">
                                        <p className="text-slate-500 italic">Aucun projet soumis pour le moment.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {userProjects.map((project) => (
                                            <div
                                                key={project.id}
                                                className="border border-white/5 bg-slate-800/50 rounded-xl p-4 hover:border-cyan-500/30 transition-colors"
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-bold text-white text-lg">
                                                        {project.title}
                                                    </h4>
                                                    <span className="text-sm font-mono text-green-400 bg-green-900/30 px-2 py-0.5 rounded border border-green-500/20">
                                                        {project.impact_carbone} kg CO₂
                                                    </span>
                                                </div>
                                                <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>
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
