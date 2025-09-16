<!-- components/BuilderFormElementsSidebar/RadioGroupElementPreview.vue -->
<script setup lang="ts">
import type { ElementTemplate } from '@/types/form';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Props {
  element: ElementTemplate;
}

defineProps<Props>();
</script>

<template>
  <RadioGroup :disabled="true" default-value="option-one" class="space-y-2">
    <div class="flex items-center space-x-2">
      <RadioGroupItem
        class="border border-gray-500"
        id="preview-radio-1"
        value="option-one"
      />
      <Label for="preview-radio-1" class="text-sm font-normal">Option 1</Label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem
        class="border border-gray-500"
        id="preview-radio-2"
        value="option-two"
      />
      <Label for="preview-radio-2" class="text-sm font-normal">Option 2</Label>
    </div>
  </RadioGroup>
</template>

<style scoped>
/* Ensure everything is draggable */
* {
  cursor: move !important;
}
</style>