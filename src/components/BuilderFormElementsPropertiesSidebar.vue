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
    <SidebarHeader class=" font-medium text-center flex flex-row items-center justify-start" title="Properties" >
      <Settings class=" w-5 h-5" />
      <span>Properties</span>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Label</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
              <SidebarMenuItem>
                <Input placeholder="Label" />
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Placeholder</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
              <SidebarMenuItem>
                <Input placeholder="Placeholder" />
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>