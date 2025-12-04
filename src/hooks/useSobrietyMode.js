import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useSobrietyMode(userId) {
    const [sobrietyMode, setSobrietyMode] = useState(false)

    useEffect(() => {
        // Charger la préférence depuis localStorage en premier
        const savedMode = localStorage.getItem('sobriety-mode')
        if (savedMode !== null) {
            const isActive = savedMode === 'true'
            setSobrietyMode(isActive)
            toggleBodyClass(isActive)
        }

        // Si l'utilisateur est connecté, charger depuis Supabase
        if (userId) {
            loadPreferences()
        }
    }, [userId])

    const loadPreferences = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('preferences')
                .eq('id', userId)
                .single()

            if (error) throw error

            const mode = data?.preferences?.mode_sobriete || false
            setSobrietyMode(mode)
            toggleBodyClass(mode)
            localStorage.setItem('sobriety-mode', mode.toString())
        } catch (error) {
            console.error('Erreur lors du chargement des préférences:', error)
        }
    }

    const toggleSobrietyMode = async () => {
        const newMode = !sobrietyMode
        setSobrietyMode(newMode)
        toggleBodyClass(newMode)
        localStorage.setItem('sobriety-mode', newMode.toString())

        // Sauvegarder dans Supabase si l'utilisateur est connecté
        if (userId) {
            try {
                const { error } = await supabase
                    .from('profiles')
                    .update({
                        preferences: {
                            mode_sobriete: newMode,
                            notifications: true,
                        },
                    })
                    .eq('id', userId)

                if (error) throw error
            } catch (error) {
                console.error('Erreur lors de la sauvegarde des préférences:', error)
            }
        }
    }

    const toggleBodyClass = (isActive) => {
        if (isActive) {
            document.body.classList.add('sobriety-mode')
        } else {
            document.body.classList.remove('sobriety-mode')
        }
    }

    return { sobrietyMode, toggleSobrietyMode }
}
