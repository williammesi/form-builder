# Form Builder / Générateur de Formulaires

*[English](#english) | [Français](#français)*

---

## English

### Overview

A modern, interactive form builder application built with Vue.js 3, TypeScript, and Tailwind CSS. This portfolio project demonstrates advanced frontend development skills including drag-and-drop functionality, form validation, and JSON-based form serialization.

### Features

- **Drag & Drop Interface**: Intuitive form building with draggable components
- **Form Elements**: Support for text inputs, textareas, checkboxes, radio buttons, selects, and phone inputs
- **Real-time Preview**: See your form as you build it
- **JSON Export/Import**: Save and load form configurations
- **Form Validation**: Built-in validation using Vee-Validate and Zod
- **Responsive Design**: Mobile-friendly interface
- **Form Rendering**: Standalone form renderer for testing

### Technologies Used

- **Frontend**: Vue.js 3, TypeScript, Composition API
- **Styling**: Tailwind CSS, Reka UI components
- **Validation**: Vee-Validate, Zod
- **Build Tool**: Vite
- **State Management**: Pinia
- **Drag & Drop**: Vue Draggable

### Getting Started

#### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

#### Installation

```bash
# Clone the repository
git clone [repository-url]
cd form-builder

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

#### Usage

1. **Form Builder**: Navigate to `/` to create forms with drag-and-drop interface
2. **Form Renderer**: Navigate to `/form-renderer` to test exported forms

### Project Structure

```
src/
├── components/          # Reusable Vue components
├── pages/              # Main application pages
├── layouts/            # Layout components
├── stores/             # Pinia stores
├── composables/        # Vue composables
└── router/             # Vue Router configuration
```

---

## Français

### Aperçu

Une application moderne et interactive de création de formulaires développée avec Vue.js 3, TypeScript et Tailwind CSS. Ce projet portfolio démontre des compétences avancées en développement frontend incluant la fonctionnalité glisser-déposer, la validation de formulaires et la sérialisation JSON.

### Fonctionnalités

- **Interface Glisser-Déposer**: Création intuitive de formulaires avec des composants déplaçables
- **Éléments de Formulaire**: Support pour champs texte, zones de texte, cases à cocher, boutons radio, listes déroulantes et saisie téléphonique
- **Aperçu en Temps Réel**: Visualisez votre formulaire pendant sa création
- **Export/Import JSON**: Sauvegarde et chargement des configurations de formulaires
- **Validation de Formulaire**: Validation intégrée utilisant Vee-Validate et Zod
- **Design Responsive**: Interface adaptée aux mobiles
- **Rendu de Formulaire**: Moteur de rendu autonome pour les tests

### Technologies Utilisées

- **Frontend**: Vue.js 3, TypeScript, Composition API
- **Stylisation**: Tailwind CSS, composants Reka UI
- **Validation**: Vee-Validate, Zod
- **Outil de Build**: Vite
- **Gestion d'État**: Pinia
- **Glisser-Déposer**: Vue Draggable

### Démarrage

#### Prérequis
- Node.js (v16 ou supérieur)
- npm ou yarn

#### Installation

```bash
# Cloner le dépôt
git clone [repository-url]
cd form-builder

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Construire pour la production
npm run build
```

#### Utilisation

1. **Générateur de Formulaires**: Naviguer vers `/` pour créer des formulaires avec l'interface glisser-déposer
2. **Moteur de Rendu**: Naviguer vers `/form-renderer` pour tester les formulaires exportés

### Structure du Projet

```
src/
├── components/          # Composants Vue réutilisables
├── pages/              # Pages principales de l'application
├── layouts/            # Composants de mise en page
├── stores/             # Stores Pinia
├── composables/        # Composables Vue
└── router/             # Configuration Vue Router
```

---

## License / Licence

This project is for portfolio purposes. / Ce projet est à des fins de portfolio.