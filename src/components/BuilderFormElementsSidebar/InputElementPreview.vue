<!-- components/BuilderFormElementsSidebar/InputElementPreview.vue -->
<script setup lang="ts">
import type { ElementTemplate } from '@/types/form';
import { Input } from "@/components/ui/input";
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
  <Input
    :type="getInputType(element)"
    :placeholder="element.placeholder"
    disabled
    class="w-full cursor-move"
  />
</template>

<style scoped>
/* Ensure cursor-move is applied consistently */
button.cursor-move,
button.cursor-move * {
  cursor: move !important;
}
</style>