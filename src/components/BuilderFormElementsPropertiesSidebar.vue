<script setup lang="ts">
import { Settings, Plus, X } from "lucide-vue-next"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Input,
} from "@/components/ui/input"
import SidebarHeader from "@/components/ui/sidebar/SidebarHeader.vue";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {Checkbox} from "@/components/ui/checkbox";

import { useFormBuilderStore } from '@/stores/FormBuilderStore'

const store = useFormBuilderStore()

import { useEditableList } from '@/composables/useEditableList'

// // Handle option updates for select elements
// Use the composable - pass in how to save values
const { startEditing, updateEditingValue, finishEditing, getDisplayValue } = 
  useEditableList((index, value) => store.updateOption(index, value))
</script>

<template>
  <Sidebar side="right" variant="floating">
    <SidebarHeader class="p-4 font-medium text-center flex flex-row items-center justify-start" title="Properties" >
      <Settings class=" w-5 h-5" />
      <span>Properties</span>
    </SidebarHeader>
    <SidebarContent>
      <div v-if="!store.selectedElement" class="p-4 text-gray-500">
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
                  :value="store.selectedElement.label"
                  placeholder="Enter label"
                  @input="store.updateSelectedElementProperty('label', $event.target.value)"
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
                  :value="store.selectedElement.placeholder"
                  @input="store.updateSelectedElementProperty('placeholder', $event.target.value)"
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
                    :model-value="store.selectedElement.required"
                    @update:model-value="store.updateSelectedElementProperty('required', $event)"
                  />
                  <span>This field can't be empty</span> 
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup v-if="store.selectedElement?.type === 'select'">
          <div class="flex flex-row gap-2">
          <SidebarGroupLabel>Dropdown options</SidebarGroupLabel>
          <button class="cursor-pointer" @click="store.addOption()"><Plus class="w-4 h-4" /></button>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <div class="space-y-2">
                  <div 
                    v-for="(option, index) in store.selectedElement.options ?? []"
                    :key="`row-${store.selectedElement.id}-${index}`"
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
        <SidebarGroup v-if="store.selectedElement?.type === 'input'">
          <SidebarGroupLabel>Input Type</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Select 
                  :model-value="store.selectedElement.inputType || 'text'"
                  @update:model-value="store.updateSelectedElementProperty('inputType', $event)"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select input type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="password">Password</SelectItem>
                  </SelectContent>
                </Select>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </template>
    </SidebarContent>
  </Sidebar>
</template>