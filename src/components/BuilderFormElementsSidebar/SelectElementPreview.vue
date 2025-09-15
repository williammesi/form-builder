<!-- components/BuilderFormElementsSidebar/SelectElementPreview.vue -->
<script setup lang="ts">
import type { ElementTemplate } from '@/types/form';
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  element: ElementTemplate;
}

defineProps<Props>();






</script>

<template>
  <!-- Render Select Preview -->
  <Select
    class="w-full cursor-move select-preview"
    aria-disabled="true"
    disabled
  >
    <SelectTrigger :disabled="true" class="w-full bg-gray-100 cursor-move select-preview">
      <SelectValue :placeholder="element.placeholder" />
    </SelectTrigger>
  </Select>
</template>

<style scoped>
/* Ensure cursor-move is applied consistently */
button.cursor-move,
button.cursor-move * {
  cursor: move !important;
}
</style>