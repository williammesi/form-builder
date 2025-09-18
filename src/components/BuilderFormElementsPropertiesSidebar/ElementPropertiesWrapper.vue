<!-- components/BuilderFormElementsPropertiesSidebar/ElementPropertiesWrapper.vue -->
<script setup lang="ts">
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import type { FormElement } from '@/types/form';
import { computed } from 'vue';
import { useFormBuilderStore } from '@/stores/FormBuilderStore';

// Import specific property components
import InputElementProperties from './InputElementProperties.vue';
import SelectElementProperties from './SelectElementProperties.vue';
import TextareaElementProperties from './TextareaElementProperties.vue';
import CheckboxGroupElementProperties from './CheckboxGroupElementProperties.vue';
import RadioGroupElementProperties from './RadioGroupElementProperties.vue';

interface Props {
  element: FormElement;
}

const props = defineProps<Props>();
const store = useFormBuilderStore();

// 🆕 Define which properties each element type supports
const elementPropertyConfig = {
  'input': {
    showLabel: true,
    showPlaceholder: true,
    showRequired: true,
    specificComponent: InputElementProperties
  },
  'textarea': {
    showLabel: true,
    showPlaceholder: true,
    showRequired: true,
    specificComponent: TextareaElementProperties
  },
  'select': {
    showLabel: true,
    showPlaceholder: true,
    showRequired: true,
    specificComponent: SelectElementProperties
  },
  'checkbox-group': {
    showLabel: true,
    showPlaceholder: false,
    showRequired: true,
    specificComponent: CheckboxGroupElementProperties
  },
  'radio-group': {
    showLabel: true,
    showPlaceholder: false,
    showRequired: true,
    specificComponent: RadioGroupElementProperties
  }
};

//  Get the configuration for the current element type
const currentConfig = computed(() => {
  return elementPropertyConfig[props.element.type as keyof typeof elementPropertyConfig] || {
    showLabel: true,
    showPlaceholder: true,
    showRequired: true,
    specificComponent: null
  };
});

// Get the specific properties component for the current element type
const getSpecificPropertiesComponent = computed(() => {
  return currentConfig.value.specificComponent || null;
});
</script>

<template>
  <!-- Label Property (shown for all elements) -->
  <SidebarGroup v-if="currentConfig.showLabel">
    <SidebarGroupLabel>Label</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <Input
            class="border-gray-400"
            :model-value="element.label"
            placeholder="Enter label"
            @update:model-value="store.updateSelectedElementProperty('label', $event)"
          />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>

  <!-- Placeholder Property (conditionally shown) -->
  <SidebarGroup v-if="currentConfig.showPlaceholder">
    <SidebarGroupLabel>Placeholder</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <Input
            class="border-gray-400"
            :model-value="element.placeholder"
            @update:model-value="store.updateSelectedElementProperty('placeholder', $event)"
            placeholder="Enter placeholder"
          />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>

  <!-- Required Property (shown for most elements) -->
  <SidebarGroup v-if="currentConfig.showRequired">
    <SidebarGroupLabel>Required</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <div class="p-2 flex items-center space-x-2">
            <Checkbox
              class="border-gray-400"
              :model-value="element.required"
              @update:model-value="store.updateSelectedElementProperty('required', $event)"
            />
            <span>This field can't be empty</span>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>

  <!-- Element-Specific Properties -->
  <component 
    v-if="getSpecificPropertiesComponent"
    :is="getSpecificPropertiesComponent"
    :element="element"
  />
</template>