<!-- FormElement.vue - Clean Version -->
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
  mode: 'builder' | 'render';
}

const props = defineProps<Props>();

const isSelected = computed(() => {
  return props.mode === 'render' ? false : store.selectedElementId === props.element.id
});

// Element type configurations
const BLOCK_ELEMENT_TYPES = ['input', 'select', 'textarea'] as const

// Helper to determine element layout type
const isBlockElement = computed(() => {
  return BLOCK_ELEMENT_TYPES.includes(props.element.type as any)
})

const handleClick = () => {
  if (props.mode === 'builder') {
    store.selectElement(props.element.id);
  }
}
</script>

<template>
  <div
    :class="[
      'mb-4 w-full flex gap-2 flex-row border-gray-200 border-0 p-4 rounded-lg',
      mode === 'builder' ? 'form-element-item' : 'form-render-item',
      { 'border-2 border-blue-500': isSelected }
    ]"
    @click="handleClick()"
    :role="mode === 'builder' ? 'button' : undefined"
    :tabindex="mode === 'builder' ? 0 : undefined"
  >


      <div class="flex flex-col items-start w-full ">
        <label  class="block font-medium mb-1">{{ element.label }}</label>

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
      </div>
      

      <!-- Element Controls -->
      <ElementControls v-if="mode === 'builder'" :element-id="element.id" />
  </div>
</template>

<style scoped>
.form-render-item {
  cursor: default;
}

.form-element-item {
  cursor: pointer;
}

.form-element-item:hover {
  border: 2px solid #e5e7eb;
}

.form-element-item.border-blue-500 {
  border: 2px solid #3b82f6;
}
</style>