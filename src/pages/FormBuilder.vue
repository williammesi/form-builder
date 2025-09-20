<script setup lang="ts">
import { SidebarProvider } from "@/components/ui/sidebar";
import BuilderFormElementsSidebar from "@/components/BuilderFormElementsSidebar/BuilderFormElementsSidebar.vue";
import BuilderFormElementsPropertiesSidebar from "@/components/BuilderFormElementsPropertiesSidebar/BuilderFormElementsPropertiesSidebar.vue";
import FormElement from "@/components/FormElement.vue";
import { downloadJSON } from '@/composables/useJsonUtils';
import Draggable from 'vuedraggable';

import { useFormBuilderStore } from '@/stores/FormBuilderStore'
const store = useFormBuilderStore()


// Handle form export
const exportJson = () => {
  try {
    const formData = store.elementsToJson;
    const filename = `form-builder-${new Date().toISOString().split('T')[0]}.json`;
    
    downloadJSON(formData, filename);
    
    // Optional: Show success message or log
    console.log('Form exported successfully:', formData);
  } catch (error) {
    console.error('Failed to export form:', error);
    // You could add a toast notification here
  }
};


</script>


<template>
  <SidebarProvider style="--sidebar-width: 20rem; --sidebar-width-mobile: 20rem;">
    <BuilderFormElementsSidebar  />
    
    <div class="flex flex-col items-center mx-auto w-5/10 h-full p-4">
      <div class="w-full flex flex-row items-center justify-center text-center gap-4 mb-4">
        <h1 class="text-2xl font-semibold">Form preview</h1>
        <button @click="exportJson" v-if="store.elementCount > 0" class=" cursor-pointer bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-lg text-white">
          Export to JSON
        </button>
      </div>
      
      
      <div 
        class="flex flex-col w-full h-[calc(100vh-12rem)] border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 p-4 overflow-y-auto" 
        aria-label="Form preview scrollable area"
      >
        <p 
          v-if="store.elementCount === 0" 
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
            v-model="store.elementsForVModel"
            group="form-elements"
            item-key="id"
            handle=".drag-handle"
            class="h-full"
            :animation="300"
          >
            <template #item="{ element }">
              <FormElement
                :mode="'builder'"
                :key="element.id"
                :element="element"
                
                
              />
            </template>
          </Draggable>
        </transition-group>
      </div>
    </div>
    
    <BuilderFormElementsPropertiesSidebar />
  </SidebarProvider>
</template>