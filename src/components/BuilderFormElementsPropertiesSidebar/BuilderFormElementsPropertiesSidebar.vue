<script setup lang="ts">
import { Settings } from "lucide-vue-next"
import {
  Sidebar,
  SidebarContent,

} from "@/components/ui/sidebar"

import SidebarHeader from "@/components/ui/sidebar/SidebarHeader.vue";
import ElementPropertiesWrapper from "./ElementPropertiesWrapper.vue";


import { useFormBuilderStore } from '@/stores/FormBuilderStore'

const store = useFormBuilderStore()



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
        <ElementPropertiesWrapper :element="store.selectedElement" />
      </template>
    </SidebarContent>
  </Sidebar>
</template>