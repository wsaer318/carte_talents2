import { useState, useEffect } from 'react'
import { localStorageService } from '../lib/localStorage'
import { User, Check, Briefcase, Star, Globe } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export default function Dashboard() {
    const { user } = useAuth()
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) {
            try {
                const profiles = localStorageService.getAllProfiles()
                const foundProfile = profiles.find(p => p.id === user.id)
                setProfile(foundProfile || null)
            } catch (error) {
                console.error("Error loading profile:", error)
                setProfile(null)
            }
        }
        setLoading(false)
    }, [user])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    // Redirection si pas connecté (géré par le parent normalement mais sécurité)
    if (!profile) {
        return (
            <div className="min-h-screen flex items-center justify-center text-slate-400">
                Profil non trouvé.
            </div>
        )
    }

    // Calculate impact safely
    const totalImpact = profile.projects?.reduce((acc, p) => acc + (p.impact_carbone || 0), 0) || 0

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Dashboard */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2 font-display">
                            Tableau de Bord
                        </h1>
                        <p className="text-slate-400">
                            Gérez votre profil et suivez votre impact.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-2xl border border-white/5">
                        <div className="text-right">
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Impact Total</p>
                            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                                {totalImpact} kg CO₂
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-green-500/20">
                            <span className="text-xl">🌿</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Colonne Gauche : Infos Profil */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="text-center relative z-10">
                                <div className="w-24 h-24 mx-auto bg-slate-800 rounded-full flex items-center justify-center text-4xl mb-4 border-2 border-white/10 shadow-xl">
                                    <User className="h-10 w-10 text-slate-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">{profile.prenom} {profile.nom}</h2>
                                <p className="text-cyan-400 font-medium">{profile.village_role}</p>

                                <div className="mt-6 flex justify-center">
                                    {profile.badge_verified ? (
                                        <span className="px-4 py-1.5 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-sm font-bold flex items-center gap-2">
                                            <Check className="h-4 w-4" /> Vérifié
                                        </span>
                                    ) : (
                                        <span className="px-4 py-1.5 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-full text-sm font-bold">
                                            En attente
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Collaborations (Placeholder pour l'instant) */}
                        <div className="glass-panel p-6 rounded-2xl">
                            <h3 className="text-lg font-bold text-white mb-4">Collaborations</h3>
                            <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-white/5 border-dashed">
                                <p className="text-slate-500 text-sm">Aucune collaboration récente.</p>
                            </div>
                        </div>
                    </div>

                    {/* Colonne Droite : Contenu (Projets, Skills) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Projets */}
                        <section className="glass-panel p-6 rounded-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Briefcase className="text-cyan-400" /> Mes Projets
                                </h3>
                                <button className="text-sm bg-cyan-500/10 text-cyan-400 px-3 py-1.5 rounded-lg hover:bg-cyan-500/20 transition cursor-not-allowed opacity-50">
                                    + Nouveau
                                </button>
                            </div>

                            <div className="grid gap-4">
                                {profile.projects?.map((project, idx) => (
                                    <div key={idx} className="bg-slate-800/40 border border-white/5 p-5 rounded-xl flex justify-between items-center group hover:bg-slate-800/60 transition">
                                        <div>
                                            <h4 className="font-bold text-white text-lg">{project.title}</h4>
                                            <p className="text-slate-400 text-sm">{project.description}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-green-400 font-mono font-bold">
                                                {project.impact_carbone} kg
                                            </span>
                                            <span className="text-xs text-slate-600 uppercase">CO₂ évité</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Compétences & Langues */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <section className="glass-panel p-6 rounded-2xl">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <Star className="text-blue-400" /> Compétences
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {profile.skills?.map((s, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-lg text-sm">
                                            {s.skill_name}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            <section className="glass-panel p-6 rounded-2xl">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <Globe className="text-purple-400" /> Langues
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {profile.languages?.map((l, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-lg text-sm">
                                            {l.language}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
