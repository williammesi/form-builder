


<!-- components/BuilderFormElementsPropertiesSidebar/ElementPropertiesWrapper.vue -->
<script setup lang="ts">
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import type { FormElement } from '@/types/form';

import { useFormBuilderStore } from '@/stores/FormBuilderStore';
import { Input } from "@/components/ui/input";
 

interface Props {
  element: FormElement;
}

defineProps<Props>();

const store = useFormBuilderStore();

import { useEditableList } from '@/composables/useEditableList'

// // Handle option updates for select elements
// Use the composable - pass in how to save values
const { startEditing, updateEditingValue, finishEditing, getDisplayValue } = 
  useEditableList((index, value) => store.updateOption(index, value))
</script>

<template>
  <SidebarGroup>
    <div class="flex flex-row gap-2">
    <SidebarGroupLabel>Dropdown options</SidebarGroupLabel>
    <button class="cursor-pointer" @click="store.addOption()"><Plus class="w-4 h-4" /></button>
    </div>
    <SidebarGroupContent>
    <SidebarMenu>
        <SidebarMenuItem>
        <div class="space-y-2">
            <div 
            v-for="(option, index) in element.options ?? []"
            :key="`row-${element.id}-${index}`"
            class="flex flex-row gap-2 items-center"
            >
            <Input 
            
            class="border-gray-400"
            :model-value="getDisplayValue(index, option)"
            @focus="startEditing(index, option)"
            @blur="finishEditing(index)"
            @update:model-value="updateEditingValue(index, $event)"
            :placeholder="`Option ${index + 1}`"
            />
            <button class="cursor-pointer text-red-400 hover:text-red-600"  @click="store.removeOption(index)"><X class="w-4 h-4" /></button>
            </div>
        </div>
        </SidebarMenuItem>
    </SidebarMenu>
    </SidebarGroupContent>
    </SidebarGroup>
</template>