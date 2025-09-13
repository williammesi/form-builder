<script setup lang="ts">
import { SidebarProvider } from "../components/ui/sidebar";
import BuilderFormElementsSidebar from "@/components/BuilderFormElementsSidebar.vue";
import BuilderFormElementsPropertiesSidebar from "@/components/BuilderFormElementsPropertiesSidebar.vue";

import { ref } from 'vue';
import type { FormElement } from '../types/form';

// Reactive array for preview form elements
const previewForm = ref<FormElement[]>([]);

// Handle adding a form element to the preview
     const addElement = (element: FormElement) => {
       previewForm.value.push(element);
     };

</script>

<template>
  <SidebarProvider
    style="--sidebar-width: 20rem; --sidebar-width-mobile: 20rem;"
  >
    <BuilderFormElementsSidebar @add-element="addElement" />
   
    <div class="flex flex-col items-center mx-auto w-5/10 h-full p-4">
      <h1 class="text-2xl font-semibold mb-4">Form preview</h1>
      <div class="flex flex-col items-center justify-center w-full h-[calc(100vh-12rem)] border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 p-4">
        <p v-if="previewForm.length === 0" class="text-gray-500 dark:text-gray-400">Drag and drop form elements here</p>
        <div v-else v-for="element in previewForm" :key="element.id" class="mb-4 w-full">
          <label class="block font-medium">{{ element.label }}</label>
          <p>{{ element.type }} (Placeholder)</p>
        </div>
      </div>
    </div>
    
    <BuilderFormElementsPropertiesSidebar />
  </SidebarProvider>
</template>

<style scoped>
</style>