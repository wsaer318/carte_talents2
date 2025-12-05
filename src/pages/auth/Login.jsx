import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { localStorageService } from '../../lib/localStorage'
import { validateDemoLogin } from '../../lib/demoAccounts'
import { LogIn, ArrowRight } from 'lucide-react'

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
                localStorageService.setCurrentUser(demoAuth.user)
                window.location.href = '/dashboard'
            } else {
                const profiles = localStorageService.getAllProfiles()
                const userProfile = profiles.find(p => p.email === formData.email)

                if (!userProfile) {
                    throw new Error('Email ou mot de passe incorrect.')
                }

                localStorageService.setCurrentUser({
                    id: userProfile.id,
                    email: userProfile.email
                })
                window.location.href = '/dashboard'
            }
        } catch (error) {
            setError(error.message || 'Email ou mot de passe incorrect.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-md w-full space-y-8 relative z-10 glass-panel p-8 md:p-10 rounded-2xl animate-fade-in border border-white/5">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-cyan-950/50 rounded-2xl flex items-center justify-center border border-cyan-500/20 mb-6 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                        <LogIn className="h-8 w-8 text-cyan-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white font-display">
                        Connexion
                    </h2>
                    <p className="mt-2 text-sm text-slate-400">
                        Accédez au portail du Village NIRD
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-200 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="label-dark">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="input-dark w-full"
                                placeholder="exemple@ecole.fr"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="label-dark">
                                Mot de passe
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="input-dark w-full"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5"
                    >
                        {loading ? 'Connexion...' : 'Se connecter'}
                        {!loading && <ArrowRight className="h-4 w-4" />}
                    </button>

                    <p className="text-center text-sm text-slate-400">
                        Pas encore membre ?{' '}
                        <Link to="/register" className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
                            Rejoindre le réseau
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
