<script setup lang="ts">
import { SidebarProvider } from "../components/ui/sidebar";
import BuilderFormElementsSidebar from "@/components/BuilderFormElementsSidebar.vue";
import BuilderFormElementsPropertiesSidebar from "@/components/BuilderFormElementsPropertiesSidebar.vue";
import { GripHorizontal, Trash } from 'lucide-vue-next';
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { FormItem, FormLabel, Form } from "../components/ui/form";
import { ref, computed } from 'vue';
import type { FormElement } from '../types/form';

// Reactive array for preview form elements
const previewForm = ref<FormElement[]>([]);

// Handle adding a form element to the preview
     const addElement = (element: FormElement) => {
       previewForm.value.push(element);
     };
// Map form element type to Shadcn component
     const getComponent = (type: FormElement['type']) => {
       switch (type) {
         case 'input':
           return Input;
         case 'select':
           return Select;
         default:
           return 'div'; // Fallback for unknown types
       }
     };

</script>

<template>
  <SidebarProvider style="--sidebar-width: 20rem; --sidebar-width-mobile: 20rem;">
    <BuilderFormElementsSidebar @add-element="addElement" />
    <div class="flex flex-col items-center mx-auto w-5/10 h-full p-4">
      <h1 class="text-2xl font-semibold mb-4">Form preview</h1>
      <div class="flex flex-col w-full h-[calc(100vh-12rem)] border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 p-4">
        <p v-if="previewForm.length === 0" class="text-gray-500 dark:text-gray-400 text-center">
          Drag and drop form elements here
        </p>
        <div v-else v-for="element in previewForm" :key="element.id" class="mb-4 w-full flex gap-2 flex-row border-gray-200 border-0 hover:border-2 p-4 rounded-lg">
            <div class="flex flex-col items-start w-8/10" >
            <label class="block font-medium mb-1">{{ element.label }}</label>
            <component
              :is="getComponent(element.type)"
              v-bind="{
                placeholder: element.placeholder,
                ...(element.type === 'input' ? { type: element.label.includes('Email') ? 'email' : element.label.includes('Phone') ? 'tel' : 'text' } : {}),
              }"
              class="w-full"
            >
              <template v-if="element.type === 'select'">
                <SelectTrigger class="w-full">
                  <SelectValue :placeholder="element.placeholder" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                </SelectContent>
              </template>
            </component>
          </div>
          <div class="flex flex-row px-4 items-center gap-2 w-2/10 justify-center">
            
            <button class=" p-2 rounded-lg bg-red-400 hover:bg-red-500 cursor-pointer " @click="previewForm = previewForm.filter(e => e.id !== element.id)">
              <Trash class="w-5 h-5 text-gray-50 cursor-pointer" />

            </button>

            <button>
              <GripHorizontal class="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-move" />
            </button>

          </div>
        </div>
      </div>
    </div>
    <BuilderFormElementsPropertiesSidebar />
  </SidebarProvider>
</template>

<style scoped>
</style>