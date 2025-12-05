// Script pour débloquer votre profil en mode démo
// Ouvrez la console du navigateur (F12) et collez ce code :

const profiles = JSON.parse(localStorage.getItem('demo_profiles') || '[]')
const updatedProfiles = profiles.map(p => ({
    ...p,
    badge_verified: true
}))
localStorage.setItem('demo_profiles', JSON.stringify(updatedProfiles))
console.log('✅ Tous les profils sont maintenant validés!')
console.log(updatedProfiles)
// Rechargez la page après
