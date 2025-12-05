import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useSobriety } from '../../contexts/SobrietyContext'
import { Menu, X, Leaf, User, LogOut, Map as MapIcon, LayoutDashboard, Settings } from 'lucide-react'

export default function Layout({ children, user, profile }) {
    const { signOut } = useAuth()
    const { sobrietyMode, toggleSobriety } = useSobriety()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const location = useLocation()

    const navLinks = [
        { name: 'Carte', path: '/map', icon: MapIcon },
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    ]

    // Admin link if applicable
    if (profile?.village_role === 'Administrateur') {
        navLinks.push({ name: 'Admin', path: '/admin', icon: Settings })
    }

    const isActive = (path) => location.pathname === path

    return (
        <div className={`min-h-screen flex flex-col transition-colors duration-500 ${sobrietyMode ? 'sobriety-mode' : ''}`}>
            {/* Glowing Orbs Background (Hidden in sobriety mode) */}
            {!sobrietyMode && (
                <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="glow-orb w-[500px] h-[500px] top-[-100px] left-[-100px] bg-cyan-500/20"></div>
                    <div className="glow-orb w-[400px] h-[400px] bottom-0 right-[-100px] bg-green-500/10"></div>
                </div>
            )}

            {/* Header */}
            <header className="fixed w-full top-0 z-50 transition-all duration-300 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                <Leaf className={`h-8 w-8 relative z-10 transition-colors ${sobrietyMode ? 'text-gray-800' : 'text-cyan-400'}`} />
                            </div>
                            <span className={`text-xl font-bold tracking-tight ${sobrietyMode ? 'text-gray-900' : 'text-white'}`}>
                                AGORA<span className="text-cyan-400">NIRD</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            <nav className="flex gap-6">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive(link.path)
                                            ? 'text-cyan-400'
                                            : 'text-slate-400 hover:text-white'
                                            }`}
                                    >
                                        <link.icon className="h-4 w-4" />
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>

                            <div className="flex items-center gap-4 pl-6 border-l border-white/10">
                                {/* Sobriety Toggle */}
                                <button
                                    onClick={toggleSobriety}
                                    className={`p-2 rounded-full transition-all duration-300 ${sobrietyMode
                                        ? 'bg-gray-200 text-gray-800'
                                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                                        }`}
                                    title={sobrietyMode ? "Désactiver mode sobriété" : "Activer mode sobriété"}
                                >
                                    <Leaf className="h-5 w-5" />
                                </button>

                                {/* Auth Buttons */}
                                {user ? (
                                    <div className="flex items-center gap-4">
                                        <div className="text-right hidden lg:block">
                                            <p className={`text-sm font-medium ${sobrietyMode ? 'text-gray-900' : 'text-white'}`}>
                                                {profile?.prenom} {profile?.nom}
                                            </p>
                                            <p className={`text-xs ${sobrietyMode ? 'text-gray-500' : 'text-cyan-400/80'}`}>
                                                {profile?.village_role}
                                            </p>
                                        </div>
                                        <button
                                            onClick={signOut}
                                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-full transition-colors"
                                            title="Se déconnecter"
                                        >
                                            <LogOut className="h-5 w-5" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex gap-3">
                                        <Link
                                            to="/login"
                                            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${sobrietyMode
                                                ? 'text-gray-600 hover:bg-gray-100'
                                                : 'text-slate-300 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            Connexion
                                        </Link>
                                        <Link
                                            to="/register"
                                            className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${sobrietyMode
                                                ? 'bg-black text-white hover:bg-gray-800'
                                                : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500 hover:text-white hover:border-transparent shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                                                }`}
                                        >
                                            Rejoindre
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-slate-400 hover:text-white"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-xl">
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium ${isActive(link.path)
                                        ? 'bg-cyan-500/10 text-cyan-400'
                                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    <link.icon className="h-5 w-5" />
                                    {link.name}
                                </Link>
                            ))}
                            <div className="border-t border-white/10 my-2 pt-2">
                                {!user ? (
                                    <>
                                        <Link
                                            to="/login"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block px-4 py-3 text-slate-400 hover:text-white"
                                        >
                                            Connexion
                                        </Link>
                                        <Link
                                            to="/register"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block px-4 py-3 text-cyan-400 font-medium hover:bg-cyan-500/10 rounded-lg"
                                        >
                                            Rejoindre le réseau
                                        </Link>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => {
                                            signOut()
                                            setMobileMenuOpen(false)
                                        }}
                                        className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg flex items-center gap-3"
                                    >
                                        <LogOut className="h-5 w-5" />
                                        Déconnexion
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content Spacer for fixed header */}
            <div className="h-20"></div>

            {/* Main Content */}
            <main className="flex-1 relative z-10 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full">
                {children}
            </main>

            {/* Footer */}
            <footer className={`mt-auto py-12 border-t transition-colors ${sobrietyMode
                ? 'bg-gray-100 border-gray-200 text-gray-600'
                : 'bg-slate-900/50 border-white/5 text-slate-400 backdrop-blur-lg'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-12">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <Leaf className={`h-6 w-6 ${sobrietyMode ? 'text-gray-800' : 'text-cyan-400'}`} />
                                <span className={`text-lg font-bold ${sobrietyMode ? 'text-gray-900' : 'text-white'}`}>
                                    AGORA<span className="text-cyan-400">NIRD</span>
                                </span>
                            </div>
                            <p className="text-sm leading-relaxed max-w-md">
                                Plateforme souveraine connectant les acteurs du numérique responsable.
                                Ensemble, réduisons l'empreinte environnementale du digital.
                            </p>
                        </div>

                        <div>
                            <h4 className={`font-semibold mb-4 ${sobrietyMode ? 'text-gray-900' : 'text-white'}`}>Navigation</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/" className="hover:text-cyan-400 transition-colors">Accueil</Link></li>
                                <li><Link to="/map" className="hover:text-cyan-400 transition-colors">Carte Interactive</Link></li>
                                <li><Link to="/register" className="hover:text-cyan-400 transition-colors">Rejoindre</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className={`font-semibold mb-4 ${sobrietyMode ? 'text-gray-900' : 'text-white'}`}>Légal</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/mentions-legales" className="hover:text-cyan-400 transition-colors">Mentions Légales</Link></li>
                                <li><Link to="/confidentialite" className="hover:text-cyan-400 transition-colors">Confidentialité</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm">
                        <p>&copy; 2025 Agora du Village NIRD. Tous droits réservés.</p>
                        <p className="mt-1 opacity-50">Développé pour la Nuit de l'Info 2025</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
