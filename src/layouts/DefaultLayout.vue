<template>
  <div class="min-h-screen bg-gray-100">
    <nav
      class="fixed top-0 left-0 right-0 bg-gray-50 border-b-2 border-gray-200 text-gray-900 h-16 z-50"
    >
      <ul class="flex h-full items-center justify-center space-x-4">
        <li>
          <router-link to="/" class="hover:underline">Form builder</router-link>
        </li>
        <li>
          <router-link to="/form-renderer" class="hover:underline"
            >Form renderer</router-link
          >
        </li>
      </ul>
    </nav>
    <main class="w-full pt-16">
      <!-- Add padding-top to account for navbar height -->
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
