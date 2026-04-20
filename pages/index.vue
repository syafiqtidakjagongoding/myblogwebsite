<script setup lang="ts">
import CategoryTabs from '@/components/CategoryTabs.vue'
import { getTotalArticle, getTotalLike, getTotalReader } from '@/lib/query'
import { onMounted, ref } from 'vue'

const config = useRuntimeConfig()

useHead({
  title: 'Syafiq Blog - Technology, Finance, Education & More',
  link: [
    {
      rel: 'canonical',
      href: `${config.public.baseUrl}`,
    },
  ],
  meta: [
    {
      name: 'description',
      content:
        'Explore interesting articles about Technology, Finance, Education, and more. Personal blog by Syafiq with in-depth articles and guides.',
    },
    { property: 'og:title', content: 'Syafiq Blog - Technology, Finance, Education & More' },
    {
      property: 'og:description',
      content: 'Explore interesting articles about Technology, Finance, Education, and more.',
    },
    { property: 'og:url', content: config.public.baseUrl },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'aqua_salute.png' },
    { name: 'twitter:title', content: 'Syafiq Blog - Technology, Finance, Education & More' },
    {
      name: 'twitter:description',
      content: 'Explore interesting articles about Technology, Finance, Education, and more.',
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      textContent: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: "Syafiq's Blog",
        url: config.public.baseUrl,
        description: 'Personal blog about Technology, Finance, Education, and more.',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${config.public.baseUrl}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      }),
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
    <section class="w-full py-16 bg-blue-300 lg:py-24">
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col items-center text-center">
          <!-- Title -->
          <img src="/heroimage.png" class="" />
          <h1 class="text-3xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Welcome To MyBlog
          </h1>

          <!-- Description -->
          <p class="text-lg lg:text-xl text-gray-600 max-w-2xl mb-10">
            Explore interesting articles about Technology, Finance, Education, More from me
          </p>

          <!-- Stats Cards -->
          <div class="flex flex-wrap items-center justify-center gap-4 lg:gap-8">
            <div
              class="bg-gray-100 rounded-2xl px-6 py-4 border border-gray-200 hover:bg-gray-200 transition-all duration-300 hover:scale-105"
            >
              <div class="lg:text-3xl text-2xl font-bold text-gray-900">{{ totalReader }}</div>
              <div class="lg:text-sm text-xs text-gray-500">Active Readers</div>
            </div>
            <div
              class="bg-gray-100 rounded-2xl px-6 py-4 border border-gray-200 hover:bg-gray-200 transition-all duration-300 hover:scale-105"
            >
              <div class="lg:text-3xl text-2xl font-bold text-gray-900">
                {{ totalArticle === 0 ? 'Coming Soon' : totalArticle }}
              </div>
              <div class="lg:text-sm text-xs text-gray-500">Articles</div>
            </div>
            <div
              class="bg-gray-100 rounded-2xl px-6 py-4 border border-gray-200 hover:bg-gray-200 transition-all duration-300 hover:scale-105"
            >
              <div class="lg:text-3xl text-2xl font-bold text-gray-900">{{ totalLike }}</div>
              <div class="lg:text-sm text-xs text-gray-500">Total Likes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <CategoryTabs />
  </div>
</template>
