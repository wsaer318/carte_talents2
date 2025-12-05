import { Link } from 'react-router-dom'
import { MapPin, Users, Award, Zap, Activity, Globe } from 'lucide-react'
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
            const profiles = localStorageService.getAllProfiles()
            let total = 0
            profiles.forEach(profile => {
                if (profile.projects && Array.isArray(profile.projects)) {
                    total += profile.projects.reduce((sum, p) => sum + (p.impact_carbone || 0), 0)
                }
            })
            setTotalImpact(total)
        } catch (error) {
            console.error('Erreur', error)
        } finally {
            setLoading(false)
        }
    }

    const membersCount = localStorageService.getAllProfiles().filter(p => p.badge_verified).length
    const projectsCount = localStorageService.getAllProfiles().reduce((sum, p) => sum + (p.projects?.length || 0), 0)

    return (
        <div className="min-h-screen">
            {/* HERO SECTION */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Background Glows */}
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 blur-[100px] rounded-full mix-blend-screen animate-pulse-glow" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse-glow" style={{ animationDelay: '1s' }} />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-400 text-sm font-medium mb-8 animate-slide-up">
                        <Zap className="h-4 w-4" />
                        <span>Nuit de l'Info 2025</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <span className="text-white">AGORA</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">NIRD</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        Le réseau souverain qui connecte les <span className="text-cyan-400">experts du numérique</span> aux <span className="text-green-400">générations futures</span>.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        <Link to="/register" className="btn-primary flex items-center gap-2 group px-8 py-4 text-lg">
                            Rejoindre le Mouvement
                            <Zap className="h-5 w-5 group-hover:fill-current transition-all" />
                        </Link>
                        <Link to="/map" className="btn-neon flex items-center gap-2 px-8 py-4 text-lg">
                            Explorer la Carte
                            <Globe className="h-5 w-5" />
                        </Link>
                    </div>

                    {/* Signature Feature: CO2 Counter */}
                    <div className="mt-20 glass-panel inline-block rounded-3xl p-1 border border-white/10 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                        <div className="bg-slate-950/50 rounded-[1.3rem] px-10 py-6 border border-white/5 backdrop-blur-md">
                            <p className="text-slate-400 text-sm uppercase tracking-widest mb-2 font-semibold">Impact Carbone Collectif</p>
                            <div className="flex items-baseline justify-center gap-2">
                                <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 font-display">
                                    {(totalImpact / 1000).toFixed(1)}
                                </span>
                                <span className="text-2xl text-slate-500 font-bold">tonnes CO₂</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS GRID */}
            <section className="py-20 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { label: "Membres Actifs", val: membersCount, icon: Users, color: "text-blue-400" },
                            { label: "Projets Réalisés", val: projectsCount, icon: Activity, color: "text-purple-400" },
                            { label: "Établissements", val: "12", icon: MapPin, color: "text-pink-400" }
                        ].map((stat, idx) => (
                            <div key={idx} className="card-hover p-8 group">
                                <stat.icon className={`h-8 w-8 ${stat.color} mb-4 group-hover:scale-110 transition-transform`} />
                                <h3 className="text-4xl font-bold text-white mb-2">{stat.val}</h3>
                                <p className="text-slate-400 font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/10 to-transparent pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                Pourquoi rejoindre l'Agora ?
                            </span>
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                            Une plateforme conçue pour l'impact, la collaboration et la souveraineté numérique.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Cartographie Souveraine", desc: "Localisez les experts sans traqueurs ni cookies tiers.", icon: MapPin },
                            { title: "Réseau de Confiance", desc: "Profils vérifiés par des badges de compétence.", icon: Award },
                            { title: "Impact Mesurable", desc: "Suivez votre empreinte écologique en temps réel.", icon: Activity },
                        ].map((feature, idx) => (
                            <div key={idx} className="glass-panel p-8 rounded-2xl border-t border-white/10 hover:border-cyan-500/30 transition-colors group">
                                <div className="w-14 h-14 bg-slate-800/50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors">
                                    <feature.icon className="h-7 w-7 text-cyan-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
