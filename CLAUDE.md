# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` - Starts Vite development server
- **Build**: `npm run build` - Type checks with vue-tsc and builds for production
- **Preview**: `npm run preview` - Preview production build locally

No tests are configured in this project currently.

## Project Architecture

This is a Vue 3 + TypeScript form builder application using:
- **Vite** for build tooling
- **Vue 3** with Composition API and `<script setup>` syntax
- **Pinia** for state management
- **Vue Router** for routing
- **TailwindCSS** with TailwindCSS v4 for styling
- **Reka UI** for base components
- **VeeValidate + Zod** for form validation
- **VueDraggable** for drag-and-drop functionality

### Core Architecture

**State Management (Pinia Store)**:
- `FormBuilderStore` (`src/stores/FormBuilderStore.ts`) - Central store managing form elements, selection state, and element operations
- Uses Composition API pattern with `defineStore()`
- Key actions: `addElement()`, `removeElement()`, `selectElement()`, `updateSelectedElementProperty()`
- Manages both readonly state for consumption and mutable state for v-model binding

**Type System** (`src/types/form.ts`):
- `FormElement` interface defines the core form element structure
- Supports types: `input`, `select`, `textarea`, `checkbox-group`, `radio-group`
- `ElementTemplate` type for element templates (omits ID)
- `FormMetadata` for form-level information

**Component Structure**:
- **Form Elements Sidebar** (`src/components/BuilderFormElementsSidebar/`):
  - Contains element preview components for each form type
  - `ElementPreview.vue` dispatches to specific preview components
  - Each preview component (e.g., `InputElementPreview.vue`) represents draggable element templates

- **Properties Sidebar** (`src/components/BuilderFormElementsPropertiesSidebar/`):
  - Property editors for each element type
  - `ElementPropertiesWrapper.vue` routes to appropriate property component
  - Handles element-specific configurations (options for selects, input types, etc.)

- **Core Form Element** (`src/components/FormElement.vue`):
  - Renders actual form elements in the builder
  - Handles selection state, drag handles, and delete actions
  - Uses dynamic component rendering based on element type
  - Special handling for group elements (checkbox-group, radio-group)

**Pages**:
- `FormBuilder.vue` - Main form building interface
- `FormRenderer.vue` - Renders completed forms
- `Home.vue` - Landing page

### Key Patterns

**Element Type Handling**: Components use switch statements or type guards to handle different form element types (`input`, `select`, `textarea`, `checkbox-group`, `radio-group`).

**Options Management**: Select, checkbox-group, and radio-group elements use shared options management logic in the store with type-specific defaults and minimum requirements.

**Selection State**: Global selection state managed through `selectedElementId` in store, with visual feedback in form elements.

**Path Aliases**: Uses `@/` alias for `src/` directory (configured in both Vite and TypeScript).

### UI Components

Uses Reka UI components with TailwindCSS styling. Components are located in `src/components/ui/` and include typical form controls (Input, Select, Textarea, Checkbox, etc.).