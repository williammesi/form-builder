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
  }

  const removeElement = (id: string) => { 
    elements.value = elements.value.filter(el => el.id !== id)
    if (selectedElementId.value !== null && selectedElementId.value === id) {
      selectedElementId.value = null
    }
  }

  const selectElement = (id: string | null) => { 
    selectedElementId.value = id
  }

  // Update a property of the selected form element
  const updateSelectedElementProperty = (property: string, value: any) => {
    if (!selectedElement.value) return;
    
    const element = elements.value.find(el => el.id === selectedElement.value!.id)
    if (!element) return;
    
    // Update the property
    (element as any)[property] = value
    
    // Handle cascading updates when inputType changes
    if (property === 'inputType' && element.type === 'input') {
      updateLabelAndPlaceholderForInputType(element, value)
    }
  }

  // Helper function to update label and placeholder based on inputType
  const updateLabelAndPlaceholderForInputType = (element: FormElementType, inputType: string) => {
    switch (inputType) {
      case 'email':
        element.label = 'Email Field'
        element.placeholder = 'Enter your email'
        break
      case 'password':
        element.label = 'Password Field'
        element.placeholder = 'Enter your password'
        break
      case 'text':
      default:
        element.label = 'Text Input'
        element.placeholder = 'Enter text'
        break
    }
  }

  // 🆕 IMPROVED: Helper function to check if element supports options
  const elementSupportsOptions = (elementType: string): boolean => {
    return ['select', 'checkbox-group', 'radio-group'].includes(elementType)
  }

  // 🆕 IMPROVED: Generic options management
  const updateOption = (optionIndex: number, newValue: string) => {
    if (!selectedElement.value) return;
    
    // ✅ Now works for any element that supports options!
    if (!elementSupportsOptions(selectedElement.value.type)) return;
    
    if (!selectedElement.value.options) return;
    if (optionIndex < 0 || optionIndex >= selectedElement.value.options.length) return;

    selectedElement.value.options[optionIndex] = newValue
  }

  const addOption = () => {
    if (!selectedElement.value) return;
    
    // ✅ Now works for any element that supports options!
    if (!elementSupportsOptions(selectedElement.value.type)) return;
    
    if (!selectedElement.value.options) {
      selectedElement.value.options = []
    }
    
    // 🆕 Smart default option names based on element type
    const defaultOptionName = getDefaultOptionName(selectedElement.value.type, selectedElement.value.options.length)
    selectedElement.value.options.push(defaultOptionName)
  }

  const removeOption = (optionIndex: number) => {
    if (!selectedElement.value) return;
    
    // ✅ Now works for any element that supports options!
    if (!elementSupportsOptions(selectedElement.value.type)) return;
    
    if (!selectedElement.value.options) return;
    if (optionIndex < 0 || optionIndex >= selectedElement.value.options.length) return;

    // 🆕 Different minimum requirements for different element types
    const minOptions = getMinimumOptionsForElement(selectedElement.value.type)
    if (selectedElement.value.options.length <= minOptions) {
      // Prevent removing below minimum
      return
    }
    
    selectedElement.value.options.splice(optionIndex, 1)
  }

  // 🆕 Helper function to get appropriate default option names
  const getDefaultOptionName = (elementType: string, currentCount: number): string => {
    switch (elementType) {
      case 'select':
        return `Option ${currentCount + 1}`
      case 'checkbox-group':
        return `Checkbox option ${currentCount + 1}`
      case 'radio-group':
        return `Radio option ${currentCount + 1}`
      default:
        return `New Option`
    }
  }

  // 🆕 Helper function to get minimum options for each element type
  const getMinimumOptionsForElement = (elementType: string): number => {
    switch (elementType) {
      case 'select':
        return 2 // Select needs at least 2 options to make sense
      case 'checkbox-group':
        return 1 // Checkbox group can have just 1 option (though not very useful)
      case 'radio-group':
        return 2 // Radio group needs at least 2 options
      default:
        return 1
    }
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
    updateSelectedElementProperty,
    updateOption,
    addOption,
    removeOption
  }
})