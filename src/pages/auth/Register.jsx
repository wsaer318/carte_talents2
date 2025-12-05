import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { supabase } from '../../lib/supabase'
import { UserPlus, Plus, Trash2, Check } from 'lucide-react'

// Composant pour une liste dynamique (ex: Passions, Langues)
const DynamicList = ({ title, items, onItemAdd, onItemRemove, placeholder, options = null }) => {
    const [newItem, setNewItem] = useState('')
    const [newLevel, setNewLevel] = useState('Intermédiaire')

    const handleAdd = () => {
        if (!newItem.trim()) return
        onItemAdd({ value: newItem, level: newLevel })
        setNewItem('')
    }

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{title}</label>
            <div className="space-y-2">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md border border-gray-200">
                        <span className="text-sm text-gray-800">
                            {item.value} {item.level && <span className="text-xs text-gray-500">({item.level})</span>}
                        </span>
                        <button type="button" onClick={() => onItemRemove(index)} className="text-red-500 hover:text-red-700">
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
                {options ? (
                    <select
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    >
                        <option value="">{placeholder}</option>
                        {options.map(opt => (
                            <option key={opt.id || opt} value={opt.label || opt}>{opt.label || opt}</option>
                        ))}
                    </select>
                ) : (
                    <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder={placeholder}
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                )}

                {/* Sélecteur de niveau optionnel pour les langues/compétences */}
                {(title.includes('Langue') || title.includes('Compétence')) && (
                    <select
                        value={newLevel}
                        onChange={(e) => setNewLevel(e.target.value)}
                        className="w-32 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    >
                        <option>Débutant</option>
                        <option>Intermédiaire</option>
                        <option>Courant</option>
                        <option>Expert</option>
                        <option>Bilingue</option>
                        <option>Natif</option>
                    </select>
                )}

                <button
                    type="button"
                    onClick={handleAdd}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none"
                >
                    <Plus size={16} />
                </button>
            </div>
        </div>
    )
}

