<script setup lang="ts">
import { TextCursorInput, Mail, BetweenHorizontalStart } from "lucide-vue-next";
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
} from "@/components/ui/sidebar";
import type { FormElement, ElementTemplate } from '@/types/form';
import type { FunctionalComponent } from 'vue';
import Draggable from 'vuedraggable';
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { v4 as uuidv4 } from 'uuid';
import { useFormBuilderStore } from '@/stores/FormBuilderStore'

const store = useFormBuilderStore()
const iconMap: Record<string, FunctionalComponent> = {
  'Text Input': TextCursorInput,
  'Email Field': Mail,
  'Select Dropdown': BetweenHorizontalStart,
}

const elementTemplates: ElementTemplate[] = [
  {
    type: 'input',
    label: 'Input field' ,
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
];

const getIcon = (label: string) => iconMap[label]

const handleClick = (item: ElementTemplate) => {
  store.addElement(item)
}

const handleClone = (item: ElementTemplate): FormElement => {
  // Only create element data for dragging
  const newElement: FormElement = {
    id: uuidv4(),
    ...item
  }
  return newElement
};

// return input type or default to 'text' for Input fields
const getInputType = (element: ElementTemplate) => {
  return element.inputType || 'text'
}


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
              item-key="label"
              tag="div"
              :sort="false"
              
            >
              <template #item="{ element }">
                <SidebarMenuItem>
                  <SidebarMenuButton as-child>
                    <button
                      class="flex flex-col h-25 items-center w-full mb-2 text-left cursor-move border-2 border-gray-200"
                      
                      @click.stop="handleClick(element)"
                      draggable="true"
                      :aria-label="`Drag or click to add ${element.label}`"
                    >
                      <div class="flex items-center w-full">
                        <component :is="getIcon(element.label)" class="w-5 h-5 mr-2" />
                        <span>{{ element.label }}</span>
                      </div>
                      <div class="flex items-center justify-center w-full">
                        <!-- Render Input Preview -->
                        <Input
                          v-if="element.type === 'input'"
                          :type="getInputType(element)"
                          :placeholder="element.placeholder"
                          disabled
                          class="w-full cursor-move"
                        />
                        <!-- Render Select Preview -->
                        <Select
                          v-else-if="element.type === 'select'"
                          class="w-full cursor-move select-preview"
                          aria-disabled="true"
                          disabled
                        >
                          <SelectTrigger :disabled="true" class="w-full bg-gray-100 cursor-move select-preview">
                            <SelectValue :placeholder="element.placeholder" />
                          </SelectTrigger>
                        </Select>
                      </div>
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

<style scoped>
/* Style the select preview to mimic disabled appearance and prevent interaction */
.select-preview {
  pointer-events: none; /* Prevent select from capturing click events */
}

/* Ensure cursor-move is applied consistently on the parent button */
button.cursor-move,
button.cursor-move * {
  cursor: move !important; /* Override any default cursors */
}
</style>