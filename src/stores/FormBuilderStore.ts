// stores/FormBuilderStore.ts
import { defineStore } from 'pinia'
import { computed, readonly, ref } from 'vue'
import type { FormElement as FormElementType } from '@/types/form';
import type { FormMetadata, ElementTemplate } from '@/types/form';
import { v4 as uuidv4 } from 'uuid';

export const useFormBuilderStore = defineStore('formBuilder', () => {
  // STATE
  const elements = ref<FormElementType[]>([])
  const selectedElementId = ref<string | null>(null)
  const metadata = ref<FormMetadata>({ title: '', description: '', uuid: '', createdAt: new Date(), updatedAt: new Date() })

  // GETTERS
  const selectedElement = computed(() => 
    elements.value.find(el => el.id === selectedElementId.value) || null
  )
  
  const elementCount = computed(() => elements.value.length)

  // ACTIONS
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
    ;(element as any)[property] = value

    // Handle cascading updates when inputType changes
    if (property === 'inputType' && element.type === 'input') {
      updateLabelAndPlaceholderForInputType(element, value)
    }
  }

  // Input type configurations
  const INPUT_TYPE_CONFIGS = {
    email: { label: 'Email Field', placeholder: 'Enter your email' },
    password: { label: 'Password Field', placeholder: 'Enter your password' },
    number: { label: 'Number Field', placeholder: 'Enter a number' },
    text: { label: 'Text Input', placeholder: 'Enter text' }
  } as const

  // Helper function to update label and placeholder based on inputType
  const updateLabelAndPlaceholderForInputType = (element: FormElementType, inputType: string) => {
    const config = INPUT_TYPE_CONFIGS[inputType as keyof typeof INPUT_TYPE_CONFIGS] || INPUT_TYPE_CONFIGS.text
    element.label = config.label
    element.placeholder = config.placeholder
  }

  // Element type configurations
  const OPTION_ELEMENT_TYPES = ['select', 'checkbox-group', 'radio-group'] as const

  const ELEMENT_CONFIGS = {
    select: { defaultOptionName: 'Option', minOptions: 2 },
    'checkbox-group': { defaultOptionName: 'Option', minOptions: 1 },
    'radio-group': { defaultOptionName: 'Option', minOptions: 2 }
  } as const

  // Helper function to check if element supports options
  const elementSupportsOptions = (elementType: string): boolean => {
    return OPTION_ELEMENT_TYPES.includes(elementType as any)
  }

  // Generic options management
  const updateOption = (optionIndex: number, newValue: string) => {
    if (!selectedElement.value) return;
    
    
    if (!elementSupportsOptions(selectedElement.value.type)) return;
    
    if (!selectedElement.value.options) return;
    if (optionIndex < 0 || optionIndex >= selectedElement.value.options.length) return;

    selectedElement.value.options[optionIndex] = newValue
  }

  const addOption = () => {
    if (!selectedElement.value) return;
    if (!elementSupportsOptions(selectedElement.value.type)) return;
    
    if (!selectedElement.value.options) {
      selectedElement.value.options = []
    }
    
    // Smart default option names based on element type
    const defaultOptionName = getDefaultOptionName(selectedElement.value.type, selectedElement.value.options.length)
    selectedElement.value.options.push(defaultOptionName)
  }

  const removeOption = (optionIndex: number) => {
    if (!selectedElement.value) return;
    if (!elementSupportsOptions(selectedElement.value.type)) return;
    
    if (!selectedElement.value.options) return;
    if (optionIndex < 0 || optionIndex >= selectedElement.value.options.length) return;

    // Different minimum requirements for different element types
    const minOptions = getMinimumOptionsForElement(selectedElement.value.type)
    if (selectedElement.value.options.length <= minOptions) {
      return
    }
    
    selectedElement.value.options.splice(optionIndex, 1)
  }

  // Helper function to get appropriate default option names
  const getDefaultOptionName = (elementType: string, currentCount: number): string => {
    const config = ELEMENT_CONFIGS[elementType as keyof typeof ELEMENT_CONFIGS]
    return config ? `${config.defaultOptionName} ${currentCount + 1}` : 'New Option'
  }

  // Helper function to get minimum options for each element type
  const getMinimumOptionsForElement = (elementType: string): number => {
    const config = ELEMENT_CONFIGS[elementType as keyof typeof ELEMENT_CONFIGS]
    return config?.minOptions || 1
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