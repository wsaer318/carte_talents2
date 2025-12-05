export default function MentionsLegales() {
    return (
        <div className="min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="glass-panel rounded-2xl p-8 md:p-12 border border-white/10">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-display">Mentions Légales</h1>
                    <p className="text-sm text-cyan-400 mb-8 uppercase tracking-wider font-bold">
                        Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
                    </p>

                    <div className="space-y-10 text-slate-300 leading-relaxed">
                        {/* Éditeur */}
                        <section>
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
                                1. Éditeur du site
                            </h2>
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
                                <p className="mb-2"><strong className="text-white">Nom :</strong> L'Agora du Village NIRD</p>
                                <p className="mb-2"><strong className="text-white">Type :</strong> Plateforme associative de mise en réseau</p>
                                <p><strong className="text-white">Hébergement :</strong> Supabase (infrastructure cloud)</p>
                            </div>
                        </section>

                        {/* Directeur */}
                        <section>
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
                                2. Directeur de la publication
                            </h2>
                            <p className="mb-2">Responsable : Administration du Village NIRD</p>
                            <p>Contact : <span className="text-cyan-400 font-mono">admin@village-nird.fr</span></p>
                        </section>

                        {/* Hébergement */}
                        <section>
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
                                3. Hébergement
                            </h2>
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
                                <p className="mb-2"><strong className="text-white">Hébergeur :</strong> Supabase Inc.</p>
                                <p className="mb-2"><strong className="text-white">Adresse :</strong> 970 Toa Payoh North, #07-04, Singapore 318992</p>
                                <p>
                                    <strong className="text-white">Site web :</strong>{' '}
                                    <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 hover:underline">
                                        https://supabase.com
                                    </a>
                                </p>
                            </div>
                        </section>

                        {/* Propriété intellectuelle */}
                        <section>
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
                                4. Propriété intellectuelle
                            </h2>
                            <p className="mb-4">
                                Le contenu de ce site (textes, images, graphismes, logo, icônes, etc.) est la propriété exclusive
                                de l'Agora du Village NIRD, sauf mention contraire.
                            </p>
                            <p className="mb-4">
                                Toute reproduction, distribution, modification, adaptation, retransmission ou publication de ces
                                différents éléments est strictement interdite sans l'accord exprès par écrit de l'Agora du Village NIRD.
                            </p>
                            <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-500/20">
                                <p className="text-blue-300 font-bold mb-2">Exceptions :</p>
                                <ul className="list-disc list-inside text-blue-200/80 ml-2 space-y-1">
                                    <li>Les données utilisateur restent la propriété de leurs auteurs</li>
                                    <li>Le logo et les ressources Leaflet sont sous licence open-source</li>
                                </ul>
                            </div>
                        </section>

                        {/* RGPD */}
                        <section>
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
                                5. Protection des données personnelles
                            </h2>
                            <p className="mb-4">
                                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit
                                d'accès, de rectification et de suppression de vos données personnelles.
                            </p>
                            <p className="mb-2"><strong className="text-white">Responsable du traitement :</strong> Administration du Village NIRD</p>
                            <p><strong className="text-white">Contact DPO :</strong> <span className="text-cyan-400 font-mono">dpo@village-nird.fr</span></p>
                        </section>

                        {/* Cookies */}
                        <section>
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
                                6. Cookies et LocalStorage
                            </h2>
                            <p className="mb-4">Ce site utilise uniquement le localStorage du navigateur pour :</p>
                            <ul className="list-disc list-inside ml-4 mb-4 space-y-1 text-slate-400">
                                <li>Gérer l'authentification en mode démo</li>
                                <li>Sauvegarder vos préférences (mode sobriété)</li>
                                <li>Stocker vos données en local</li>
                            </ul>
                            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm font-bold flex items-center gap-2">
                                <span>🍪</span> Aucun cookie tiers n'est utilisé. Aucune donnée transmise vers l'extérieur.
                            </div>
                        </section>

                        {/* Contact */}
                        <section className="border-t border-white/10 pt-8">
                            <h2 className="text-xl font-bold text-white mb-4">Une question ?</h2>
                            <p>
                                Pour toute question concernant les mentions légales :<br />
                                <span className="text-cyan-400 font-mono">legal@village-nird.fr</span>
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
