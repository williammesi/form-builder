<script setup lang="ts">
import { SidebarProvider } from "../components/ui/sidebar";
import BuilderFormElementsSidebar from "@/components/BuilderFormElementsSidebar.vue";
import BuilderFormElementsPropertiesSidebar from "@/components/BuilderFormElementsPropertiesSidebar.vue";
</script>

<template>
  
    <SidebarProvider>
      <BuilderFormElementsSidebar />
      <BuilderFormElementsPropertiesSidebar />
      <main>
        <slot />
      </main>
    </SidebarProvider>
</template>

<style scoped>

</style>