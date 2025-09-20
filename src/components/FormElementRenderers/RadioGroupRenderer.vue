<!-- components/FormElementRenderers/RadioGroupRenderer.vue -->
<script setup lang="ts">
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import type { FormElement } from '@/types/form';
import { useAttrs } from 'vue';

interface Props {
  element: FormElement;
}

defineProps<Props>();
const attrs = useAttrs();
</script>

<template>
  <div class="flex flex-col w-full items-start">
    <div v-if="element.groupTitle" class="text-sm text-gray-600 mb-2">
      {{ element.groupTitle }}
    </div>

    <RadioGroup class="space-y-2 p-2" v-bind="attrs">
      <div
        v-for="(option, index) in element.options || []"
        :key="`${element.id}-radio-${index}`"
        class="flex items-center gap-2"
      >
        <RadioGroupItem
          :id="`${element.id}-radio-${index}`"
          :value="option"
        />
        <Label :for="`${element.id}-radio-${index}`" class="text-sm font-normal">{{ option }}</Label>
      </div>
    </RadioGroup>
  </div>
</template>