import { Link } from 'react-router-dom'
import { MapPin, Users, Award, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { localStorageService } from '../lib/localStorage'

export default function Home() {
    const [totalImpact, setTotalImpact] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchCarbonImpact()
    }, [])

    const fetchCarbonImpact = async () => {
        try {
            // MODE DÉMO : Récupérer les projets depuis localStorage
            const profiles = localStorageService.getAllProfiles()

            let total = 0
            profiles.forEach(profile => {
                if (profile.projects && Array.isArray(profile.projects)) {
                    total += profile.projects.reduce((sum, p) => sum + (p.impact_carbone || 0), 0)
                }
            })

            setTotalImpact(total)
        } catch (error) {
            console.error('Erreur lors du calcul de l\'impact carbone:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center animate-fade-in">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                            L'Agora du Village NIRD
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Une plateforme souveraine et éco-conçue pour connecter les talents
                            du numérique responsable aux établissements scolaires
                        </p>

                        {/* Compteur Global CO2 - Feature Signature */}
                        <div className="glass-effect rounded-2xl p-8 max-w-md mx-auto mb-12 shadow-xl">
                            <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                {loading ? (
                                    <span className="animate-pulse">Calcul...</span>
                                ) : (
                                    <>{(totalImpact / 1000).toFixed(1)} tonnes</>
                                )}
                            </h2>
                            <p className="text-gray-600">
                                de CO₂ évitées par le Village
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/register"
                                className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                Rejoindre le réseau
                            </Link>
                            <Link
                                to="/map"
                                className="bg-white text-primary-600 px-8 py-3 rounded-lg border-2 border-primary-600 hover:bg-primary-50 transition text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                Accéder à la carte
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Pourquoi rejoindre l'Agora ?
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="text-center p-6 rounded-xl hover:shadow-lg transition">
                            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="h-8 w-8 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Cartographie Interactive</h3>
                            <p className="text-gray-600">
                                Visualisez et contactez les talents du numérique responsable près de chez vous
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="text-center p-6 rounded-xl hover:shadow-lg transition">
                            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="h-8 w-8 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Réseau de Confiance</h3>
                            <p className="text-gray-600">
                                Profils vérifiés et certifiés par la communauté pour garantir la qualité
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="text-center p-6 rounded-xl hover:shadow-lg transition">
                            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="h-8 w-8 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Impact Mesurable</h3>
                            <p className="text-gray-600">
                                Suivez votre contribution à l'économie de CO₂ et au numérique responsable
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-gradient-to-r from-primary-600 to-primary-800 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8 text-center text-white">
                        <div className="animate-fade-in">
                            <p className="text-5xl font-bold mb-2">
                                {localStorageService.getAllProfiles().filter(p => p.badge_verified).length}
                            </p>
                            <p className="text-primary-100">Membres actifs</p>
                        </div>
                        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                            <p className="text-5xl font-bold mb-2">
                                {localStorageService.getAllProfiles().reduce((sum, p) =>
                                    sum + (p.projects?.length || 0), 0
                                )}
                            </p>
                            <p className="text-primary-100">Projets réalisés</p>
                        </div>
                        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            <p className="text-5xl font-bold mb-2">
                                {(totalImpact / 1000).toFixed(1)}t
                            </p>
                            <p className="text-primary-100">de CO₂ économisés</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Notre Mission
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Créer un pont entre les professionnels du numérique responsable et les
                        établissements scolaires pour partager les connaissances, réparer plutôt
                        que jeter, et sensibiliser aux enjeux environnementaux du digital.
                    </p>
                </div>
            </section>
        </div>
    )
}
