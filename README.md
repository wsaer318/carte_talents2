# 📋 L'Agora du Village NIRD

Plateforme souveraine et éco-conçue pour connecter les talents du numérique responsable aux établissements scolaires.

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Copier le fichier d'environnement
copy .env.example .env

# Configurer les variables d'environnement Supabase dans .env
```

## ⚙️ Configuration Supabase

1. Créez un projet sur [Supabase](https://supabase.com)
2. Exécutez le script SQL du `cahier des charge.md` dans l'éditeur SQL de Supabase
3. Récupérez votre URL et clé API (anon key)
4. Mettez à jour le fichier `.env` :

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre_cle_anon
```

## 🛠️ Développement

```bash
# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 📦 Build Production

```bash
# Créer le build
npm run build

# Prévisualiser le build
npm run preview
```

## 📁 Structure du Projet

```
/src
  /components
    /layout       # Header, Footer, Layout principal
  /hooks          # Hooks personnalisés (useAuth, useSobrietyMode)
  /lib            # Configuration Supabase
  /pages          # Pages de l'application
    /auth         # Login, Register
  /styles         # Styles globaux (Tailwind + CSS custom)
```

## 🌿 Fonctionnalités

- ✅ Authentification avec Supabase
- ✅ Mode Sobriété (Noir et blanc, économie d'énergie)
- ✅ Compteur d'impact CO₂
- ✅ Système de validation des profils
- ✅ Export de données (RGPD)
- 🚧 Carte interactive Leaflet (à venir)
- 🚧 Système de messagerie (à venir)

## 🎯 Stack Technique

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Maps**: React-Leaflet
- **Icons**: Lucide React
- **Router**: React Router v6

## 📝 Variables d'Environnement

```env
VITE_SUPABASE_URL=          # URL de votre projet Supabase
VITE_SUPABASE_ANON_KEY=     # Clé anonyme Supabase
```

## 🤝 Contribution

Projet développé pour la Nuit de l'Info 2025

## 📄 Licence

MIT
