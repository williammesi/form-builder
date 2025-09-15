// stores/FormBuilderStore.ts
import { defineStore } from 'pinia'
import { computed, readonly, ref } from 'vue'
import type { FormElement as FormElementType } from '@/types/form';
import type { FormMetadata, ElementTemplate } from '@/types/form';
import { v4 as uuidv4 } from 'uuid';


export const useFormBuilderStore = defineStore('formBuilder', () => {
  //  STATE
  const elements = ref<FormElementType[]>([])
  const selectedElementId = ref<string | null>(null)
  const metadata = ref<FormMetadata>({ title: '', description: '', uuid: '', createdAt: new Date(), updatedAt: new Date() })

  //  GETTERS (computed)
  const selectedElement = computed(() => 
    elements.value.find(el => el.id === selectedElementId.value) || null
  )
  
  const elementCount = computed(() => elements.value.length)

 

  // 🎬 ACTIONS
const addElement = (template: ElementTemplate) => {
  const newElement: FormElementType = {
    id: uuidv4(),
    ...template
  }
  elements.value.push(newElement)
  selectedElementId.value = newElement.id
    return newElement
}

  const removeElement = (id: string) => { 
    elements.value = elements.value.filter(el => el.id !== id)
   }

  const selectElement = (id: string | null) => { 
    selectedElementId.value = id
   }
// Update a property of a form element by ID
const updateElementProperty = (id: string | null, property: string, value: any) => {
  if (!id) return; // Early return if no ID
  
  const element = elements.value.find(el => el.id === id)
  if (element) {
    (element as any)[property] = value
  }
}




// Select options actions

const updateOption = (optionIndex: number, newValue: string) => {
  if (!selectedElement.value) return;
  if (selectedElement.value.type !== "select") return;
  if (!selectedElement.value.options) return;
  if (optionIndex < 0 || optionIndex >= selectedElement.value.options.length) return;

  selectedElement.value.options[optionIndex] = newValue
}

const addOption = () => {
    if (!selectedElement.value) return;
    if (selectedElement.value.type !== "select") return;
    if (!selectedElement.value.options) {
      selectedElement.value.options = []
    }
    selectedElement.value.options.push("New Option")
}

const removeOption = (optionIndex: number) => {
    if (!selectedElement.value) return;
    if (selectedElement.value.type !== "select") return;
    if (!selectedElement.value.options) return;
    if (optionIndex < 0 || optionIndex >= selectedElement.value.options.length) return;

    if (selectedElement.value.options.length <= 2) {
      // Prevent removing the last 2 options
      return
    }
    selectedElement.value.options.splice(optionIndex, 1)
}

  return {
    // State (read-only access)
    elements: readonly(elements),
    elementsForVModel: elements, // mutable for v-model
    selectedElementId,
    metadata,
    
    // Getters
    selectedElement,
    elementCount,

    
    // Actions
    addElement,
    removeElement,
    selectElement,
    updateElementProperty,
    updateOption,
    addOption,
    removeOption
  }
})