import { useState } from 'react'
import { X, Plus, Trash2 } from 'lucide-react'

export default function EditProjectsModal({ projects, onSave, onClose }) {
    const [editedProjects, setEditedProjects] = useState([...projects])

    const addProject = () => {
        setEditedProjects([...editedProjects, {
            title: '',
            description: '',
            impact_carbone: 0,
            status: 'completed'
        }])
    }

    const removeProject = (index) => {
        setEditedProjects(editedProjects.filter((_, i) => i !== index))
    }

    const updateProject = (index, field, value) => {
        const updated = [...editedProjects]
        updated[index] = { ...updated[index], [field]: value }
        setEditedProjects(updated)
    }

    const handleSave = () => {
        // Filtrer les projets vides
        const validProjects = editedProjects.filter(p => p.title.trim())
        onSave(validProjects)
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4" onClick={onClose}>
            <div
                className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Modifier mes projets</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="space-y-4 mb-6">
                    {editedProjects.map((project, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-3">
                                <h4 className="font-semibold text-gray-900">Projet {index + 1}</h4>
                                <button
                                    onClick={() => removeProject(index)}
                                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Titre du projet
                                    </label>
                                    <input
                                        type="text"
                                        value={project.title}
                                        onChange={(e) => updateProject(index, 'title', e.target.value)}
                                        placeholder="Ex: Atelier éco-conception web"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        value={project.description}
                                        onChange={(e) => updateProject(index, 'description', e.target.value)}
                                        placeholder="Décrivez votre projet..."
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Impact CO₂ (kg)
                                        </label>
                                        <input
                                            type="number"
                                            value={project.impact_carbone}
                                            onChange={(e) => updateProject(index, 'impact_carbone', parseFloat(e.target.value) || 0)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Statut
                                        </label>
                                        <select
                                            value={project.status}
                                            onChange={(e) => updateProject(index, 'status', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        >
                                            <option value="completed">Terminé</option>
                                            <option value="ongoing">En cours</option>
                                            <option value="planned">Planifié</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={addProject}
                    className="mb-6 flex items-center gap-2 text-primary-600 hover:text-primary-700"
                >
                    <Plus className="h-5 w-5" />
                    Ajouter un projet
                </button>

                <div className="flex gap-3">
                    <button
                        onClick={handleSave}
                        className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
                    >
                        Enregistrer
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    >
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    )
}
