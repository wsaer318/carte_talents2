# 🌌 L'Agora du Village NIRD - Digital Abyss Edition

> **Note**: Le backend n'est pas implémenté. Cette application est une démonstration frontend avancée utilisant `localStorage` et des simulations pour les intéractions avec les données (mode Démo).

Plateforme souveraine, éco-conçue et immersive pour connecter les talents du numérique responsable aux établissements scolaires. Cette version présente une refonte visuelle complète sous le thème **"Digital Abyss & Bioluminescence"**, alliant esthétique sombre moderne et principes de sobriété numérique.

**Projet développé pour la Nuit de l'Info 2025**

---

## ✨ Fonctionnalités Principales

### 🗺️ Carte Interactive des Talents
- Exploration fluide via **Leaflet** & **React-Leaflet**.
- Visualisation des utilisateurs par rôle (Enseignant, Technicien, Éco-délégué, etc.).
- Filtrage avancé et recherche intuitive.

### 👤 Profils & Collaboration
- **Modale de Profil Immersive** : Design "Glassmorphism" sombre avec accents néons.
- Affichage des compétences, langues, passions et projets éco-responsables.
- **Système de Collaboration** : Formulaire de contact intégré pour initier des projets (simulation frontend).

### 📊 Tableau de Bord Éco-Responsable
- **Calculateur d'Impact CO₂** : Suivi visuel des économies réalisées.
- Gestion des projets et des compétences utilisateur.
- Design responsive en grille avec panneaux translucides.

### 🍃 Éco-Conception & Sobriété
- **Mode Sobriété** : Bascule pour réduire les animations et les effets graphiques énergivores.
- Palette de couleurs sombres (OLED-friendly) pour réduire la consommation d'énergie sur les écrans compatibles.
- Typographie optimisée (`Outfit` & `Inter`) pour la lisibilité.

### ⚖️ Conformité & Légal
- Pages **Mentions Légales** et **Politique de Confidentialité** intégrées et stylisées.
- Respect des normes RGPD (simulé dans le cadre de la démo).

---

## 🛠️ Stack Technique

- **Frontend Framework** : React 18 + Vite
- **Styling** : Tailwind CSS (Configuration personnalisée "Abyss")
- **Cartographie** : Leaflet, React-Leaflet
- **Icônes** : Lucide React
- **Notifications** : Système de Toast personnalisé
- **Données** : `localStorage` (Mode Démo) / Structure pour Supabase (Non connecté)

---

## 🚀 Installation et Démarrage

### 1. Prérequis
- Node.js (v16 ou supérieur)
- npm

### 2. Installation des dépendances
```bash
npm install
```

### 3. Lancement du serveur de développement
```bash
npm run dev
```
L'application sera accessible sur `http://localhost:5173`.

### 4. Accès Démo (Mode Déconnecté)
Pour tester l'application sans créer de compte, utilisez les identifiants pré-configurés suivants :

**👑 Compte Administrateur**
- **Email** : `admin@village-nird.fr`
- **Mot de passe** : `admin123`

**👤 Compte Utilisateur (Enseignant)**
- **Email** : `jean.martin@ecole.fr`
- **Mot de passe** : `user123`

> **Note** : Vous pouvez également créer un nouveau compte via le formulaire d'inscription ; il sera sauvegardé localement dans votre navigateur pour la session.

---

## 📁 Structure du Projet

```bash
/src
  /components
    /collaboration  # Modales et formulaires de contact
    /common         # Composants réutilisables (Badge, Button, Card...)
    /layout         # Structure (Header, Footer, Layout principal)
    /map            # Carte interactive, Filtres, Modale Profil
    /ui             # Composants d'interface (Alert, Toast...)
  /contexts         # Gestion d'état (Auth, Toast, Sobriety)
  /hooks            # Hooks personnalisés (useAuth, etc.)
  /lib              # Utilitaires et simulation LocalStorage
  /pages            # Vues principales (Home, Map, Dashboard, Login, Register...)
  /styles           # CSS global et configuration du thème
```

---

## 🎨 Design System "Digital Abyss"

Le design repose sur trois piliers :
1.  **Profondeur** : Fonds `slate-950` et `slate-900` pour une immersion totale.
2.  **Luminescence** : Accents fluo (Cyan, Purple, Green) pour guider l'œil sans surcharger.
3.  **Transparence** : Effets de verre (`backdrop-blur`) pour hiérarchiser l'information.

---

## 📄 Licence

MIT - Nuit de l'Info 2025
