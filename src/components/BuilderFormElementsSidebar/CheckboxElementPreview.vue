<!-- components/BuilderFormElementsSidebar/InputElementPreview.vue -->
<script setup lang="ts">
import type { ElementTemplate } from '@/types/form';
import { Checkbox } from "@/components/ui/checkbox";
interface Props {
  element: ElementTemplate;
}

defineProps<Props>();

// return input type or default to 'text' for Input fields
const getInputType = (element: ElementTemplate) => {
  return element.inputType || 'text'
}




</script>

<template>
  <!-- Render Input Preview -->
 <div class="flex flex-row gap-4 w-full items-center">
  <Checkbox
    class="border-gray-400"
    :model-value="false"
    :label="element.label"
    disabled
  />
  <span>{{ element.placeholder }}</span>
 </div>
  
</template>

<style scoped>
/* Ensure cursor-move is applied consistently */
button.cursor-move,
button.cursor-move * {
  cursor: move !important;
}
</style>