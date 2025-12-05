# 📋 L'Agora du Village NIRD

Plateforme souveraine et éco-conçue pour connecter les talents du numérique responsable aux établissements scolaires.

**Projet développé pour la Nuit de l'Info 2025**

## 🚀 Démarrage Rapide

### 1. Installation
```bash
npm install
```

### 2. Configuration
Copiez `.env.example` vers `.env` et configurez vos credentials Supabase.

### 3. Setup de la base de données
Voir `python_admin/SETUP_DATABASE.md` pour les instructions détaillées.

### 4. Lancement
```bash
npm run dev
```

L'application sera accessible sur http://localhost:5173

## 📁 Structure

```
/src
  /components     # Composants React
  /hooks          # Hooks personnalisés
  /lib            # Configuration (Supabase)
  /pages          # Pages de l'application
  /styles         # Styles CSS
/python_admin     # Scripts Python pour l'administration (exclu du git)
```

## 🌿 Fonctionnalités

- ✅ Authentification utilisateur
- ✅ Mode Sobriété (économie d'énergie)
- ✅ Compteur d'impact CO₂
- ✅ Système de validation des profils
- ✅ Export de données (RGPD)
- 🚧 Carte interactive Leaflet (à venir)

## 🛠️ Stack Technique

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Maps**: React-Leaflet
- **Admin**: Scripts Python

## 📝 Documentation

- `cahier des charge.md` - Spécifications complètes
- `python_admin/SETUP_DATABASE.md` - Setup de la base de données
- `python_admin/README.md` - Documentation des scripts Python

## 📄 Licence

MIT - Nuit de l'Info 2025
