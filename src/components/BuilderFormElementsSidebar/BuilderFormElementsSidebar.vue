<script setup lang="ts">
import { TextCursorInput, BetweenHorizontalStart, Scan, Check, CircleDot } from "lucide-vue-next";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from "@/components/ui/sidebar";
import type { FormElement, ElementTemplate } from '@/types/form';
import type { FunctionalComponent, Component } from 'vue';
import Draggable from 'vuedraggable';
import { v4 as uuidv4 } from 'uuid';
import { useFormBuilderStore } from '@/stores/FormBuilderStore';
import { computed } from 'vue';

// Import our modular components
import { 
  ElementPreview, 
  InputElementPreview, 
  SelectElementPreview ,
  TextareaElementPreview,
  CheckboxGroupElementPreview,
  RadioGroupElementPreview,
} from '@/components/BuilderFormElementsSidebar';

const store = useFormBuilderStore();

// Icon mapping
// Map form element types to their corresponding icons
// Maintaining steps :
// 1. Choose icons from lucide-vue-next (or any other icon library)
// 2. Import them here
// 3. Map them in the iconMap object to their element type
const iconMap: Record<string, FunctionalComponent> = {
  'input': TextCursorInput,
  'select': BetweenHorizontalStart,
  'textarea': Scan,
  'radio-group': CircleDot,
  'checkbox-group': Check,
};

// Map element types to their preview components
// Maintaining steps :
// 1. Create individual preview components (e.g., InputElementPreview.vue, SelectElementPreview.vue)
// 2. Import them here
// 3. Map them in the componentMap object
const componentMap: Record<string, Component> = {
  'input': InputElementPreview,
  'select': SelectElementPreview,
  'textarea': TextareaElementPreview,
  'checkbox-group': CheckboxGroupElementPreview,
  'radio-group': RadioGroupElementPreview,

};

// Element templates
// Define the available form element templates, and provide defaults properties
// This can be extended to include more element types as needed
// Maintaining steps :
// 1. Define the element template here
// 2. Ensure the corresponding preview component and icon are set up above
const elementTemplates: ElementTemplate[] = [
  {
    type: 'input',
    label: 'Input field',
    placeholder: 'Enter text',
    inputType: 'text',
    required: true,
  },
  {
    type: 'select',
    label: 'Select Dropdown',
    placeholder: 'Select an option',
    required: true,
    options: ["option1", "option2", "option3"]
  },
  {
    type: 'textarea',
    label: 'Text Area',
    placeholder: 'Enter multiple lines of text',
    required: false,
    rows: 3
  },

  {
    type: 'checkbox-group',
    label: 'Checkbox',
    required: false,
    options: ["Option 1", "Option 2", "Option 3"]
  },
  {
    type: 'radio-group',
    label: 'Radio Group',
    required: false,
    options: ["Option 1", "Option 2", "Option 3"]
  }

];

// Computed property to get the preview component based on element type
const getPreviewComponent = computed(() => (elementType: string) => {
  return componentMap[elementType] || 'div'; // fallback to div
});

// Function to get icon component based on element type
const getIcon = (type: string) => iconMap[type];

// Handle click to add element to the form builder
const handleClick = (item: ElementTemplate) => {
  store.addElement(item);
};

// Clone function for draggable
// This function is called when an item is dragged from the sidebar to the form area
// It creates a new instance of the form element with a unique ID
const handleClone = (item: ElementTemplate): FormElement => {
  const newElement: FormElement = {
    id: uuidv4(),
    ...item
  };
  return newElement;
};
</script>

<template>
  <Sidebar side="left" variant="floating">
    <SidebarHeader class="p-4 font-medium text-center flex flex-row items-center justify-start" title="Form Elements">
      <BetweenHorizontalStart class="w-5 h-5" />
      <span>Form Elements</span>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Form Elements</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <Draggable
              :list="elementTemplates"
              :group="{ name: 'form-elements', pull: 'clone', put: false }"
              :clone="handleClone"
              item-key="type"
              tag="div"
              :sort="false"
            >
              <template #item="{ element }">
                <SidebarMenuItem>
                  <SidebarMenuButton as-child>
                    <!-- Element preview, default wrapper -->
                    <ElementPreview
                      :element="element"
                      :icon="getIcon(element.type)"
                      @click="handleClick"
                    >
                      <!-- Dynamic component based on type -->
                      <component 
                        :is="getPreviewComponent(element.type)"
                        :element="element"
                      />
                    </ElementPreview>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </template>
            </Draggable>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>

<style scoped>
/* Clean styles - complexity moved to child components */
</style>