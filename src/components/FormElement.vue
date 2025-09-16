<script setup lang="ts">
import type { FormElement } from '@/types/form';
import { computed } from 'vue';
import { useFormBuilderStore } from '@/stores/FormBuilderStore';
import {
  CheckboxGroupRenderer,
  RadioGroupRenderer,
  BlockElementRenderer,
  ElementControls
} from '@/components/FormElementRenderers';

const store = useFormBuilderStore()

interface Props {
  element: FormElement;
}

const props = defineProps<Props>();

const isSelected = computed(() => store.selectedElementId === props.element.id)

// Element type configurations
const BLOCK_ELEMENT_TYPES = ['input', 'select', 'textarea'] as const

// Helper to determine element layout type
const isBlockElement = computed(() => {
  return BLOCK_ELEMENT_TYPES.includes(props.element.type as any)
})
</script>

<template>
  <div
    class="mb-4 w-full flex gap-2 flex-row border-gray-200 border-0 p-4 rounded-lg form-element-item"
    :class="{ 'border-2 border-blue-500': isSelected }"
    @click="store.selectElement(props.element.id)"
    role="button"
    tabindex="0"
    @keydown.enter="store.selectElement(props.element.id)"
  >
    <!-- Conditional layout based on element type -->

    <!-- Checkbox Group -->
    <CheckboxGroupRenderer
      v-if="element.type === 'checkbox-group'"
      :element="element"
    />

    <!-- Radio Group -->
    <RadioGroupRenderer
      v-else-if="element.type === 'radio-group'"
      :element="element"
    />

    <!-- Block Elements (input, select, textarea) -->
    <BlockElementRenderer
      v-else-if="isBlockElement"
      :element="element"
    />

    <!-- Element Controls -->
    <ElementControls :element-id="element.id" />
  </div>
</template>

<style scoped>
.form-element-item {
  cursor: pointer;
}

.form-element-item:hover {
  border: 2px solid #e5e7eb; /* Tailwind's gray-200 */
}

.form-element-item.border-blue-500 {
  border: 2px solid #3b82f6; /* Tailwind's blue-500 */
}
</style>