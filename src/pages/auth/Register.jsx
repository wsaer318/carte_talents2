import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { supabase } from '../../lib/supabase'
import { UserPlus } from 'lucide-react'

export default function Register() {
    const navigate = useNavigate()
    const { signUp } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        nom: '',
        prenom: '',
        role: 'Enseignant',
        projectTitle: '',
        projectDescription: '',
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            // 1. Inscription Auth (sans userData pour éviter que useAuth ne crée le profil)
            const { data, error: signUpError } = await signUp(
                formData.email,
                formData.password
            )

            if (signUpError) throw signUpError

            if (data.user) {
                // 2. Création du profil
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert([
                        {
                            id: data.user.id,
                            email: formData.email,
                            nom: formData.nom,
                            prenom: formData.prenom,
                            role: formData.role,
                            badge_verified: false,
                        }
                    ])

                if (profileError) {
                    console.error('Erreur création profil:', profileError)
                    throw new Error("Erreur lors de la création du profil: " + profileError.message)
                }

                // 3. Création du projet
                const { error: projectError } = await supabase
                    .from('projects')
                    .insert([
                        {
                            user_id: data.user.id,
                            title: formData.projectTitle,
                            description: formData.projectDescription,
                            impact_carbone: 0,
                        },
                    ])

                if (projectError) {
                    console.error('Erreur création projet:', projectError)
                    // Pas bloquant
                }
            }

            navigate('/dashboard')
        } catch (error) {
            console.error('Erreur inscription:', error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <UserPlus className="mx-auto h-12 w-12 text-primary-600" />
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Rejoindre le Village NIRD
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Devenez membre de la communauté du numérique responsable
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Mot de passe
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>

                        {/* Nom */}
                        <div>
                            <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                                Nom
                            </label>
                            <input
                                id="nom"
                                name="nom"
                                type="text"
                                required
                                value={formData.nom}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>

                        {/* Prénom */}
                        <div>
                            <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
                                Prénom
                            </label>
                            <input
                                id="prenom"
                                name="prenom"
                                type="text"
                                required
                                value={formData.prenom}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>

                        {/* Rôle */}
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                Rôle
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            >
                                <option value="Enseignant">Enseignant</option>
                                <option value="Technicien">Technicien</option>
                                <option value="Eco-delegue">Éco-délégué</option>
                                <option value="Association">Association</option>
                            </select>
                        </div>

                        {/* Premier Projet */}
                        <div className="border-t pt-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                Votre Premier Projet
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Décrivez une action réalisée pour prouver votre engagement
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="projectTitle" className="block text-sm font-medium text-gray-700">
                                        Titre du projet
                                    </label>
                                    <input
                                        id="projectTitle"
                                        name="projectTitle"
                                        type="text"
                                        required
                                        value={formData.projectTitle}
                                        onChange={handleChange}
                                        placeholder="Ex: Atelier de réparation smartphone"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        id="projectDescription"
                                        name="projectDescription"
                                        required
                                        rows="4"
                                        value={formData.projectDescription}
                                        onChange={handleChange}
                                        placeholder="Décrivez votre projet et son impact..."
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Inscription en cours...' : 'S\'inscrire'}
                    </button>

                    <p className="text-center text-sm text-gray-600">
                        Déjà membre ?{' '}
                        <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                            Se connecter
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
