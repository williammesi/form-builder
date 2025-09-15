

<!-- components/BuilderFormElementsPropertiesSidebar/ElementPropertiesWrapper.vue -->
<script setup lang="ts">
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

import type { FormElement } from '@/types/form';

import { useFormBuilderStore } from '@/stores/FormBuilderStore';



interface Props {
  element: FormElement;
}

defineProps<Props>();

const store = useFormBuilderStore();


</script>

<template>
  <SidebarGroup>
          <SidebarGroupLabel>Input Type</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Select 
                  :model-value="element.inputType || 'text'"
                  @update:model-value="store.updateSelectedElementProperty('inputType', $event)"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select input type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="password">Password</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                  </SelectContent>
                </Select>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
</template>