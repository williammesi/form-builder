<script setup lang="ts">
import { GripHorizontal, Trash } from 'lucide-vue-next';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import type { FormElement } from '@/types/form';
import { computed } from 'vue';
import { useFormBuilderStore } from '@/stores/FormBuilderStore'

const store = useFormBuilderStore()

interface Props {
  element: FormElement;
}

const props = defineProps<Props>();

const isSelected = computed(() => store.selectedElementId === props.element.id)

// Helper to determine if element should use inline layout (like checkbox)
const isInlineElement = computed(() => {
  return ['checkbox'].includes(props.element.type)
})

// Determine which component to render based on element type
const elementConfig = computed(() => {
  const baseProps = {
    placeholder: props.element.placeholder
  }
  
  switch (props.element.type) {
    case 'input':
      return {
        component: Input,
        props: {
          ...baseProps,
          type: props.element.inputType || 'text'
        }
      }
    case 'select':
      return {
        component: Select,
        props: baseProps
      }
    case 'textarea':
      return {
        component: Textarea,
        props: {
          ...baseProps,
          rows: props.element.rows || 3,
          class: 'border border-gray-300 rounded-md p-2'
        }
      }
    case 'checkbox':
      return {
        component: Checkbox,
        props: baseProps
      }
    default:
      return {
        component: 'div',
        props: baseProps
      }
  }
})
</script>

<template>
  <div
    class="mb-4 w-full flex gap-2 flex-row border-gray-200 border-0 p-4 rounded-lg form-element-item"
    :class="{ 'border-2 border-blue-500': isSelected }"
    @click="store.selectElement(props.element.id)"
    role="button"
    tabindex="0"
    @keydown.enter="store.selectElement(props.element.id)"
  >
    <!-- Conditional layout based on element type -->
    
    <!-- Inline layout for checkbox, radio, etc. -->
    <div v-if="isInlineElement" class="flex items-center gap-3 w-8/10">
      <component
        :is="elementConfig.component"
        v-bind="elementConfig.props"
      />
      <label class="font-medium cursor-pointer" @click.stop="() => {}">
        {{ element.label }}
      </label>
    </div>
    
    <!-- Block layout for input, textarea, select, etc. -->
    <div v-else class="flex flex-col items-start w-8/10">
      <label class="block font-medium mb-1">{{ element.label }}</label>
      <component
        :is="elementConfig.component"
        v-bind="elementConfig.props"
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
    
    <!-- Controls (same for all elements) -->
    <div class="flex flex-row px-4 items-center gap-2 w-2/10 justify-center">
      <button
        class="p-2 rounded-lg bg-red-400 hover:bg-red-500 cursor-pointer"
        @click.stop="store.removeElement(props.element.id)"
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