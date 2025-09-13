<script setup lang="ts">
import {  Mail, Phone, TextCursorInput } from "lucide-vue-next"
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
  <Sidebar side="left" variant="floating">
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Form elements</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
              <SidebarMenuItem v-for="item in items" :key="item.title">
                <SidebarMenuButton asChild>
                    <a :href="item.url">
                      <component :is="item.icon" />
                      <span>{{item.title}}</span>
                    </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>