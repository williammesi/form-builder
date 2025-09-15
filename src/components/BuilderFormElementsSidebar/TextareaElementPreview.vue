<!-- components/BuilderFormElementsSidebar/InputElementPreview.vue -->
<script setup lang="ts">
import type { ElementTemplate } from '@/types/form';
import { Textarea } from '../ui/textarea';
interface Props {
  element: ElementTemplate;
}

defineProps<Props>();



</script>

<template>
  <!-- Render Textarea Preview -->
  <Textarea
    :rows="2"
    :placeholder="element.placeholder"
    disabled
    class="w-full cursor-move border border-gray-300 rounded-md p-2 resize-none"
  />
</template>

<style scoped>
/* Ensure cursor-move is applied consistently */
button.cursor-move,
button.cursor-move * {
  cursor: move !important;
}
</style>