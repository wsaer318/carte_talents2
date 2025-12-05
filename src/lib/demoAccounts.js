// Comptes de démonstration pré-configurés
export const DEMO_ACCOUNTS = {
    // 1. Compte Administrateur
    admin: {
        id: 'admin-001',
        email: 'admin@village-nird.fr',
        password: 'admin123', // Mot de passe en clair pour la démo
        nom: 'Dupont',
        prenom: 'Marie',
        system_role: 'admin', // Rôle système pour les permissions
        village_role: 'Administrateur', // Rôle métier au sein du village
        badge_verified: true,
        skills: [
            { skill_name: 'Gestion de projet', level: 'Expert' },
            { skill_name: 'Administration système', level: 'Expert' }
        ],
        languages: [
            { language: 'Français', level: 'Natif' },
            { language: 'Anglais', level: 'Courant' }
        ],
        passions: ['Numérique responsable', 'Éducation'],
        projects: [
            {
                title: 'Mise en place du Village NIRD',
                description: 'Création et administration de la plateforme collaborative',
                impact_carbone: 0
            }
        ],
        preferences: {
            mode_sobriete: true,
            notifications: true
        },
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
    },

    // 2. Utilisateur 1 - Enseignant
    user1: {
        id: 'user-001',
        email: 'jean.martin@ecole.fr',
        password: 'user123',
        nom: 'Martin',
        prenom: 'Jean',
        system_role: 'user',
        village_role: 'Enseignant',
        badge_verified: true,
        skills: [
            { skill_name: 'Programmation Python', level: 'Intermédiaire' },
            { skill_name: 'Éco-conception web', level: 'Débutant' }
        ],
        languages: [
            { language: 'Français', level: 'Natif' },
            { language: 'Anglais', level: 'Intermédiaire' }
        ],
        passions: ['Informatique', 'Pédagogie', 'Environnement'],
        projects: [
            {
                title: 'Atelier d\'initiation au code',
                description: 'Cours de Python pour lycéens avec focus sur l\'efficacité énergétique',
                impact_carbone: 0
            }
        ],
        preferences: {
            mode_sobriete: false,
            notifications: true
        },
        created_at: '2024-02-01T00:00:00Z',
        updated_at: '2024-02-01T00:00:00Z'
    },

    // 3. Utilisateur 2 - Technicien
    user2: {
        id: 'user-002',
        email: 'sophie.bernard@tech.fr',
        password: 'user123',
        nom: 'Bernard',
        prenom: 'Sophie',
        system_role: 'user',
        village_role: 'Technicien',
        badge_verified: true,
        skills: [
            { skill_name: 'Réparation matériel informatique', level: 'Expert' },
            { skill_name: 'Diagnostic électronique', level: 'Expert' }
        ],
        languages: [
            { language: 'Français', level: 'Natif' },
            { language: 'Espagnol', level: 'Courant' }
        ],
        passions: ['Électronique', 'Économie circulaire', 'Bricolage'],
        projects: [
            {
                title: 'Repair Café scolaire',
                description: 'Animation d\'ateliers de réparation d\'ordinateurs et smartphones',
                impact_carbone: 0
            },
            {
                title: 'Recyclage de composants',
                description: 'Récupération et réutilisation de pièces électroniques',
                impact_carbone: 0
            }
        ],
        preferences: {
            mode_sobriete: true,
            notifications: true
        },
        created_at: '2024-02-15T00:00:00Z',
        updated_at: '2024-02-15T00:00:00Z'
    },

    // 4. Utilisateur 3 - Éco-délégué
    user3: {
        id: 'user-003',
        email: 'alex.dubois@lycee.fr',
        password: 'user123',
        nom: 'Dubois',
        prenom: 'Alex',
        system_role: 'user',
        village_role: 'Eco-delegue',
        badge_verified: false, // En attente de validation
        skills: [
            { skill_name: 'Communication', level: 'Intermédiaire' },
            { skill_name: 'Sensibilisation environnementale', level: 'Intermédiaire' }
        ],
        languages: [
            { language: 'Français', level: 'Natif' },
            { language: 'Anglais', level: 'Débutant' }
        ],
        passions: ['Écologie', 'Engagement citoyen', 'Photographie'],
        projects: [
            {
                title: 'Campagne "Éteins ton écran"',
                description: 'Sensibilisation à la consommation énergétique des écrans',
                impact_carbone: 0
            }
        ],
        preferences: {
            mode_sobriete: false,
            notifications: true
        },
        created_at: '2024-03-01T00:00:00Z',
        updated_at: '2024-03-01T00:00:00Z'
    }
}

// Fonction pour initialiser les comptes de démo dans localStorage
export function initializeDemoAccounts() {
    const profiles = []

    // Convertir les comptes en tableau de profils
    Object.values(DEMO_ACCOUNTS).forEach(account => {
        const { password, ...profileData } = account // Retirer le mot de passe des données de profil
        profiles.push(profileData)
    })

    return profiles
}

// Fonction pour vérifier les credentials de connexion
export function validateDemoLogin(email, password) {
    const account = Object.values(DEMO_ACCOUNTS).find(
        acc => acc.email === email && acc.password === password
    )

    if (account) {
        const { password, ...userData } = account
        return {
            user: { id: account.id, email: account.email },
            profile: userData
        }
    }

    return null
}
