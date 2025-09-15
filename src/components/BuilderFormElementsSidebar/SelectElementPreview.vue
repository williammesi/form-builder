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
  <!-- Render Select Preview with drag overlay -->
  <div class="relative w-full">
    <Select
      class="w-full select-preview"
      aria-disabled="true"
      disabled
    >
      <SelectTrigger :disabled="true" class="w-full bg-gray-100 select-preview">
        <SelectValue :placeholder="element.placeholder" />
      </SelectTrigger>
    </Select>
    <!-- Invisible overlay to capture drag events -->
    <div class="absolute inset-0 cursor-move" style="pointer-events: all;"></div>
  </div>
</template>

<style scoped>
/* Disable pointer events on the select itself */
.select-preview {
  pointer-events: none;
}

/* Ensure the overlay captures all mouse events */
.absolute.inset-0 {
  z-index: 1;
}
</style>