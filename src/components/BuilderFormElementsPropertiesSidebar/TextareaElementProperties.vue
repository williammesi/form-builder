<!-- components/BuilderFormElementsPropertiesSidebar/TextareaElementProperties.vue -->
<script setup lang="ts">
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import type { FormElement } from '@/types/form';
import { useFormBuilderStore } from '@/stores/FormBuilderStore';

interface Props {
  element: FormElement;
}

defineProps<Props>();

const store = useFormBuilderStore();

// Helper function to handle number input updates
const handleRowsUpdate = (value: string | number) => {
  const numValue = typeof value === 'string' ? parseInt(value) || 3 : value || 3;
  store.updateSelectedElementProperty('rows', numValue);
};
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>Rows</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <Input
            type="number"
            class="border-gray-400"
            :model-value="element.rows || 3"
            min="1"
            max="20"
            placeholder="Number of rows"
            @update:model-value="handleRowsUpdate"
          />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>