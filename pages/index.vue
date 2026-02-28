<script setup lang="ts">
import CategoryTabs from '@/components/CategoryTabs.vue'
import { getTotalArticle, getTotalLike, getTotalReader } from '@/lib/query'
import { onMounted, ref } from 'vue'

const config = useRuntimeConfig()

useHead({
  title: 'Syafiq Blog',
  link: [
    {
      rel: 'canonical',
      href: `${config.public.baseUrl}`,
    },
  ],
  meta: [
    {
      name: 'description',
      content: 'This is a home',
    },
  ],
})

const totalArticle = ref<number | null>(0)
const totalReader = ref<number | null>(0)
const totalLike = ref<number | null>(0)

async function totalArticleFn() {
  const result = await getTotalArticle()
  totalArticle.value = result
}

async function totalReaderFn() {
  const result = await getTotalReader()
  totalReader.value = result
}

async function totalLikes() {
  const result = await getTotalLike()
  totalLike.value = result
}

onMounted(() => {
  totalArticleFn()
  totalReaderFn()
  totalLikes()
})
</script>

<template>
  <div>
    <!-- Welcome Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 w-full">
      <!-- Decorative elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style="animation-delay: 2s;"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style="animation-delay: 4s;"></div>
      </div>

      <div class="relative mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 min-h-screen">
        <div class="flex flex-col items-center text-center">
                  <!-- Title -->
          <h1 class="text-4xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Welcome To MyBlog
          </h1>

          <!-- Description -->
          <p class="text-lg lg:text-xl text-gray-300 max-w-2xl mb-10">
            Explore interesting articles about
Technology, Finance, Education, More
          </p>

          <!-- Stats Cards -->
          <div class="flex flex-wrap items-center justify-center gap-4 lg:gap-8">
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div class="lg:text-3xl text-2xl font-bold text-white">{{ totalReader }}</div>
              <div class="lg:text-sm text-xs text-gray-400">Active Readers</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div class="lg:text-3xl text-2xl font-bold text-white">{{ totalArticle }}</div>
              <div class="lg:text-sm text-xs text-gray-400">Articles</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div class="lg:text-3xl text-2xl font-bold text-white">{{ totalLike }}</div>
              <div class="lg:text-sm text-xs text-gray-400">Total Likes</div>
            </div>
          </div>
                 </div>
      </div>
    </section>
    <CategoryTabs />
  </div>
</template>
