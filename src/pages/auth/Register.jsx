import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { supabase } from '../../lib/supabase'
import { localStorageService } from '../../lib/localStorage'
import { UserPlus, Plus, Trash2, Star, Globe, Heart, Briefcase, ArrowRight } from 'lucide-react'

const DynamicList = ({ title, icon: Icon, items, onItemAdd, onItemRemove, placeholder, options = null }) => {
    const [newItem, setNewItem] = useState('')
    const [newLevel, setNewLevel] = useState('Intermédiaire')

    const handleAdd = () => {
        if (!newItem.trim()) return
        onItemAdd({ value: newItem, level: newLevel })
        setNewItem('')
    }

    return (
        <div className="bg-slate-900/50 p-5 rounded-xl border border-white/5 hover:border-cyan-500/20 transition-colors duration-300">
            <label className="flex items-center text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">
                {Icon && <Icon size={16} className="mr-2 text-cyan-400" />}
                {title}
            </label>

            <div className="space-y-2 mb-4">
                {items.length === 0 && (
                    <p className="text-xs text-slate-500 italic text-center py-2">Aucun élément ajouté</p>
                )}
                {items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-800/50 p-2 px-3 rounded-lg border border-white/5 animate-fade-in group hover:border-cyan-500/30 transition-colors">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-200">{item.value}</span>
                            {item.level && (
                                <span className="px-2 py-0.5 bg-cyan-950 text-cyan-400 text-[10px] font-bold uppercase rounded-full border border-cyan-900/50">
                                    {item.level}
                                </span>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => onItemRemove(index)}
                            className="text-slate-500 hover:text-red-400 transition-colors p-1"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex gap-2">
                {options ? (
                    <div className="relative flex-1">
                        <select
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            className="input-dark w-full text-sm py-2.5"
                        >
                            <option value="">{placeholder}</option>
                            {options.map((opt, idx) => {
                                const val = typeof opt === 'string' ? opt : (opt.label || opt.skill_name || opt.value);
                                const key = opt.id || val || idx;
                                return <option key={key} value={val} className="text-black">{val}</option>
                            })}
                        </select>
                    </div>
                ) : (
                    <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder={placeholder}
                        className="input-dark flex-1 text-sm py-2.5"
                    />
                )}

                {(title.includes('Langue') || title.includes('Compétence')) && (
                    <select
                        value={newLevel}
                        onChange={(e) => setNewLevel(e.target.value)}
                        className="input-dark w-32 text-sm py-2.5"
                    >
                        {['Débutant', 'Intermédiaire', 'Courant', 'Expert', 'Bilingue', 'Natif'].map(lvl => (
                            <option key={lvl} value={lvl} className="text-black">{lvl}</option>
                        ))}
                    </select>
                )}

                <button
                    type="button"
                    onClick={handleAdd}
                    disabled={!newItem}
                    className="flex justify-center items-center w-10 h-10 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white transition-colors"
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

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        nom: '',
        prenom: '',
        village_role: 'Enseignant',
    })

    const [skills, setSkills] = useState([])
    const [languages, setLanguages] = useState([])
    const [passions, setPassions] = useState([])
    const [projects, setProjects] = useState([])

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

            if (signUpError) throw signUpError

            if (data.user) {
                const profileData = {
                    id: data.user.id,
                    email: formData.email.trim(),
                    nom: formData.nom,
                    prenom: formData.prenom,
                    system_role: 'user',
                    village_role: formData.village_role,
                    badge_verified: false,
                    skills: skills.map(s => ({ skill_name: s.value, level: s.level })),
                    languages: languages.map(l => ({ language: l.value, level: l.level })),
                    passions: passions.map(p => p.value),
                    projects: projects.map(p => ({
                        title: p.title,
                        description: p.description,
                        impact_carbone: 0
                    })),
                    preferences: {
                        mode_sobriete: false,
                        notifications: true
                    }
                }
                localStorageService.saveProfile(profileData)
                navigate('/dashboard')
            }
        } catch (error) {
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
        <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-900/20 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md mb-8 text-center">
                <div className="inline-flex h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-600 items-center justify-center shadow-lg shadow-cyan-500/20 mb-6">
                    <UserPlus className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white font-display">
                    Rejoindre le Village
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                    Créez votre profil et partagez vos talents avec le réseau
                </p>
            </div>

            <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-3xl">
                <div className="glass-panel py-10 px-6 sm:rounded-2xl sm:px-12">
                    <form className="space-y-10" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-200 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {/* SECTION 1: IDENTITÉ */}
                        <div className="space-y-6">
                            <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
                                <div className="bg-cyan-950 p-2 rounded-lg border border-cyan-500/20">
                                    <UserPlus size={20} className="text-cyan-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Identité</h3>
                            </div>

                            <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
                                <div className="space-y-1">
                                    <label className="label-dark">Nom</label>
                                    <input type="text" required value={formData.nom} onChange={e => setFormData({ ...formData, nom: e.target.value })} className="input-dark w-full" placeholder="Votre nom" />
                                </div>
                                <div className="space-y-1">
                                    <label className="label-dark">Prénom</label>
                                    <input type="text" required value={formData.prenom} onChange={e => setFormData({ ...formData, prenom: e.target.value })} className="input-dark w-full" placeholder="Votre prénom" />
                                </div>
                                <div className="sm:col-span-2 space-y-1">
                                    <label className="label-dark">Email professionnel</label>
                                    <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="input-dark w-full" placeholder="exemple@ecole.fr" />
                                </div>
                                <div className="sm:col-span-2 space-y-1">
                                    <label className="label-dark">Mot de passe</label>
                                    <input type="password" required value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className="input-dark w-full" placeholder="••••••••" />
                                </div>
                                <div className="sm:col-span-2 space-y-1">
                                    <label className="label-dark">Rôle au sein du village</label>
                                    <select value={formData.village_role} onChange={e => setFormData({ ...formData, village_role: e.target.value })} className="input-dark w-full">
                                        <option value="Enseignant" className="text-black">Enseignant</option>
                                        <option value="Technicien" className="text-black">Technicien</option>
                                        <option value="Eco-delegue" className="text-black">Éco-délégué</option>
                                        <option value="Association" className="text-black">Association</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* SECTION 2: TALENTS & LANGUES */}
                        <div className="space-y-6">
                            <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
                                <div className="bg-blue-950 p-2 rounded-lg border border-blue-500/20">
                                    <Star size={20} className="text-blue-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Vos Atouts</h3>
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
                            <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
                                <div className="bg-pink-950 p-2 rounded-lg border border-pink-500/20">
                                    <Heart size={20} className="text-pink-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Centres d'intérêt</h3>
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
                            <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
                                <div className="bg-green-950 p-2 rounded-lg border border-green-500/20">
                                    <Briefcase size={20} className="text-green-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Projets Réalisés</h3>
                            </div>

                            <div className="space-y-4">
                                {projects.map((p, idx) => (
                                    <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-white/5 flex justify-between items-start hover:border-cyan-500/30 transition-colors">
                                        <div>
                                            <h4 className="font-semibold text-white">{p.title}</h4>
                                            <p className="text-sm text-slate-400 mt-1">{p.description}</p>
                                        </div>
                                        <button type="button" onClick={() => setProjects(projects.filter((_, i) => i !== idx))} className="text-slate-500 hover:text-red-400 p-1">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}

                                <div className="bg-slate-900/50 p-5 rounded-xl border border-white/5 border-dashed space-y-4 hover:border-white/20 transition-colors">
                                    <input
                                        type="text"
                                        placeholder="Titre du projet (Ex: Réparation vélo)"
                                        value={newProject.title}
                                        onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                                        className="input-dark w-full"
                                    />
                                    <textarea
                                        placeholder="Description courte..."
                                        value={newProject.description}
                                        onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                                        rows={2}
                                        className="input-dark w-full"
                                    />
                                    <button
                                        type="button"
                                        onClick={addProject}
                                        className="w-full flex justify-center items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg text-cyan-400 bg-cyan-950 border-cyan-900 hover:bg-cyan-900 transition-colors"
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
                                className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-lg text-base font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 transform hover:-translate-y-0.5 transition-all duration-200"
                            >
                                {loading ? 'Création du compte...' : 'Valider mon inscription'}
                                {!loading && <ArrowRight className="h-5 w-5" />}
                            </button>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-slate-400">
                                Déjà un compte ?{' '}
                                <Link to="/login" className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
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
