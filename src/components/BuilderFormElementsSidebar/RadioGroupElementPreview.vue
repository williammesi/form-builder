<!-- components/BuilderFormElementsSidebar/CheckboxGroupElementPreview.vue -->
<script setup lang="ts">
import type { ElementTemplate } from '@/types/form';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Props {
  element: ElementTemplate;
}

defineProps<Props>();
</script>

<template>
 <RadioGroup  :disabled="true" default-value="option-one">
    <div class="flex flex-row  space-x-2">
      <RadioGroupItem class=" border border-gray-500 " id="option-one" value="option-one" />
      <Label for="option-one">Option 1</Label>
    </div>
    <div class="flex flex-row justify-items-start space-x-2">
      <RadioGroupItem class=" border border-gray-500 " id="option-two" value="option-two" />
      <Label for="option-two">Option 2</Label>
    </div>
  </RadioGroup>
</template>

<style scoped>
/* Ensure everything is draggable */
* {
  cursor: move !important;
}
</style>