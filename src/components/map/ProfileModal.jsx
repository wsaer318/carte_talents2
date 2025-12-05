import { X } from 'lucide-react'

export default function ProfileModal({ user, onClose, onCollaborate }) {
    if (!user) return null

    const getRoleColor = (villageRole) => {
        switch (villageRole) {
            case 'Administrateur':
                return 'text-purple-600'
            case 'Enseignant':
                return 'text-blue-600'
            case 'Technicien':
                return 'text-orange-600'
            case 'Eco-delegue':
                return 'text-green-600'
            case 'Association':
                return 'text-pink-600'
            default:
                return 'text-gray-600'
        }
    }

    const getRoleIcon = (villageRole) => {
        switch (villageRole) {
            case 'Administrateur':
                return '👑'
            case 'Enseignant':
                return '👨‍🏫'
            case 'Technicien':
                return '🔧'
            case 'Eco-delegue':
                return '🌱'
            case 'Association':
                return '🤝'
            default:
                return '👤'
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4" onClick={onClose}>
            <div
                className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-6 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/80 hover:text-white transition"
                    >
                        <X className="h-6 w-6" />
                    </button>

                    <div className="flex items-center gap-4">
                        <span className="text-5xl">{getRoleIcon(user.village_role)}</span>
                        <div>
                            <h2 className="text-3xl font-bold">
                                {user.prenom} {user.nom}
                            </h2>
                            <p className={`text-lg font-medium ${getRoleColor(user.village_role)} bg-white/20 px-3 py-1 rounded-full inline-block mt-2`}>
                                {user.village_role}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Corps */}
                <div className="p-6 space-y-6">
                    {/* Contact */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                            <span>📧</span>
                            <a href={`mailto:${user.email}`} className="text-primary-600 hover:underline">
                                {user.email}
                            </a>
                        </p>
                    </div>

                    {/* Compétences */}
                    {user.skills && user.skills.length > 0 && (
                        <div>
                            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                <span>💡</span> Compétences
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                                {user.skills.map((skill, idx) => (
                                    <div key={idx} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                        <p className="font-semibold text-blue-900 text-sm">{skill.skill_name}</p>
                                        <p className="text-xs text-blue-600">{skill.level}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Langues */}
                    {user.languages && user.languages.length > 0 && (
                        <div>
                            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                <span>🌍</span> Langues
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {user.languages.map((lang, idx) => (
                                    <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                        {lang.language} ({lang.level})
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Passions */}
                    {user.passions && user.passions.length > 0 && (
                        <div>
                            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                <span>❤️</span> Passions
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {user.passions.map((passion, idx) => (
                                    <span key={idx} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                                        {passion}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Projets */}
                    {user.projects && user.projects.length > 0 && (
                        <div>
                            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                <span>🚀</span> Projets
                            </h3>
                            <div className="space-y-3">
                                {user.projects.map((project, idx) => (
                                    <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                                        <h4 className="font-semibold text-gray-900">{project.title}</h4>
                                        <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                                        <div className="mt-2 flex items-center gap-2 text-xs">
                                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                                                ♻️ {project.impact_carbone} kg CO2 économisés
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Bouton Collaboration */}
                    {onCollaborate && (
                        <button
                            onClick={() => onCollaborate(user)}
                            className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition font-semibold flex items-center justify-center gap-2"
                        >
                            <span>🤝</span>
                            Proposer une Collaboration
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
