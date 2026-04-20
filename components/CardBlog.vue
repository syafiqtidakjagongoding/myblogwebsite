<template>
  <RouterLink :to="path" class="cursor-pointer block" @click="handleClick">
    <div class="max-w-xs bg-white rounded-lg shadow-lg  overflow-hidden border border-gray-200">
      <!-- Header Image with Badge and Share Icon -->
      <div class="relative">
        <img :src="picturePath" :alt="picturePath" class="w-full h-48 object-cover" >
      </div>

      <!-- Card Content -->
      <div class="p-4">
        <!-- Course Title -->
        <div class="h-40">
        <h3 class="text-lg font-bold text-gray-900 mb-2">{{ title }}</h3>

        <!-- Course Description -->
        <p class="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-4">
          {{ desc }}
        </p>
        </div>
        <div class="w-full gap-2 flex">
          <div
            v-for="tag in tags"
            :key="tag"
            class="p-2 text-xs flex w-max rounded-full bg-gray-200"
          >
            {{ tag }}
          </div>
        </div>
        <!-- Course Details -->
        <div class="flex items-center justify-between mt-3 text-sm">
          <div class="flex items-center text-gray-600">
            <font-awesome-icon :icon="['fas', 'book-open']" size="xl" />
            <span>{{ reader }} read</span>
          </div>

          <div class="flex items-center">
            <font-awesome-icon :icon="['far', 'heart']" size="xl" :class="['text-gray-400']" />
            <span>{{ likeTotal }}</span>
          </div>
        </div>
        <p class="text-xs mt-1 text-gray-400 italic">Published on {{ formattedDate }}</p>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { incrementTotalReadByPath } from '@/lib/query'

// Define props
const props = defineProps<{
  id: number
  path: string
  reader: number
  likeTotal: number
  title: string
  tags: string[]
  picturePath: string
  desc: string
  datePublished: string | Date
}>()

async function handleClick() {
  await incrementTotalReadByPath(props.path)
}

const formattedDate = new Date(props.datePublished).toLocaleDateString('en-US', {
  month: 'long',
  day: '2-digit',
  year: 'numeric',
})
</script>
