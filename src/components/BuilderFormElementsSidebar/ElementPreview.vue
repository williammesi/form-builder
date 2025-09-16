<!-- components/BuilderFormElementsSidebar/ElementPreview.vue -->
<script setup lang="ts">
import type { ElementTemplate } from '@/types/form';
import type { FunctionalComponent } from 'vue';

interface Props {
  element: ElementTemplate;
  icon: FunctionalComponent;
}

defineProps<Props>();

// Events that the parent sidebar will handle
defineEmits<{
  click: [element: ElementTemplate];
}>();
</script>

<template>
  <button
    class=" flex flex-col min-h-30 items-center justify-center   w-full mb-2 text-left cursor-move border-2 border-gray-200"
    @click.stop="$emit('click', element)"
    draggable="true"
    :aria-label="`Drag or click to add ${element.label}`"
  >
    <!-- Common header with icon and label -->
    <div class="flex items-center mb-2 w-full">
      <component :is="icon" class="w-5 h-5 mr-2" />
      <span>{{ element.label }}</span>
    </div>
    
    <!-- Slot for specific field preview -->
    <div class="flex flex-col items-start justify-center w-full">
      <slot :element="element" />
    </div>
  </button>
</template>

<style scoped>
/* Ensure cursor-move is applied consistently */
button.cursor-move,
button.cursor-move * {
  cursor: move !important;
}
</style>