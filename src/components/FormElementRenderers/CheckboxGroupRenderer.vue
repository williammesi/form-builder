<!-- components/FormElementRenderers/CheckboxGroupRenderer.vue -->
<script setup lang="ts">
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { FormElement } from '@/types/form';

interface Props {
  element: FormElement;
}

defineProps<Props>();
</script>

<template>
  <div class="flex flex-col w-8/10">
    <label class="block font-medium mb-1">{{ element.label }}</label>
    <div v-if="element.groupTitle" class="text-sm text-gray-600 mb-2">
      {{ element.groupTitle }}
    </div>

    <div class="space-y-2 p-2">
      <div
        v-for="(option, index) in element.options || []"
        :key="`${element.id}-checkbox-${index}`"
        class="flex items-center gap-2"
      >
        <Checkbox :id="`${element.id}-checkbox-${index}`" />
        <Label :for="`${element.id}-checkbox-${index}`" class="text-sm font-normal">{{ option }}</Label>
      </div>
    </div>
  </div>
</template>