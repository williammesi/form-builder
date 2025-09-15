<!-- components/BuilderFormElementsSidebar/CheckboxGroupElementPreview.vue -->
<script setup lang="ts">
import type { ElementTemplate } from '@/types/form';
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  element: ElementTemplate;
}

defineProps<Props>();
</script>

<template>
  <div class="flex flex-row gap-4 w-full items-center">
  <Checkbox
    class="border-gray-400"
    :model-value="false"
    :label="element.label"
    disabled
  />
  <span>Option 1</span>
 </div>
</template>

<style scoped>
/* Ensure everything is draggable */
* {
  cursor: move !important;
}
</style>