<script setup lang="ts">
import { Mail, Phone, TextCursorInput, Settings } from "lucide-vue-next"
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
import {Checkbox} from "./ui/checkbox";

// Inject previewForm and selectedElementId from parent
const previewForm = inject('previewForm') as Ref<FormElement[]>;
const selectedElementId = inject('selectedElementId') as Ref<string | null>;

// Compute the selected element based on selectedElementId
const selectedElement = computed(() => {
  if (!selectedElementId.value) return null;
  return previewForm.value.find((element: FormElement) => element.id === selectedElementId.value) || null;
});

// Update label or placeholder reactively
const updateElementProperty = (property: 'label' | 'placeholder' | 'required' | 'options', value: string | boolean | string[]) => {
  if (selectedElement.value) {
    const index = previewForm.value.findIndex((e: FormElement) => e.id === selectedElementId.value);
    if (index !== -1) {
      previewForm.value[index] = { ...previewForm.value[index], [property]: value };
    }
  }
};

// Handle required checkbox toggle
const updateRequired = (checked: boolean | 'indeterminate') => {
  const booleanValue = checked === true;
  updateElementProperty('required', booleanValue);
};

// Handle option updates for select elements
const updateOption = (optionIndex: number, newValue: string | number) => {
  if (selectedElement.value && selectedElement.value.options) {
    const updatedOptions = [...selectedElement.value.options];
    
    updatedOptions[optionIndex] = String(newValue);
    updateElementProperty('options', updatedOptions);
  }
};
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
                  class="border-gray-400"
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
                  class="border-gray-400"
                  :value="selectedElement.placeholder"
                  @input="updateElementProperty('placeholder', $event.target.value)"
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
                    class=" border-gray-400"
                    :model-value="selectedElement.required"
                    @update:model-value="updateRequired"
                  />
                  <span>This field can't be empty</span> 
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup v-if="selectedElement?.type === 'select'" :key="`options-group-${selectedElement.id}`">
          <SidebarGroupLabel>Dropdown options</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu :key="`options-menu-${selectedElement.id}`">
              <SidebarMenuItem 
                v-for="(option, index) in selectedElement.options ?? []" 
                :key="`${selectedElement.id}-option-${index}-${option}`"
              >
                <div class="flex items-center space-x-2">
                  <Input
                    class="border-gray-400 flex-1"
                    :model-value="option"
                    @update:model-value="updateOption(index, $event)"
                    :placeholder="`Option ${index + 1}`"
                  />
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </template>
    </SidebarContent>
  </Sidebar>
</template>