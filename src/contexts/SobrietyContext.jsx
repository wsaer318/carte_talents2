import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { localStorageService } from '../lib/localStorage'

const SobrietyContext = createContext()

export function SobrietyProvider({ children }) {
    const [sobrietyMode, setSobrietyMode] = useState(false)
    const { user } = useAuth()

    // Charger la préférence au démarrage
    useEffect(() => {
        if (user) {
            const profiles = localStorageService.getAllProfiles()
            const userProfile = profiles.find(p => p.id === user.id)

            if (userProfile?.preferences?.mode_sobriete) {
                setSobrietyMode(true)
                document.body.classList.add('sobriety-mode')
            }
        }
    }, [user])

    const toggleSobriety = () => {
        const newMode = !sobrietyMode
        setSobrietyMode(newMode)

        // Appliquer/retirer la classe CSS
        if (newMode) {
            document.body.classList.add('sobriety-mode')
        } else {
            document.body.classList.remove('sobriety-mode')
        }

        // Sauvegarder dans localStorage (mode démo)
        if (user) {
            const profiles = localStorageService.getAllProfiles()
            const updatedProfiles = profiles.map(p => {
                if (p.id === user.id) {
                    return {
                        ...p,
                        preferences: {
                            ...p.preferences,
                            mode_sobriete: newMode
                        }
                    }
                }
                return p
            })

            localStorage.setItem('demo_profiles', JSON.stringify(updatedProfiles))
        }
    }

    return (
        <SobrietyContext.Provider value={{ sobrietyMode, toggleSobriety }}>
            {children}
        </SobrietyContext.Provider>
    )
}

export function useSobriety() {
    const context = useContext(SobrietyContext)
    if (!context) {
        throw new Error('useSobriety must be used within SobrietyProvider')
    }
    return context
}
