<template>
  <div class="w-full mx-auto p-6">
    <!-- Tab Navigation -->
    <div class="w-full border-b overflow-x-scroll border-gray-200" style="scrollbar-width: none">
      <nav class="flex space-x-8">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="[
            'py-2 px-1 border-b-2 min-w-20 font-medium text-sm transition-colors duration-200',
            activeTab === tab.id
              ? 'border-gray-900 text-gray-900'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
          ]"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </nav>
    </div>

    <!-- Tab Content -->
    <div class="mt-6 overflow-scroll" style="scrollbar-width: none">
      <!-- Tab 1: foryou Cards -->
      <div v-if="activeTab === 'foryou'" id="foryou" class="flex flex-wrap gap-6">
        <card-blog
          v-for="blog in forYouBlog"
          :id="blog.id"
          :key="blog.id"
          :picture-path="blog.picturePath"
          :path="blog.path"
          :reader="blog.totalRead"
          :title="blog.title"
          :like-total="blog.like"
          :desc="blog.description"
          :tags="blog.tags"
          :date-published="blog.datePublished"
        />
      </div>

      <!-- Tab 2: Analytics Cards -->
      <div v-if="activeTab === 'popular'" class="flex flex-wrap gap-6">
        <card-blog
          v-for="blog in popularBlog"
          :id="blog.id"
          :key="blog.id"
          :picture-path="blog.picturePath"
          :path="blog.path"
          :reader="blog.totalRead"
          :title="blog.title"
          :like-total="blog.like"
          :desc="blog.description"
          :tags="blog.tags"
          :date-published="blog.datePublished"
        />
      </div>

      <!-- Tab 3: Settings Cards -->
      <div v-if="activeTab === 'newblog'" class="flex flex-wrap gap-6">
        <card-blog
          v-for="blog in newBlog"
          :id="blog.id"
          :key="blog.id"
          :picture-path="blog.picturePath"
          :path="blog.path"
          :reader="blog.totalRead"
          :title="blog.title"
          :like-total="blog.like"
          :desc="blog.description"
          :tags="blog.tags"
          :date-published="blog.datePublished"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CardBlog from './CardBlog.vue'
import { getDataForYou, getPopularBlog, getNewBlog } from '@/lib/query'
import type { BlogStat } from '@/lib/types'

const forYouBlog = ref<BlogStat[] | null>([])
const popularBlog = ref<BlogStat[] | null>([])
const newBlog = ref<BlogStat[] | null>([])

async function fetchForYouBlog() {
  try {
    const data = await getDataForYou()
    forYouBlog.value = data
  } catch (err) {
    console.log(err)
  }
}

async function fetchPopularBlog() {
  try {
    const data = await getPopularBlog()
    popularBlog.value = data
  } catch (err) {
    console.log(err)
  }
}

async function fetchNewBlog() {
  try {
    const data = await getNewBlog()
    newBlog.value = data
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  fetchForYouBlog()
  fetchPopularBlog()
  fetchNewBlog()
})

const activeTab = ref('foryou')
const tabs = [
  { id: 'foryou', label: 'For You' },
  { id: 'popular', label: 'Popular' },
  { id: 'newblog', label: 'New blog' },
]
</script>
