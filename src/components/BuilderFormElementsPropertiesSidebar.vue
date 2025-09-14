<script setup lang="ts">
import {  Mail, Phone, TextCursorInput, Settings } from "lucide-vue-next"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"
import {
  Input,
} from "./ui/input"
import SidebarHeader from "./ui/sidebar/SidebarHeader.vue";
import { inject, computed, type Ref } from "vue";
import type { FormElement } from '../types/form';

// Inject previewForm and selectedElementId from parent
const previewForm = inject('previewForm') as Ref<FormElement[]>;
const selectedElementId = inject('selectedElementId') as Ref<string | null>;

// Compute the selected element based on selectedElementId
const selectedElement = computed(() => {
  if (!selectedElementId.value) return null;
  return previewForm.value.find((element: FormElement) => element.id === selectedElementId.value) || null;
});

// Update label or placeholder reactively
const updateElementProperty = (property: 'label' | 'placeholder', value: string) => {
  if (selectedElement.value) {
    const index = previewForm.value.findIndex((e: FormElement) => e.id === selectedElementId.value);
    if (index !== -1) {
      previewForm.value[index] = { ...previewForm.value[index], [property]: value };
    }
  }
};

// Menu items.
const items = [
  {
    title: "Input field",
    url: "#",
    icon: TextCursorInput,
  },
  {
    title: "Email field",
    url: "#",
    icon: Mail,
  },
  {
    title: "Phone number field",
    url: "#",
    icon: Phone,
  },
 
];
</script>

<template>
  <Sidebar side="right" variant="floating">
    <SidebarHeader class="p-4 font-medium text-center flex flex-row items-center justify-start" title="Properties" >
      <Settings class=" w-5 h-5" />
      <span>Properties</span>
    </SidebarHeader>
    <SidebarContent>
      <div v-if="!selectedElement" class="p-4 text-gray-500">
        Select a form element to edit its properties
      </div>
      <template v-else>
        <SidebarGroup>
          <SidebarGroupLabel>Label</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Input
                  :value="selectedElement.label"
                  @input="updateElementProperty('label', $event.target.value)"
                  placeholder="Enter label"
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
                  :value="selectedElement.placeholder"
                  @input="updateElementProperty('placeholder', $event.target.value)"
                  placeholder="Enter placeholder"
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </template>
    </SidebarContent>
  </Sidebar>
</template>