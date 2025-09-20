<!-- components/FormElementRenderers/BlockElementRenderer.vue -->
<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { FormElement } from '@/types/form';
import { computed } from 'vue';

interface Props {
  element: FormElement;
}

const props = defineProps<Props>();

// Component configurations for each element type
const ELEMENT_COMPONENT_CONFIG = {
  input: (element: FormElement) => ({
    component: Input,
    props: {
      placeholder: element.placeholder,
      type: element.inputType || 'text'
    }
  }),
  select: (element: FormElement) => ({
    component: Select,
    props: { placeholder: element.placeholder }
  }),
  textarea: (element: FormElement) => ({
    component: Textarea,
    props: {
      placeholder: element.placeholder,
      rows: element.rows || 3,
      class: 'border border-gray-300 rounded-md p-2 resize-none'
    }
  })
} as const

// Determine which component to render based on element type
const elementConfig = computed(() => {
  const configFn = ELEMENT_COMPONENT_CONFIG[props.element.type as keyof typeof ELEMENT_COMPONENT_CONFIG]
  return configFn ? configFn(props.element) : {
    component: 'div',
    props: { placeholder: props.element.placeholder }
  }
})
</script>

<template>
  <div class="flex flex-col items-start w-full">
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
</template>