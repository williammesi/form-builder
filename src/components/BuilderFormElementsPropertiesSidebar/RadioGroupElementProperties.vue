<!-- components/BuilderFormElementsPropertiesSidebar/RadioGroupElementProperties.vue -->
<script setup lang="ts">
import { Plus, X } from "lucide-vue-next";
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
import { useEditableList } from '@/composables/useEditableList';

interface Props {
  element: FormElement;
}

defineProps<Props>();

const store = useFormBuilderStore();

// Reuse the same editable list pattern as other element properties
const { startEditing, updateEditingValue, finishEditing, getDisplayValue } =
  useEditableList((index, value) => store.updateOption(index, value));
</script>

<template>
  <!-- Group Title (optional subtitle) -->
  <SidebarGroup>
    <SidebarGroupLabel>Group Title (Optional)</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <Input
            class="border-gray-400"
            :value="element.groupTitle || ''"
            placeholder="e.g., 'Choose one option:'"
            @input="store.updateSelectedElementProperty('groupTitle', $event.target.value)"
          />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>

  <!-- Radio Options -->
  <SidebarGroup>
    <div class="flex flex-row gap-2 items-center">
      <SidebarGroupLabel>Radio options</SidebarGroupLabel>
      <button
        class="cursor-pointer hover:bg-gray-100 p-1 rounded"
        @click="store.addOption()"
        title="Add option"
      >
        <Plus class="w-4 h-4" />
      </button>
    </div>
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <div class="space-y-2">
            <div
              v-for="(option, index) in element.options ?? []"
              :key="`radio-row-${element.id}-${index}`"
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
              <button
                class="cursor-pointer text-red-400 hover:text-red-600"
                @click="store.removeOption(index)"
              >
                <X class="w-4 h-4" />
              </button>
            </div>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>