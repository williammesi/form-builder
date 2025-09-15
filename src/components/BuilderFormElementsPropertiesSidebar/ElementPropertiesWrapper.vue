
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
import type { Component } from 'vue';
import { computed } from 'vue';
import { useFormBuilderStore } from '@/stores/FormBuilderStore';

// Import specific property components
import InputElementProperties from './InputElementProperties.vue';
import SelectElementProperties from './SelectElementProperties.vue';

interface Props {
  element: FormElement;
}

defineProps<Props>();

const store = useFormBuilderStore();

// Component mapping for element-specific properties
const specificPropertiesMap: Record<string, Component> = {
  'input': InputElementProperties,
  'select': SelectElementProperties,
};

// Get the specific properties component for the current element type
const getSpecificPropertiesComponent = computed(() => (elementType: string) => {
  return specificPropertiesMap[elementType] || null;
});
</script>

<template>
  <!-- Common Properties (Label, Placeholder, Required) -->
  <SidebarGroup>
    <SidebarGroupLabel>Label</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <Input
            class="border-gray-400"
            :value="element.label"
            placeholder="Enter label"
            @input="store.updateSelectedElementProperty('label', $event.target.value)"
          />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>

  <SidebarGroup>
    <SidebarGroupLabel>Placeholder</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <Input
            class="border-gray-400"
            :value="element.placeholder"
            @input="store.updateSelectedElementProperty('placeholder', $event.target.value)"
            placeholder="Enter placeholder"
          />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>

  <SidebarGroup>
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
    v-if="getSpecificPropertiesComponent(element.type)"
    :is="getSpecificPropertiesComponent(element.type)"
    :element="element"
  />
</template>