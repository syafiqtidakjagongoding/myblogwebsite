<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<template>
  <nav class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex w-full justify-between items-center h-16">
        <RouterLink to="/" class="flex items-center justify-center">
          <span class="md:text-xl text-lg font-bold text-blue-900">MyBlog</span>
        </RouterLink>
        <div class="hidden md:flex items-center justify-between space-x-8">
          <RouterLink to="/" class="group">
            <span class="text-md text-gray-600 group-hover:text-blue-600 transition duration-200">Home</span>
          </RouterLink>
          <RouterLink to="/blog/tech" class="group">
            <span class="text-md text-gray-600 group-hover:text-blue-600 transition duration-200">Tech</span>
          </RouterLink>
          <RouterLink to="/blog/education" class="group">
            <span class="text-md text-gray-600 group-hover:text-blue-600 transition duration-200">Education</span>
          </RouterLink>
          <RouterLink to="/blog/finance" class="group">
            <span class="text-md text-gray-600 group-hover:text-blue-600 transition duration-200">Finance</span>
          </RouterLink>
          <RouterLink to="/blog/politic" class="group">
            <span class="text-md text-gray-600 group-hover:text-blue-600 transition duration-200">Politic</span>
          </RouterLink>
        </div>

        <div class="flex gap-2 md:mt-0 md:mb-1 mt-2 justify-center items-center">
          <div class="md:hidden block">
            <Button variant="ghost" size="sm" class="" @click="isOpen = !isOpen">
              <font-awesome-icon :icon="['fas', 'bars']" size="xl" class="text-gray-700" />
            </Button>
          </div>
        </div>
      </div>

      <div v-if="isOpen" class="md:hidden border-t border-gray-200">
        <div class="flex flex-col font-medium mb-2 pt-3 items-start justify-between space-y-3">
          <RouterLink to="/" class="w-full">
            <span class="text-md text-gray-600 hover:text-blue-600 transition duration-200">Home</span>
          </RouterLink>
          <RouterLink to="/blog/tech" class="w-full">
            <span class="text-md text-gray-600 hover:text-blue-600 transition duration-200">Tech</span>
          </RouterLink>
          <RouterLink to="/blog/education" class="w-full">
            <span class="text-md w-full text-gray-600 hover:text-blue-600 transition duration-200">Education</span>
          </RouterLink>
          <RouterLink to="/blog/finance" class="w-full">
            <span class="text-md text-gray-600 hover:text-blue-600 transition duration-200">Finance</span>
          </RouterLink>
          <RouterLink to="/blog/politic" class="w-full">
            <span class="text-md text-gray-600 hover:text-blue-600 transition duration-200">Politic</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
