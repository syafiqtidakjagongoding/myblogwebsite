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
    <section class="mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 bg-gray-100 w-full">
      <div class="flex w-full justify-center items-center">
        <div class="flex-col">
          <div class="flex-col items-center text-center justify-center">
            <h1 class="text-4xl lg:text-6xl font-boldtext-center leading-tight">
              Welcome To Syafiq's blog
            </h1>
            <p class="lg:text-lg text-xs md:text-sm mt-5 leading-relaxed text-center">
              Just me yapping like a pro
            </p>
          </div>

          <div class="flex flex-wrap items-center justify-center gap-8 pt-8">
            <div class="text-center">
              <div class="lg:text-2xl text-md font-bold text-blue-900">{{ totalReader }}</div>
              <div class="lg:text-sm text-xs text-blue-600">Active Readers</div>
            </div>
            <div class="text-center">
              <div class="lg:text-2xl text-md font-bold text-blue-900">{{ totalArticle }}</div>
              <div class="lg:text-sm text-xs text-blue-600">Articles Published</div>
            </div>
            <div class="text-center">
              <div class="lg:text-2xl text-md font-bold text-blue-900">{{ totalLike }}</div>
              <div class="lg:text-sm text-xs text-blue-600">Total likes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <CategoryTabs />
  </div>
</template>
