import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import { User, Download } from 'lucide-react'

export default function Dashboard({ profile }) {
    const { signOut } = useAuth()
    const [projects, setProjects] = useState([])
    const [skills, setSkills] = useState([])
    const [languages, setLanguages] = useState([])
    const [passions, setPassions] = useState([])
    const [loading, setLoading] = useState(true)

    if (!profile) {
        return <Navigate to="/login" />
    }

    useEffect(() => {
        fetchUserData()
    }, [profile])

    const fetchUserData = async () => {
        try {
            const userId = profile.id

            // Récupération parallèle des données
            const [projectsRes, skillsRes, languagesRes, passionsRes] = await Promise.all([
                supabase.from('projects').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
                supabase.from('user_skills').select('*').eq('user_id', userId),
                supabase.from('user_languages').select('*').eq('user_id', userId),
                supabase.from('user_passions').select('*').eq('user_id', userId)
            ])

            if (projectsRes.error) throw projectsRes.error
            if (skillsRes.error) throw skillsRes.error
            if (languagesRes.error) throw languagesRes.error
            if (passionsRes.error) throw passionsRes.error

            setProjects(projectsRes.data || [])
            setSkills(skillsRes.data || [])
            setLanguages(languagesRes.data || [])
            setPassions(passionsRes.data || [])
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleExportData = () => {
        const data = {
            profile,
            projects,
            skills,
            languages,
            passions,
            exportDate: new Date().toISOString(),
        }

        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: 'application/json',
        })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `mes-donnees-nird-${new Date().toISOString().split('T')[0]}.json`
        link.click()
        URL.revokeObjectURL(url)
    }

    const handleSignOut = async () => {
        await signOut()
        window.location.href = '/'
    }

    const totalImpact = projects.reduce((sum, p) => sum + (p.impact_carbone || 0), 0)

    return (
        <div className="min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
                    <p className="mt-2 text-gray-600">
                        Bienvenue, {profile.prenom} {profile.nom}
                    </p>
                </div>

                {/* Status Badge */}
                <div className="mb-8">
                    {profile.badge_verified ? (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <p className="text-green-800 font-semibold">
                                ✓ Profil vérifié - Vous avez accès à toutes les fonctionnalités
                            </p>
                        </div>
                    ) : (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <p className="text-yellow-800 font-semibold">
                                ⏳ Profil en attente de validation
                            </p>
                            <p className="text-sm text-yellow-700 mt-1">
                                Un administrateur validera votre compte prochainement
                            </p>
                        </div>
                    )}
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-sm font-medium text-gray-500">Rôle</h3>
                        <p className="text-2xl font-bold text-gray-900 mt-2">{profile.role}</p>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-sm font-medium text-gray-500">Projets</h3>
                        <p className="text-2xl font-bold text-gray-900 mt-2">{projects.length}</p>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-sm font-medium text-gray-500">Impact CO₂</h3>
                        <p className="text-2xl font-bold text-gray-900 mt-2">
                            {totalImpact} kg
                        </p>
                    </div>
                </div>

                {/* Projects List */}
                <div className="bg-white rounded-lg shadow mb-8">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Mes Projets</h2>
                    </div>
                    <div className="p-6">
                        {loading ? (
                            <p className="text-gray-500">Chargement...</p>
                        ) : projects.length === 0 ? (
                            <p className="text-gray-500">Aucun projet pour le moment</p>
                        ) : (
                            <div className="space-y-4">
                                {projects.map((project) => (
                                    <div
                                        key={project.id}
                                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                                    >
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-600 mt-2">{project.description}</p>
                                        <div className="mt-3 flex items-center justify-between">
                                            <span className="text-sm text-gray-500">
                                                {new Date(project.created_at).toLocaleDateString('fr-FR')}
                                            </span>
                                            <span className="text-sm font-medium text-green-600">
                                                {project.impact_carbone} kg CO₂ économisés
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Talents & Passions */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Compétences & Langues */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Mes Talents</h2>
                        </div>
                        <div className="p-6 space-y-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">Compétences Techniques</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills.length > 0 ? skills.map((s, i) => (
                                        <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                            {s.skill_name} <span className="text-xs opacity-75">({s.level})</span>
                                        </span>
                                    )) : <span className="text-gray-400 text-sm">Aucune compétence renseignée</span>}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">Langues</h3>
                                <div className="flex flex-wrap gap-2">
                                    {languages.length > 0 ? languages.map((l, i) => (
                                        <span key={i} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                            {l.language} <span className="text-xs opacity-75">({l.level})</span>
                                        </span>
                                    )) : <span className="text-gray-400 text-sm">Aucune langue renseignée</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Passions */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Mes Passions</h2>
                        </div>
                        <div className="p-6">
                            <div className="flex flex-wrap gap-2">
                                {passions.length > 0 ? passions.map((p, i) => (
                                    <span key={i} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                                        {p.passion}
                                    </span>
                                )) : <span className="text-gray-400 text-sm">Aucune passion renseignée</span>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={handleExportData}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                    >
                        <Download className="h-5 w-5" />
                        Exporter mes données (RGPD)
                    </button>

                    <button
                        onClick={handleSignOut}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    >
                        Se déconnecter
                    </button>
                </div>
            </div>
        </div>
    )
}
