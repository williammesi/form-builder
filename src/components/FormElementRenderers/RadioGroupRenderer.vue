<!-- components/FormElementRenderers/RadioGroupRenderer.vue -->
<script setup lang="ts">
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

    <RadioGroup class="space-y-2 p-2">
      <div
        v-for="(option, index) in element.options || []"
        :key="`${element.id}-radio-${index}`"
        class="flex items-center gap-2"
      >
        <RadioGroupItem
          :id="`${element.id}-radio-${index}`"
          :value="`option-${index}`"
        />
        <Label :for="`${element.id}-radio-${index}`" class="text-sm font-normal">{{ option }}</Label>
      </div>
    </RadioGroup>
  </div>
</template>