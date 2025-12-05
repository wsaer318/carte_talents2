import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { supabase } from '../../lib/supabase'
import { UserPlus, Plus, Trash2, Check, Star, Globe, Heart, Briefcase } from 'lucide-react'

// Composant pour une liste dynamique (ex: Passions, Langues)
const DynamicList = ({ title, icon: Icon, items, onItemAdd, onItemRemove, placeholder, options = null }) => {
    const [newItem, setNewItem] = useState('')
    const [newLevel, setNewLevel] = useState('Intermédiaire')

    const handleAdd = () => {
        if (!newItem.trim()) return
        onItemAdd({ value: newItem, level: newLevel })
        setNewItem('')
    }

    return (
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <label className="flex items-center text-sm font-bold text-gray-700 mb-4">
                {Icon && <Icon size={18} className="mr-2 text-primary-600" />}
                {title}
            </label>

            {/* Liste des éléments ajoutés */}
            <div className="space-y-2 mb-4">
                {items.length === 0 && (
                    <p className="text-xs text-gray-400 italic text-center py-2">Aucun élément ajouté</p>
                )}
                {items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-white p-2 px-3 rounded-lg border border-gray-200 shadow-sm animate-fade-in">
                        <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-800">{item.value}</span>
                            {item.level && (
                                <span className="ml-2 px-2 py-0.5 bg-primary-50 text-primary-700 text-xs font-medium rounded-full border border-primary-100">
                                    {item.level}
                                </span>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => onItemRemove(index)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Contrôles d'ajout */}
            <div className="flex gap-2">
                {options ? (
                    <div className="relative flex-1">
                        <select
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5 pl-3 pr-8"
                        >
                            <option value="">{placeholder}</option>
                            {options.map((opt, idx) => {
                                const val = typeof opt === 'string' ? opt : (opt.label || opt.skill_name || opt.value);
                                const key = opt.id || val || idx;
                                return <option key={key} value={val}>{val}</option>
                            })}
                        </select>
                    </div>
                ) : (
                    <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder={placeholder}
                        className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5"
                    />
                )}

                {/* Sélecteur de niveau optionnel */}
                {(title.includes('Langue') || title.includes('Compétence')) && (
                    <select
                        value={newLevel}
                        onChange={(e) => setNewLevel(e.target.value)}
                        className="w-32 rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2.5"
                    >
                        {['Débutant', 'Intermédiaire', 'Courant', 'Expert', 'Bilingue', 'Natif'].map(lvl => (
                            <option key={lvl} value={lvl}>{lvl}</option>
                        ))}
                    </select>
                )}

                <button
                    type="button"
                    onClick={handleAdd}
                    disabled={!newItem}
                    className="inline-flex items-center justify-center px-3 py-2 border border-transparent rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                    <Plus size={20} />
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
        role: 'Enseignant',
    })

    // Listes dynamiques
    const [skills, setSkills] = useState([])
    const [languages, setLanguages] = useState([])
    const [passions, setPassions] = useState([])
    const [projects, setProjects] = useState([])

    // Chargement des compétences
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
            const { data, error: signUpError } = await signUp(
                formData.email.trim(),
                formData.password,
                {
                    nom: formData.nom,
                    prenom: formData.prenom,
                    role: formData.role,
                }
            )

            console.log('SignUp Response:', { data, signUpError })

            if (signUpError) throw signUpError

            // Cas 1: Session créée immédiatement (email confirmation désactivée)
            if (data.user && data.session) {
                console.log('Session créée, appel RPC...')

                // Établir explicitement la session dans le client Supabase
                await supabase.auth.setSession({
                    access_token: data.session.access_token,
                    refresh_token: data.session.refresh_token
                })

                // Préparation des données pour l'RPC
                const rpcData = {
                    p_nom: formData.nom,
                    p_prenom: formData.prenom,
                    p_role: formData.role,
                    p_skills: skills.map(s => ({ skill_name: s.value, level: s.level })),
                    p_languages: languages.map(l => ({ language: l.value, level: l.level })),
                    p_passions: passions.map(p => ({ passion: p.value })),
                    p_projects: projects.map(p => ({
                        title: p.title,
                        description: p.description,
                        impact_carbone: 0
                    }))
                }

                console.log('Appel RPC avec:', rpcData)

                // Appel RPC pour tout mettre à jour d'un coup
                const { error: rpcError } = await supabase.rpc('update_full_profile', rpcData)

                if (rpcError) {
                    console.error('Erreur RPC:', rpcError)
                    throw rpcError
                }

                console.log('RPC Success, redirection vers /dashboard')
                navigate('/dashboard')
            }
            // Cas 2: Pas de session (email confirmation requise)
            else if (data.user && !data.session) {
                console.log('Confirmation email requise. User créé mais pas de session.')
                setError('Inscription réussie ! Veuillez vérifier votre email pour confirmer votre compte.')
                // On reste sur la page d'inscription pour afficher le message
            }
        } catch (error) {
            console.error('Erreur inscription:', error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const [newProject, setNewProject] = useState({ title: '', description: '' })
    const addProject = () => {
        if (!newProject.title) return
        setProjects([...projects, newProject])
        setNewProject({ title: '', description: '' })
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
            <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
                <div className="flex justify-center">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                        <UserPlus className="h-8 w-8 text-white" />
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
                    Rejoindre le Village
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Créez votre profil et partagez vos talents avec la communauté
                </p>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
                <div className="bg-white py-10 px-6 shadow-xl sm:rounded-2xl sm:px-12 border border-gray-100">
                    <form className="space-y-10" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md animate-pulse">
                                <div className="flex">
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700 font-medium">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SECTION 1: IDENTITÉ */}
                        <div className="space-y-6">
                            <div className="flex items-center space-x-2 border-b border-gray-100 pb-2">
                                <div className="bg-primary-100 p-1.5 rounded-lg">
                                    <UserPlus size={20} className="text-primary-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Identité</h3>
                            </div>

                            <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Nom</label>
                                    <input type="text" required value={formData.nom} onChange={e => setFormData({ ...formData, nom: e.target.value })} className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm py-2.5 transition-shadow" placeholder="Votre nom" />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Prénom</label>
                                    <input type="text" required value={formData.prenom} onChange={e => setFormData({ ...formData, prenom: e.target.value })} className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm py-2.5 transition-shadow" placeholder="Votre prénom" />
                                </div>
                                <div className="sm:col-span-2 space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Email professionnel</label>
                                    <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm py-2.5 transition-shadow" placeholder="exemple@ecole.fr" />
                                </div>
                                <div className="sm:col-span-2 space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
                                    <input type="password" required value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm py-2.5 transition-shadow" placeholder="••••••••" />
                                </div>
                                <div className="sm:col-span-2 space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Rôle au sein du village</label>
                                    <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="block w-full bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm py-2.5">
                                        <option value="Enseignant">Enseignant</option>
                                        <option value="Technicien">Technicien</option>
                                        <option value="Eco-delegue">Éco-délégué</option>
                                        <option value="Association">Association</option>
                                        <option value="Administrateur">Administrateur (Test)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* SECTION 2: TALENTS & LANGUES */}
                        <div className="space-y-6">
                            <div className="flex items-center space-x-2 border-b border-gray-100 pb-2">
                                <div className="bg-blue-100 p-1.5 rounded-lg">
                                    <Star size={20} className="text-blue-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Vos Atouts</h3>
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <DynamicList
                                    title="Compétences Techniques"
                                    icon={Star}
                                    items={skills}
                                    onItemAdd={item => setSkills([...skills, item])}
                                    onItemRemove={idx => setSkills(skills.filter((_, i) => i !== idx))}
                                    placeholder="Choisir..."
                                    options={skillOptions}
                                />
                                <DynamicList
                                    title="Langues Parlées"
                                    icon={Globe}
                                    items={languages}
                                    onItemAdd={item => setLanguages([...languages, item])}
                                    onItemRemove={idx => setLanguages(languages.filter((_, i) => i !== idx))}
                                    placeholder="Langue..."
                                    options={[{ label: 'Français' }, { label: 'Anglais' }, { label: 'Espagnol' }, { label: 'Allemand' }, { label: 'Italien' }, { label: 'Arabe' }, { label: 'Chinois' }]}
                                />
                            </div>
                        </div>

                        {/* SECTION 3: PASSIONS */}
                        <div className="space-y-6">
                            <div className="flex items-center space-x-2 border-b border-gray-100 pb-2">
                                <div className="bg-pink-100 p-1.5 rounded-lg">
                                    <Heart size={20} className="text-pink-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Centres d'intérêt</h3>
                            </div>
                            <DynamicList
                                title="Vos passions"
                                icon={Heart}
                                items={passions}
                                onItemAdd={item => setPassions([...passions, item])}
                                onItemRemove={idx => setPassions(passions.filter((_, i) => i !== idx))}
                                placeholder="Ex: Jardinage, Échecs, Randonnée..."
                            />
                        </div>

                        {/* SECTION 4: PROJETS */}
                        <div className="space-y-6">
                            <div className="flex items-center space-x-2 border-b border-gray-100 pb-2">
                                <div className="bg-green-100 p-1.5 rounded-lg">
                                    <Briefcase size={20} className="text-green-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Projets Réalisés</h3>
                            </div>

                            <div className="space-y-4">
                                {projects.map((p, idx) => (
                                    <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex justify-between items-start hover:shadow-md transition-shadow">
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{p.title}</h4>
                                            <p className="text-sm text-gray-500 mt-1">{p.description}</p>
                                        </div>
                                        <button type="button" onClick={() => setProjects(projects.filter((_, i) => i !== idx))} className="text-gray-400 hover:text-red-500 p-1">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}

                                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 border-dashed space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Titre du projet (Ex: Réparation vélo)"
                                        value={newProject.title}
                                        onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                                        className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm py-2.5"
                                    />
                                    <textarea
                                        placeholder="Description courte..."
                                        value={newProject.description}
                                        onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                                        rows={2}
                                        className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm py-2.5"
                                    />
                                    <button
                                        type="button"
                                        onClick={addProject}
                                        className="w-full flex justify-center items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none transition-colors"
                                    >
                                        <Plus size={18} className="mr-2" /> Ajouter ce projet
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 transform hover:-translate-y-0.5 transition-all duration-200"
                            >
                                {loading ? 'Création du compte...' : 'Valider mon inscription'}
                            </button>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Déjà un compte ?{' '}
                                <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-500 underline decoration-2 decoration-primary-200 hover:decoration-primary-500 transition-all">
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
