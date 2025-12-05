export default function PolitiqueConfidentialite() {
    return (
        <div className="min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="glass-panel rounded-2xl p-8 md:p-12 border border-white/10">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-display">Politique de Confidentialité</h1>
                    <p className="text-sm text-cyan-400 mb-8 uppercase tracking-wider font-bold">
                        Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
                    </p>

                    <div className="space-y-10 text-slate-300 leading-relaxed">
                        {/* Introduction */}
                        <section>
                            <p className="text-lg text-slate-200">
                                La protection de vos données personnelles est une priorité absolue.
                                Cette politique détaille notre engagement pour un <strong className="text-cyan-400">numérique responsable et souverain</strong>.
                            </p>
                        </section>

                        {/* Données collectées */}
                        <section>
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
                                1. Données collectées
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-slate-900/50 p-5 rounded-xl border border-white/5">
                                    <h3 className="text-white font-bold mb-3 flex items-center gap-2">👤 Identité</h3>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>Nom et prénom</li>
                                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>Adresse email</li>
                                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>Mot de passe (chiffré)</li>
                                    </ul>
                                </div>
                                <div className="bg-slate-900/50 p-5 rounded-xl border border-white/5">
                                    <h3 className="text-white font-bold mb-3 flex items-center gap-2">💼 Professionnel</h3>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>Rôle & Compétences</li>
                                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>Projets & Impact Carbone</li>
                                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>Préférences de sobriété</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Finalité */}
                        <section>
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
                                2. Utilisation éthique
                            </h2>
                            <p className="mb-4">Vos données servent exclusivement à :</p>
                            <ul className="grid md:grid-cols-2 gap-3">
                                {[
                                    'Faciliter la mise en réseau locale',
                                    'Certifier les compétences',
                                    'Mesurer l\'impact écologique',
                                    'Permettre la collaboration'
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 bg-white/5 px-4 py-3 rounded-lg border border-white/5">
                                        <span className="text-green-400">✓</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Partage */}
                        <section>
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
                                3. Partage et Souveraineté
                            </h2>
                            <div className="bg-gradient-to-r from-red-500/10 to-transparent border-l-4 border-red-500 p-6 rounded-r-xl mb-6">
                                <p className="text-white font-bold text-lg mb-1">Zéro Vente de Données</p>
                                <p className="text-red-200 text-sm">Nous ne vendons, ne louons et n'échangeons aucune donnée personnelle avec des tiers commerciaux.</p>
                            </div>
                            <p className="mb-2">Partage strictement limité :</p>
                            <ul className="list-disc list-inside ml-4 space-y-1 text-slate-400">
                                <li>Visibilité publique sur la carte (selon vos réglages)</li>
                                <li>Hébergement sécurisé en UE (Supabase)</li>
                                <li>Obligations légales uniquement</li>
                            </ul>
                        </section>

                        {/* Vos droits */}
                        <section>
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
                                4. Vos Droits
                            </h2>
                            <div className="grid md:grid-cols-3 gap-4">
                                {[
                                    { title: "Accès & Rectification", desc: "Modifiez tout depuis votre dashboard" },
                                    { title: "Portabilité", desc: "Téléchargez vos données en JSON" },
                                    { title: "Droit à l'oubli", desc: "Suppression totale sur demande" }
                                ].map((d, idx) => (
                                    <div key={idx} className="bg-slate-800/80 p-4 rounded-xl border border-white/5 text-center hover:border-cyan-500/30 transition-colors">
                                        <p className="text-cyan-400 font-bold mb-2">{d.title}</p>
                                        <p className="text-xs text-slate-500">{d.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Contact */}
                        <section className="bg-slate-900 rounded-xl p-8 border border-white/10 text-center mt-12">
                            <h3 className="text-2xl font-bold text-white mb-4">Exercer vos droits</h3>
                            <p className="mb-6 max-w-lg mx-auto">
                                Notre équipe DPO (Délégué à la Protection des Données) s'engage à vous répondre sous 30 jours.
                            </p>
                            <a href="mailto:dpo@village-nird.fr" className="inline-block bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-cyan-500/20 transform hover:-translate-y-1">
                                Contacter le DPO
                            </a>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
