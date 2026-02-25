<template>
  <div class="min-h-screen p-8 w-full">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-center text-gray-900 mb-8">{{ title }}</h1>
    </div>
    <hr class="text-gray-300 mb-5" >
    <div class="flex flex-wrap gap-5">
      <slot/>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
