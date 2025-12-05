import { useState } from 'react'
import { X, Plus, Trash2 } from 'lucide-react'

export default function EditSkillsModal({ skills, onSave, onClose }) {
    const [editedSkills, setEditedSkills] = useState([...skills])

    const addSkill = () => {
        setEditedSkills([...editedSkills, { skill_name: '', level: 'Débutant' }])
    }

    const removeSkill = (index) => {
        setEditedSkills(editedSkills.filter((_, i) => i !== index))
    }

    const updateSkill = (index, field, value) => {
        const updated = [...editedSkills]
        updated[index] = { ...updated[index], [field]: value }
        setEditedSkills(updated)
    }

    const handleSave = () => {
        // Filtrer les compétences vides
        const validSkills = editedSkills.filter(s => s.skill_name.trim())
        onSave(validSkills)
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4" onClick={onClose}>
            <div
                className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Modifier mes compétences</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="space-y-3 mb-6">
                    {editedSkills.map((skill, index) => (
                        <div key={index} className="flex gap-2 items-start">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={skill.skill_name}
                                    onChange={(e) => updateSkill(index, 'skill_name', e.target.value)}
                                    placeholder="Nom de la compétence"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                            <select
                                value={skill.level}
                                onChange={(e) => updateSkill(index, 'level', e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                                <option>Débutant</option>
                                <option>Intermédiaire</option>
                                <option>Avancé</option>
                                <option>Expert</option>
                            </select>
                            <button
                                onClick={() => removeSkill(index)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                                <Trash2 className="h-5 w-5" />
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    onClick={addSkill}
                    className="mb-6 flex items-center gap-2 text-primary-600 hover:text-primary-700"
                >
                    <Plus className="h-5 w-5" />
                    Ajouter une compétence
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
