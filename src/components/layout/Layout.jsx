import { Link, useNavigate } from 'react-router-dom'
import { Leaf, Menu, X, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useSobriety } from '../../contexts/SobrietyContext'
import { useAuth } from '../../hooks/useAuth'

export default function Layout({ children, user, profile }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { sobrietyMode, toggleSobriety } = useSobriety()
    const { signOut } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await signOut()
        navigate('/')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2">
                            <Leaf className="h-8 w-8 text-primary-600 logo" />
                            <span className="text-xl font-bold text-gray-900">
                                Agora Village NIRD
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-6">
                            <Link
                                to="/"
                                className="text-gray-700 hover:text-primary-600 transition"
                            >
                                Accueil
                            </Link>
                            {user && profile?.badge_verified && (
                                <Link
                                    to="/map"
                                    className="text-gray-700 hover:text-primary-600 transition"
                                >
                                    Carte
                                </Link>
                            )}
                            {user && (
                                <Link
                                    to="/dashboard"
                                    className="text-gray-700 hover:text-primary-600 transition"
                                >
                                    Tableau de bord
                                </Link>
                            )}
                            {profile?.system_role === 'admin' && (
                                <Link
                                    to="/admin"
                                    className="text-gray-700 hover:text-primary-600 transition"
                                >
                                    Admin
                                </Link>
                            )}
                            {!user ? (
                                <Link
                                    to="/register"
                                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
                                >
                                    Rejoindre
                                </Link>
                            ) : (
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-700 hover:text-red-600 transition flex items-center space-x-1"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Déconnexion</span>
                                </button>
                            )}

                            {/* Toggle Mode Sobriété */}
                            <button
                                onClick={toggleSobriety}
                                className={`p-2 rounded-lg transition ${sobrietyMode
                                    ? 'bg-gray-800 text-white'
                                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                                    }`}
                                title="Mode Sobriété"
                            >
                                <Leaf className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    {mobileMenuOpen && (
                        <div className="md:hidden py-4 space-y-2">
                            <Link
                                to="/"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Accueil
                            </Link>
                            {user && profile?.badge_verified && (
                                <Link
                                    to="/map"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Carte
                                </Link>
                            )}
                            {user && (
                                <Link
                                    to="/dashboard"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Tableau de bord
                                </Link>
                            )}
                            {profile?.system_role === 'admin' && (
                                <Link
                                    to="/admin"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Admin
                                </Link>
                            )}

                            <div className="border-t pt-2">
                                {!user ? (
                                    <Link
                                        to="/register"
                                        className="block px-4 py-2 bg-primary-600 text-white hover:bg-primary-700 rounded mx-2 my-2 text-center"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Rejoindre
                                    </Link>
                                ) : (
                                    <button
                                        onClick={() => {
                                            handleLogout()
                                            setMobileMenuOpen(false)
                                        }}
                                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded flex items-center space-x-2"
                                    >
                                        <LogOut className="h-5 w-5" />
                                        <span>Déconnexion</span>
                                    </button>
                                )}
                            </div>

                            <button
                                onClick={toggleSobrietyMode}
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded flex items-center space-x-2"
                            >
                                <Leaf className="h-5 w-5" />
                                <span>Mode Sobriété: {sobrietyMode ? 'Activé' : 'Désactivé'}</span>
                            </button>
                        </div>
                    )}
                </nav>
            </header>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="bg-white border-t mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center text-gray-600">
                        <p>
                            © 2025 Agora Village NIRD - Plateforme souveraine et éco-conçue
                        </p>
                        <p className="text-sm mt-2">
                            Nuit de l'Info 2025 - Numérique Responsable
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
