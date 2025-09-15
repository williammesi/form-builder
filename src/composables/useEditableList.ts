// src/composables/useEditableList.ts
import { ref } from 'vue'

export function useEditableList(
  // This function will be called when we want to save a value
  onSave: (index: number, value: string) => void
) {
  // Internal state - same as what you had in the component
  const editingValues = ref<{ [key: number]: string }>({})
  const originalValues = ref<{ [key: number]: string }>({})

  // Is called on input focus
  const startEditing = (index: number, currentValue: string) => {
    originalValues.value[index] = currentValue
    editingValues.value[index] = currentValue
  }

    // Is called on input change
  const updateEditingValue = (index: number, newValue: string | number) => {
    editingValues.value[index] = String(newValue)
  }

    // Is called on input unfocus, to save or revert changes
  const finishEditing = (index: number) => {
    const newValue = editingValues.value[index]?.trim()
    
    if (newValue && newValue.length > 0) {
      // Call the provided save function
      onSave(index, newValue)
    } else {
      // Revert to original
      editingValues.value[index] = originalValues.value[index]
    }
    
    // Clean up
    delete editingValues.value[index]
    delete originalValues.value[index]
  }

  const getDisplayValue = (index: number, option: string) => {
    return editingValues.value[index] ?? option
  }

  // Return everything the component needs
  return {
    startEditing,
    updateEditingValue,
    finishEditing,
    getDisplayValue
  }
}