import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { localStorageService } from '../lib/localStorage'

export function useAuth() {
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // MODE DÉMO : Vérifier la session localStorage au lieu de Supabase
        const checkLocalSession = () => {
            const currentUser = localStorageService.getCurrentUser()

            if (currentUser && currentUser.id) {
                // Simuler un user Supabase
                setUser({
                    id: currentUser.id,
                    email: currentUser.email
                })
                fetchProfile(currentUser.id)
            } else {
                setLoading(false)
            }
        }

        checkLocalSession()
    }, [])

    const fetchProfile = async (userId) => {
        try {
            // MODE DÉMO : Charger depuis localStorage
            const profileData = localStorageService.getProfile(userId)
            setProfile(profileData)
        } catch (error) {
            console.error('Erreur lors de la récupération du profil:', error)
            setProfile(null)
        } finally {
            setLoading(false)
        }
    }

    const signIn = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        return { data, error }
    }

    const signUp = async (email, password, userData) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: userData
            }
        })

        // MODE DÉMO : Stocker la session dans localStorage
        if (data.user) {
            localStorageService.setCurrentUser({
                id: data.user.id,
                email: data.user.email
            })
        }

        return { data, error }
    }

    const signOut = async () => {
        // MODE DÉMO : Nettoyer localStorage
        localStorageService.clearCurrentUser()
        setUser(null)
        setProfile(null)

        const { error } = await supabase.auth.signOut()
        return { error }
    }

    return {
        user,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
    }
}
