<script setup lang="ts">
import { TextCursorInput, Mail, Phone, BetweenHorizontalStart } from "lucide-vue-next";
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
} from "./ui/sidebar";
import type { FormElement } from '../types/form';
import type { FunctionalComponent } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import Draggable from 'vuedraggable';

interface SidebarFormElement extends Omit<FormElement, 'id'> {
  icon: FunctionalComponent;
}

const emit = defineEmits<{
  addElement: [payload: FormElement];
}>();

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

const handleClick = (item: SidebarFormElement) => {
  console.log('Clicked item:', item); // Debug click
  emit('addElement', {
    id: uuidv4(),
    type: item.type,
    label: item.label,
    placeholder: item.placeholder,
  });
};

const handleClone = (item: SidebarFormElement): FormElement => {
  console.log('Cloning item:', item); // Debug clone
  return {
    id: uuidv4(),
    type: item.type,
    label: item.label,
    placeholder: item.placeholder,
  };
};

const onDragStart = (event: any) => {
  console.log('Drag started from sidebar:', event); // Debug drag
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
              :list="items"
              :group="{ name: 'form-elements', pull: 'clone', put: false }"
              :clone="handleClone"
              item-key="label"
              tag="div"
              :sort="false"
              @start="onDragStart"
            >
              <template #item="{ element }">
                <SidebarMenuItem>
                  <SidebarMenuButton as-child>
                    <button
                      class="flex items-center w-full text-left cursor-move"
                      @click.stop="handleClick(element)"
                      draggable="true"
                      :aria-label="`Drag or click to add ${element.label}`"
                    >
                      <component :is="element.icon" class="w-5 h-5 mr-2" />
                      <span>{{ element.label }}</span>
                    </button>
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