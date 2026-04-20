<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import BlogComponent from '@/components/BlogComponent.vue'
import { useLanguageStore } from '@/store/language'
import { getBlogByArticleCode, getCommentByArticleCode } from '@/lib/query'
import type { Comments } from '@/lib/types'

interface ArticleData {
  id: number
  title: string
  description?: string
  picturePath?: string
  tags?: string[]
  totalRead?: number
  like?: number
  datePublished?: string | Date | null
}

interface ContentData {
  contentIDN: string
  contentEN: string
}

const config = useRuntimeConfig()
const lang = useLanguageStore()
const route = useRoute()

const category = computed(() => route.params.category as string)
const articleCode = computed(() => route.params.articleCode as string)
const isEnglish = computed(() => lang.language === 'en')

const tags = ref<string[]>([])
const totalLike = ref<number>(0)
const id = ref<number>(0)
const comments = ref<Comments[] | null>([])
const reader = ref<number>(0)
const datePublished = ref<string | Date | null>(null)
const articleData = ref<ArticleData | null>(null)
const blogContent = ref<ContentData>({
  contentIDN: '',
  contentEN: '',
})
const isLoading = ref(true)

useHead({
  title: computed(() => articleData.value?.title || 'Blog'),
  link: [
    {
      rel: 'canonical',
      href: computed(() => `${config.public.baseUrl}/blog/${category.value}/${articleCode.value}`),
    },
  ],
  meta: [
    { name: 'description', content: computed(() => articleData.value?.description || '') },
    {
      property: 'og:image',
      content: computed(
        () =>
          `${config.public.baseUrl}${articleData.value?.picturePath}`,
      ),
    },
  ],
})

async function getBlog() {
  const data = await getBlogByArticleCode(articleCode.value)
  if (!data) {
    isLoading.value = false
    throw createError({ statusCode: 404, statusMessage: 'Article Not Found' })
  }

  articleData.value = data
  tags.value = data.tags
  id.value = data.id
  reader.value = data.totalRead
  totalLike.value = data.like
  datePublished.value = data.datePublished

  // Fetch content from database
  try {
    const articleContent = await $fetch<ContentData | null>(`/api/content?articleId=${data.id}`)
    console.log('Content:', articleContent)
    if (articleContent) {
      blogContent.value = {
        contentIDN: articleContent.contentIDN || '',
        contentEN: articleContent.contentEN || '',
      }
    }
  } catch (e) {
    console.error('Failed to fetch content:', e)
  }

  await getComments()
  isLoading.value = false
}

async function getComments() {
  if (id.value) {
    const res = await getCommentByArticleCode(id.value)
    comments.value = res
  }
}

onMounted(async () => {
  await getBlog()
  console.log(blogContent.value)
})
</script>

<template>
  <div v-if="isLoading" class="min-h-screen flex items-center justify-center bg-blue-300">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>

  <div v-else-if="!articleData" class="min-h-screen flex items-center justify-center bg-blue-300">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-gray-900">Article Not Found</h1>
      <p class="mt-2 text-gray-600">The article you're looking for doesn't exist.</p>
      <NuxtLink to="/" class="mt-4 inline-block text-blue-600 hover:underline">Go Home</NuxtLink>
    </div>
  </div>

  <div v-else>
    <BlogComponent
      :id="id"
      :tags="tags"
      :total-like="totalLike"
      :date-published="datePublished"
      :reader="reader"
      :comments="comments"
    >
          <div class="py-8">
        <div
          class="max-w-none prose"
          v-html="isEnglish ? blogContent.contentEN : blogContent.contentIDN"
        ></div>
      </div>
    </BlogComponent>
    <RelatedArticles :article-code="articleCode" />
  </div>
</template>
