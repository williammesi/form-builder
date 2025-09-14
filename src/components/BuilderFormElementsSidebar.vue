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
import { Input } from "./ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";

interface SidebarFormElement extends Omit<FormElement, 'id'> {
  icon: FunctionalComponent;
}

const emit = defineEmits<{
  addElement: [payload: FormElement];
  selectElement: [elementId: string];
}>();

const items: SidebarFormElement[] = [
  {
    type: 'input',
    label: 'Text Input',
    placeholder: 'Enter text',
    inputType: 'text',
    icon: TextCursorInput,
    required: true,
  },
  {
    type: 'input',
    label: 'Email Field',
    placeholder: 'Enter email',
    inputType: 'email',
    icon: Mail,
    required: true,
  },
  {
    type: 'select',
    label: 'Select Dropdown',
    placeholder: 'Select an option',
    icon: BetweenHorizontalStart,
    required: true,
    options: ["option1","option2","option3"]
  },
];

const createFormElement = (item: SidebarFormElement): FormElement => {
  const baseElement = {
    id: uuidv4(),
    type: item.type,
    label: item.label,
    placeholder: item.placeholder,
    required: true,
  };

  // Add type-specific properties with proper cloning
  if (item.type === 'input') {
    return {
      ...baseElement,
      inputType: item.inputType,
    };
  } else if (item.type === 'select') {
    return {
      ...baseElement,
      // Create a new array instance to avoid shared references
      options: item.options ? [...item.options] : [],
    };
  }

  return baseElement;
};

const handleClick = (item: SidebarFormElement) => {
  console.log('Clicked item:', item);
  const newElement = createFormElement(item);
  emit('addElement', newElement);
  // Emit a new event to select the element after adding
  emit('selectElement', newElement.id);
};

const handleClone = (item: SidebarFormElement): FormElement => {
  console.log('Cloning item:', item);
  return createFormElement(item);
};

const onDragStart = (event: DragEvent) => {
  console.log('Drag started from sidebar:', event);
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
                      class="flex flex-col h-25 items-center w-full mb-2 text-left cursor-move border-2 border-gray-200"
                      @click.stop="handleClick(element)"
                      draggable="true"
                      :aria-label="`Drag or click to add ${element.label}`"
                    >
                      <div class="flex items-center w-full">
                        <component :is="element.icon" class="w-5 h-5 mr-2" />
                        <span>{{ element.label }}</span>
                      </div>
                      <div class="flex items-center justify-center w-full">
                        <!-- Render Input Preview -->
                        <Input
                          v-if="element.type === 'input'"
                          :type="element.label.includes('Email') ? 'email' : element.label.includes('Phone') ? 'tel' : 'text'"
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