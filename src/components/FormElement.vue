<script setup lang="ts">
import { GripHorizontal, Trash } from 'lucide-vue-next';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { FormElement } from '@/types/form';
import { computed } from 'vue';
import { useFormBuilderStore } from '@/stores/FormBuilderStore'
const store = useFormBuilderStore()

interface Props {
  element: FormElement;
  
}

const isSelected = computed(() => store.selectedElementId === props.element.id)

const props = defineProps<Props>();


const getComponent = (type: FormElement['type']) => {
  switch (type) {
    case 'input':
      return Input;
    case 'select':
      return Select;
    default:
      return 'div';
  }
};

const handleSelect = () => {
  store.selectElement(props.element.id);
};

const handleDelete = () => {
  store.removeElement(props.element.id);
};
</script>

<template>
  <div
    class="mb-4 w-full flex gap-2 flex-row border-gray-200 border-0 p-4 rounded-lg form-element-item"
    :class="{ 'border-2 border-blue-500': isSelected }"
    @click="handleSelect"
    role="button"
    tabindex="0"
    @keydown.enter="handleSelect"
  >
    <div class="flex flex-col items-start w-8/10">
      <label class="block font-medium mb-1">{{ element.label }}</label>
      <component
        :is="getComponent(element.type)"
        v-bind="{
          placeholder: element.placeholder,
          ...(element.type === 'input' ? { type: element.inputType || 'text' } : {}),
        }"
        class="w-full"
      >
        <template v-if="element.type === 'select'">
          <SelectTrigger class="w-full">
            <SelectValue :placeholder="element.placeholder" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem 
              v-for="option in element.options || []" 
              :key="option" 
              :value="option"
            >
              {{ option }}
            </SelectItem>
          </SelectContent>
        </template>
      </component>
    </div>
    
    <div class="flex flex-row px-4 items-center gap-2 w-2/10 justify-center">
      <button
        class="p-2 rounded-lg bg-red-400 hover:bg-red-500 cursor-pointer"
        @click.stop="handleDelete"
      >
        <Trash class="w-5 h-5 text-gray-50 cursor-pointer" />
      </button>
      <button class="drag-handle">
        <GripHorizontal class="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-move" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.drag-handle {
  cursor: move;
}

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