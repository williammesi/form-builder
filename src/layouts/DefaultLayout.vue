<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-blue-500 text-white p-4">
      <ul class="flex space-x-4">
        <li><router-link to="/" class="hover:underline">Home</router-link></li>
        <li><router-link to="/test" class="hover:underline">Test</router-link></li>
      </ul>
    </nav>
    <main class="container mx-auto p-4">
      <router-view /> <!-- Changed from <slot /> to <router-view /> -->
    </main>
    <footer class="bg-gray-800 text-white p-4 text-center">
      © 2025 Form Builder
    </footer>
  </div>
</template>

<script setup>
// No logic needed for the layout
</script>

<style scoped>
/* Optional: Layout-specific styles */
</style>