# Solution Alternative : Inscription avec Confirmation Email

Si vous voulez garder la confirmation d'email activée, voici comment adapter le flow :

## Stratégie 1 : Stockage temporaire en localStorage

1. **Pendant l'inscription** : Stocker les données (skills, langues, etc.) dans localStorage
2. **Après confirmation email** : Détecter la connexion et appeler le RPC avec les données stockées

## Stratégie 2 : Page "Complétez votre profil"

1. **Inscription** : Créer uniquement le compte (nom, prénom, role)
2. **Après confirmation** : Rediriger vers "/complete-profile" pour ajouter skills/langues/etc.

## Recommandation

Pour le développement/tests : **Désactivez la confirmation d'email**
Pour la production : Utilisez la Stratégie 2 (plus propre, meilleure UX)
