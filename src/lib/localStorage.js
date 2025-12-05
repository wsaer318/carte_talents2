// Gestion du stockage local pour la démo
import { initializeDemoAccounts } from './demoAccounts'

const STORAGE_KEYS = {
    PROFILES: 'demo_profiles',
    CURRENT_USER: 'demo_current_user',
    INITIALIZED: 'demo_initialized'
}

export const localStorageService = {
    // PROFILES
    getAllProfiles: () => {
        // Initialiser les comptes de démo au premier chargement
        const initialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED)
        if (!initialized) {
            const demoProfiles = initializeDemoAccounts()
            localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(demoProfiles))
            localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true')
            console.log('✅ Comptes de démo initialisés:', demoProfiles.length)
        }

        const data = localStorage.getItem(STORAGE_KEYS.PROFILES)
        return data ? JSON.parse(data) : []
    },

    getProfile: (userId) => {
        const profiles = localStorageService.getAllProfiles()
        return profiles.find(p => p.id === userId) || null
    },

    saveProfile: (profile) => {
        const profiles = localStorageService.getAllProfiles()
        const index = profiles.findIndex(p => p.id === profile.id)

        if (index >= 0) {
            profiles[index] = { ...profiles[index], ...profile, updated_at: new Date().toISOString() }
        } else {
            profiles.push({ ...profile, created_at: new Date().toISOString() })
        }

        localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles))
    },

    deleteProfile: (userId) => {
        const profiles = localStorageService.getAllProfiles()
        const filtered = profiles.filter(p => p.id !== userId)
        localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(filtered))
    },

    // CURRENT USER
    setCurrentUser: (user) => {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user))
    },

    getCurrentUser: () => {
        const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
        return data ? JSON.parse(data) : null
    },

    clearCurrentUser: () => {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
    }
}
