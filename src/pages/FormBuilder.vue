<script setup lang="ts">
import { SidebarProvider } from "@/components/ui/sidebar";
import BuilderFormElementsSidebar from "@/components/BuilderFormElementsSidebar.vue";
import BuilderFormElementsPropertiesSidebar from "@/components/BuilderFormElementsPropertiesSidebar.vue";
import FormElement from "@/components/FormElement.vue";
import { provide, ref } from 'vue';
import type { FormElement as FormElementType } from '@/types/form';
import Draggable from 'vuedraggable';

const previewForm = ref<FormElementType[]>([]);
const selectedElementId = ref<string | null>(null);

provide('previewForm', previewForm);
provide('selectedElementId', selectedElementId);

const addElement = (element: FormElementType) => {
  console.log('Adding element:', element);
  previewForm.value.push({ ...element });
};

const selectElement = (elementId: string) => {
  selectedElementId.value = elementId;
  console.log('Selected element ID:', selectedElementId.value);
};

const deleteElement = (elementId: string) => {
  previewForm.value = previewForm.value.filter(e => e.id !== elementId);
  if (selectedElementId.value === elementId) {
    selectedElementId.value = null;
  }
};

const isElementSelected = (elementId: string) => {
  return selectedElementId.value === elementId;
};
</script>


<template>
  <SidebarProvider style="--sidebar-width: 20rem; --sidebar-width-mobile: 20rem;">
    <BuilderFormElementsSidebar @add-element="addElement" />
    
    <div class="flex flex-col items-center mx-auto w-5/10 h-full p-4">
      <h1 class="text-2xl font-semibold mb-4">Form preview</h1>
      
      <div 
        class="flex flex-col w-full h-[calc(100vh-12rem)] border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 p-4 overflow-y-auto" 
        aria-label="Form preview scrollable area"
      >
        <p 
          v-if="previewForm.length === 0" 
          class="text-gray-500 dark:text-gray-400 absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-center"
        >
          Drag and drop form elements here
        </p>
        
        <transition-group
          name="form-element"
          tag="div"
          class="flex flex-col w-full h-full"
          appear
        >
          <Draggable
            v-model="previewForm"
            group="form-elements"
            item-key="id"
            handle=".drag-handle"
            class="h-full"
            :animation="300"
          >
            <template #item="{ element }">
              <FormElement
                :key="element.id"
                :element="element"
                :is-selected="isElementSelected(element.id)"
                @select="selectElement"
                @delete="deleteElement"
              />
            </template>
          </Draggable>
        </transition-group>
      </div>
    </div>
    
    <BuilderFormElementsPropertiesSidebar />
  </SidebarProvider>
</template>