export default function Register() {
    const navigate = useNavigate()
    const { signUp } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [skillOptions, setSkillOptions] = useState([])

    // État du formulaire
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        nom: '',
        prenom: '',
        role: 'Enseignant', // Défaut
    })

    // Listes dynamiques
    const [skills, setSkills] = useState([])
    const [languages, setLanguages] = useState([])
    const [passions, setPassions] = useState([])
    const [projects, setProjects] = useState([])

    // Chargement des compétences de référence
    useEffect(() => {
        const fetchSkills = async () => {
            const { data } = await supabase.from('skill_refs').select('*')
            if (data) setSkillOptions(data)
        }
        fetchSkills()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            // 1. Inscription Auth
            const { data, error: signUpError } = await signUp(
                formData.email,
                formData.password,
                {
                    nom: formData.nom,
                    prenom: formData.prenom,
                    role: formData.role,
                }
            )

            if (signUpError) throw signUpError

            if (data.user) {
                const userId = data.user.id

                // 2. Insertion des données liées (en parallèle pour aller plus vite)
                const promises = []

                // Compétences
                if (skills.length > 0) {
                    const skillsData = skills.map(s => ({ user_id: userId, skill_name: s.value, level: s.level }))
                    promises.push(supabase.from('user_skills').insert(skillsData))
                }

                // Langues
                if (languages.length > 0) {
                    const langData = languages.map(l => ({ user_id: userId, language: l.value, level: l.level }))
                    promises.push(supabase.from('user_languages').insert(langData))
                }

                // Passions
                if (passions.length > 0) {
                    const passionData = passions.map(p => ({ user_id: userId, passion: p.value }))
                    promises.push(supabase.from('user_passions').insert(passionData))
                }

                // Projets
                if (projects.length > 0) {
                    const projectData = projects.map(p => ({
                        user_id: userId,
                        title: p.title,
                        description: p.description,
                        impact_carbone: 0
                    }))
                    promises.push(supabase.from('projects').insert(projectData))
                }

                await Promise.all(promises)
            }

            navigate('/dashboard')
        } catch (error) {
            console.error('Erreur inscription:', error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    // Gestion des projets (un peu plus complexe qu'une simple liste)
    const [newProject, setNewProject] = useState({ title: '', description: '' })
    const addProject = () => {
        if (!newProject.title) return
        setProjects([...projects, newProject])
        setNewProject({ title: '', description: '' })
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                        <UserPlus className="h-8 w-8 text-primary-600" />
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Rejoindre le Village
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Créez votre profil et partagez vos talents
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-400 p-4">
                                <div className="flex">
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SECTION 1: IDENTITÉ (OBLIGATOIRE) */}
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900 border-b pb-2 mb-4">
                                1. Identité
                            </h3>
                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Nom</label>
                                    <input type="text" required value={formData.nom} onChange={e => setFormData({ ...formData, nom: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Prénom</label>
                                    <input type="text" required value={formData.prenom} onChange={e => setFormData({ ...formData, prenom: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
                                    <input type="password" required value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Rôle</label>
                                    <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                                        <option value="Enseignant">Enseignant</option>
                                        <option value="Technicien">Technicien</option>
                                        <option value="Eco-delegue">Éco-délégué</option>
                                        <option value="Association">Association</option>
                                        <option value="Administrateur">Administrateur (Test)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* SECTION 2: COMPÉTENCES & LANGUES */}
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900 border-b pb-2 mb-4">
                                2. Talents & Langues
                            </h3>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <DynamicList
                                    title="Compétences Techniques"
                                    items={skills}
                                    onItemAdd={item => setSkills([...skills, item])}
                                    onItemRemove={idx => setSkills(skills.filter((_, i) => i !== idx))}
                                    placeholder="Choisir une compétence..."
                                    options={skillOptions}
                                />
                                <DynamicList
                                    title="Langues Parlées"
                                    items={languages}
                                    onItemAdd={item => setLanguages([...languages, item])}
                                    onItemRemove={idx => setLanguages(languages.filter((_, i) => i !== idx))}
                                    placeholder="Ex: Anglais, Espagnol..."
                                    options={[{ label: 'Français' }, { label: 'Anglais' }, { label: 'Espagnol' }, { label: 'Allemand' }, { label: 'Italien' }, { label: 'Arabe' }, { label: 'Chinois' }]}
                                />
                            </div>
                        </div>

                        {/* SECTION 3: PASSIONS */}
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900 border-b pb-2 mb-4">
                                3. Passions
                            </h3>
                            <DynamicList
                                title="Vos centres d'intérêt"
                                items={passions}
                                onItemAdd={item => setPassions([...passions, item])}
                                onItemRemove={idx => setPassions(passions.filter((_, i) => i !== idx))}
                                placeholder="Ex: Jardinage, Échecs, Randonnée..."
                            />
                        </div>

                        {/* SECTION 4: PROJETS */}
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900 border-b pb-2 mb-4">
                                4. Projets Réalisés
                            </h3>
                            <div className="space-y-4">
                                {projects.map((p, idx) => (
                                    <div key={idx} className="bg-gray-50 p-3 rounded-md border border-gray-200 flex justify-between items-start">
                                        <div>
                                            <h4 className="font-medium text-sm text-gray-900">{p.title}</h4>
                                            <p className="text-xs text-gray-500">{p.description}</p>
                                        </div>
                                        <button type="button" onClick={() => setProjects(projects.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}

                                <div className="bg-gray-50 p-4 rounded-md border border-gray-200 space-y-3">
                                    <input
                                        type="text"
                                        placeholder="Titre du projet (Ex: Réparation vélo)"
                                        value={newProject.title}
                                        onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                    />
                                    <textarea
                                        placeholder="Description courte..."
                                        value={newProject.description}
                                        onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                                        rows={2}
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={addProject}
                                        className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none"
                                    >
                                        <Plus size={16} className="mr-2" /> Ajouter ce projet
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                            >
                                {loading ? 'Création du compte...' : 'Valider mon inscription'}
                            </button>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Déjà un compte ?{' '}
                                <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                                    Se connecter
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
