<script setup lang="ts">
import {  Mail, Phone, TextCursorInput, BetweenHorizontalStart  } from "lucide-vue-next"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "./ui/sidebar"
import type { FormElement } from '../types/form';
import type { FunctionalComponent } from 'vue';
// Interface for sidebar items, extending FormElement without id
import { v4 as uuidv4 } from 'uuid';

interface SidebarFormElement extends Omit<FormElement, 'id'> {
  icon: FunctionalComponent;
}
const emit = defineEmits<{
       addElement: [payload: FormElement];
     }>();

// Form elements list
const items: SidebarFormElement[] = [
  {
    type: 'input',
    label: 'Text Input',
    placeholder: 'Enter text',
    icon: TextCursorInput,
  },
  {
    type: 'input',
    label: 'Email Field',
    placeholder: 'Enter email',
    icon: Mail,
  },
  {
    type: 'input',
    label: 'Phone Number Field',
    placeholder: 'Enter phone number',
    icon: Phone,
  },
  {
    type: 'select',
    label: 'Select Dropdown',
    placeholder: 'Select an option',
    icon: BetweenHorizontalStart,
  },
];

// Handle click to emit form element
     const handleClick = (item: SidebarFormElement) => {
       emit('addElement', {
         id: uuidv4(), // Generate unique ID
         type: item.type,
         label: item.label,
         placeholder: item.placeholder,
       });
     };
</script>

<template>
  <Sidebar side="left" variant="floating">
    <SidebarHeader class="p-4 font-medium text-center flex flex-row items-center justify-start" title="Properties" >
      <BetweenHorizontalStart class=" w-5 h-5" />
      <span>Form elements</span>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Form elements</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
              <SidebarMenuItem v-for="item in items" :key="item.label">
                <SidebarMenuButton asChild>
                    <button class="flex items-center w-full text-left" @click="handleClick(item)">
                      <component :is="item.icon" class="w-5 h-5 mr-2" />
                      <span>{{ item.label }}</span>
                    </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>