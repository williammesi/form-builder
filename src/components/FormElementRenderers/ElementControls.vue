<!-- components/FormElementRenderers/ElementControls.vue -->
<script setup lang="ts">
import { GripHorizontal, Trash } from 'lucide-vue-next';
import { useFormBuilderStore } from '@/stores/FormBuilderStore';

interface Props {
  elementId: string;
}

const props = defineProps<Props>();
const store = useFormBuilderStore();
</script>

<template>
  <div class="flex flex-row px-4 items-center gap-2 w-2/10 justify-center">
    <button
      class="p-2 rounded-lg bg-red-400 hover:bg-red-500 transition-colors"
      @click.stop="store.removeElement(props.elementId)"
      aria-label="Delete element"
    >
      <Trash class="w-5 h-5 text-gray-50" />
    </button>
    <button class="drag-handle" aria-label="Drag element">
      <GripHorizontal class="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-move" />
    </button>
  </div>
</template>

<style scoped>
.drag-handle {
  cursor: move;
}
</style>