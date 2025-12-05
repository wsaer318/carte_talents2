import { X, Send } from 'lucide-react'

export default function ProfileModal({ user, onClose, onCollaborate }) {
    if (!user) return null

    const getRoleAttributes = (villageRole) => {
        switch (villageRole) {
            case 'Administrateur': return { color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: '👑' }
            case 'Enseignant': return { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: '👨‍🏫' }
            case 'Technicien': return { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', icon: '🔧' }
            case 'Eco-delegue': return { color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', icon: '🌱' }
            case 'Association': return { color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20', icon: '🤝' }
            default: return { color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20', icon: '👤' }
        }
    }

    const roleAttrs = getRoleAttributes(user.village_role)

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-fade-in" onClick={onClose}>
            <div
                className="bg-slate-900 border border-white/10 rounded-2xl max-w-sm w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="relative h-14 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-white/5">
                    <div className={`absolute inset-0 opacity-20 ${roleAttrs.bg}`}></div>
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 p-1 bg-black/20 hover:bg-black/40 rounded-full text-white/50 hover:text-white transition z-10"
                    >
                        <X className="h-3.5 w-3.5" />
                    </button>

                    <div className="absolute -bottom-3 left-3 flex items-end gap-2.5">
                        <div className="w-10 h-10 rounded-lg bg-slate-900 border-2 border-slate-900 flex items-center justify-center text-base shadow-lg">
                            {roleAttrs.icon}
                        </div>
                        <div className="mb-0.5">
                            <h2 className="text-sm font-bold text-white font-display leading-tight">
                                {user.prenom} {user.nom}
                            </h2>
                            <span className={`px-1.5 py-px rounded-full text-[9px] font-bold uppercase tracking-wider border ${roleAttrs.bg} ${roleAttrs.color} ${roleAttrs.border}`}>
                                {user.village_role}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Corps */}
                <div className="p-3 pt-5 space-y-3">
                    {/* Contact - Only if necessary, usually kept private until collaboration */}

                    {/* Compétences */}
                    {user.skills && user.skills.length > 0 && (
                        <div>
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> Compétences Techniques
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                                {user.skills.map((skill, idx) => (
                                    <div key={idx} className="bg-slate-800/50 border border-white/5 rounded-lg p-2 hover:border-cyan-500/30 transition-colors">
                                        <p className="font-semibold text-slate-200 text-xs">{skill.skill_name}</p>
                                        <div className="flex justify-between items-center mt-1">
                                            <p className="text-[10px] text-cyan-400 font-mono">{skill.level}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Langues & Passions Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Langues */}
                        {user.languages && user.languages.length > 0 && (
                            <div>
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span> Langues
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {user.languages.map((lang, idx) => (
                                        <span key={idx} className="bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2 py-1 rounded-full text-[10px] font-medium">
                                            {lang.language}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Passions */}
                        {user.passions && user.passions.length > 0 && (
                            <div>
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span> Passions
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {user.passions.map((passion, idx) => (
                                        <span key={idx} className="bg-pink-500/10 text-pink-300 border border-pink-500/20 px-2 py-1 rounded-full text-[10px] font-medium">
                                            {passion}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Projets */}
                    {user.projects && user.projects.length > 0 && (
                        <div>
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Projets Réalisés
                            </h3>
                            <div className="space-y-2">
                                {user.projects.map((project, idx) => (
                                    <div key={idx} className="bg-gradient-to-br from-slate-800/80 to-slate-900 border border-white/5 rounded-xl p-3 hover:border-green-500/30 transition-all group">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-white text-sm group-hover:text-green-400 transition-colors">{project.title}</h4>
                                            <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-1.5 py-0.5 rounded text-[10px] font-mono whitespace-nowrap">
                                                -{project.impact_carbone} kg
                                            </span>
                                        </div>
                                        <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">{project.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Bouton Collaboration */}
                    {onCollaborate && (
                        <div className="pt-2">
                            <button
                                onClick={() => onCollaborate(user)}
                                className="w-full relative overflow-hidden group bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-2 px-6 rounded-xl font-bold uppercase tracking-wide shadow-lg hover:shadow-cyan-500/25 transition-all transform hover:-translate-y-1 text-xs"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <Send className="h-4 w-4" />
                                    Initier une Collaboration
                                </span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
