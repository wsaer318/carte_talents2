import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { localStorageService } from '../../lib/localStorage'
import { validateDemoLogin } from '../../lib/demoAccounts'
import { supabase } from '../../lib/supabase'
import { LogIn } from 'lucide-react'

export default function Login() {
    const navigate = useNavigate()
    const { signIn } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
            // MODE DÉMO : Vérifier les credentials avec les comptes de démo
            const demoAuth = validateDemoLogin(formData.email, formData.password)

            if (demoAuth) {
                // Connexion réussie avec un compte de démo
                localStorageService.setCurrentUser(demoAuth.user)

                console.log('✅ Connexion réussie (mode démo):', demoAuth.profile)

                // Redirection
                window.location.href = '/dashboard'
            } else {
                // Aucun compte de démo ne correspond, vérifier dans les profils enregistrés
                const profiles = localStorageService.getAllProfiles()
                const userProfile = profiles.find(p => p.email === formData.email)

                if (!userProfile) {
                    throw new Error('Email ou mot de passe incorrect.')
                }

                // Pour les comptes créés via inscription (sans mot de passe stocké)
                // On accepte n'importe quel mot de passe pour la démo
                localStorageService.setCurrentUser({
                    id: userProfile.id,
                    email: userProfile.email
                })

                console.log('✅ Connexion réussie:', userProfile)
                window.location.href = '/dashboard'
            }
        } catch (error) {
            setError(error.message || 'Email ou mot de passe incorrect.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <LogIn className="mx-auto h-12 w-12 text-primary-600" />
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Connexion
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Accédez à votre espace personnel
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
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Connexion en cours...' : 'Se connecter'}
                    </button>

                    <p className="text-center text-sm text-gray-600">
                        Pas encore membre ?{' '}
                        <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
                            S'inscrire
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
