# Système de Comptes et Validation

## 📋 Vue d'ensemble

Le système de comptes utilise un mode de démonstration avec des comptes pré-configurés et un système de validation administrateur.

## 👥 Comptes de Démonstration

### 1. Compte Administrateur
- **Email**: `admin@village-nird.fr`
- **Mot de passe**: `admin123`
- **Rôle**: Administrateur
- **Statut**: ✅ Validé
- **Permissions**: Validation des utilisateurs, accès admin

### 2. Enseignant (Jean Martin)
- **Email**: `jean.martin@ecole.fr`
- **Mot de passe**: `user123`
- **Rôle**: Enseignant
- **Statut**: ✅ Validé
- **Compétences**: Python, Éco-conception web

### 3. Technicien (Sophie Bernard)
- **Email**: `sophie.bernard@tech.fr`
- **Mot de passe**: `user123`
- **Rôle**: Technicien
- **Statut**: ✅ Validé
- **Compétences**: Réparation matériel, Diagnostic électronique

### 4. Éco-délégué (Alex Dubois)
- **Email**: `alex.dubois@lycee.fr`
- **Mot de passe**: `user123`
- **Rôle**: Éco-délégué
- **Statut**: ⏳ **En attente de validation**

## 🔐 Système de Validation

> [!IMPORTANT]
> **Sécurité**: Les identifiants et mots de passe ne sont **jamais** affichés dans l'interface utilisateur, même en mode démo. Les informations ci-dessous sont uniquement pour la documentation interne.

### Comptes disponibles (Documentation interne uniquement)

**Admin**: admin@village-nird.fr / admin123  
**Enseignant**: jean.martin@ecole.fr / user123  
**Technicien**: sophie.bernard@tech.fr / user123  
**Éco-délégué**: alex.dubois@lycee.fr / user123 (non validé)

### Pour les nouveaux utilisateurs

Lorsqu'un utilisateur crée un compte via le formulaire d'inscription :

1. **Inscription**: Le compte est créé avec `badge_verified = false`
2. **Accès limité**: L'utilisateur peut se connecter mais n'a pas accès à toutes les fonctionnalités
3. **Validation admin**: Un administrateur doit approuver le compte
4. **Accès complet**: Une fois validé, `badge_verified = true` et l'utilisateur a accès à tout

### Pour l'administrateur

L'administrateur peut :
- Voir tous les utilisateurs (validés et non-validés)
- Approuver ou rejeter les demandes d'inscription
- Gérer les rôles et permissions

## 🏗️ Architecture Technique

### Fichiers principaux

1. **`src/lib/demoAccounts.js`**
   - Définit les 4 comptes de démonstration
   - Fonction `initializeDemoAccounts()` pour initialiser les profils
   - Fonction `validateDemoLogin()` pour authentifier les utilisateurs

2. **`src/lib/localStorage.js`**
   - Gère le stockage local des profils
   - Initialise automatiquement les comptes de démo au premier chargement

3. **`src/pages/auth/Register.jsx`**
   - Crée les nouveaux comptes avec `badge_verified = false`

4. **`src/pages/auth/Login.jsx`**
   - Authentification avec les comptes de démo
   - Affiche les identifiants de test

## 🧪 Tests

### Tester la validation

1. **Se connecter comme admin**:
   ```
   Email: admin@village-nird.fr
   Mot de passe: admin123
   ```

2. **Se connecter comme utilisateur non validé**:
   ```
   Email: alex.dubois@lycee.fr
   Mot de passe: user123
   ```
   → Devrait avoir un accès limité

3. **Créer un nouveau compte**:
   - S'inscrire normalement
   - Le compte est créé avec `badge_verified = false`
   - Seul l'admin peut le valider

## 🔄 Réinitialisation

Pour réinitialiser tous les comptes en mode démo :

1. Ouvrir la console du navigateur (F12)
2. Exécuter :
   ```javascript
   localStorage.removeItem('demo_profiles')
   localStorage.removeItem('demo_current_user')
   localStorage.removeItem('demo_initialized')
   ```
3. Rafraîchir la page

Les 4 comptes de démonstration seront recréés automatiquement.

## 📝 Notes importantes

- **Mode Démo**: Les mots de passe sont stockés en clair dans le code pour faciliter les tests
- **Production**: En production, utiliser Supabase Auth avec hachage des mots de passe
- **Validation**: Le système de validation est géré côté client pour la démo
- **Persistance**: Les données sont stockées dans localStorage (volatile)
