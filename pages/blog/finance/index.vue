<template>
  <BlogsCategory title="Finance Blog">
      <div v-if="financeBlog?.length == 0" class="w-full h-screen justify-center items-center">
      <h1 class="text-2xl font-semibold mb-2">Artikel belum terbuat 😕</h1>
      <p class="text-gray-600">Konten sedang disiapkan. Silakan kembali lagi nanti!</p>
    </div>
    <card-blog 
      v-for="blog in financeBlog"
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
  </BlogsCategory>
</template>

<script setup lang="ts">
import BlogsCategory from '@/components/BlogsCategory.vue'
import CardBlog from '@/components/CardBlog.vue'
import { getFinanceBlog} from '@/lib/query'
import type { BlogStat } from '@/lib/types'
import { ref, onMounted } from 'vue'

const config = useRuntimeConfig()

useHead({
  title: 'Syafiq Blog | Finance ',
   link: [
    {
      rel: "canonical",
      href: `${config.public.baseUrl}/blog/finance`
    }
  ],
  meta: [
    {
      name: 'description',
      content: 'This is a finance blog',
    },
  ],
})

const financeBlog = ref<BlogStat[] | null>([])

async function fetchFinanceBlog() {
  try {
    const data = await getFinanceBlog()
    financeBlog.value = data
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  fetchFinanceBlog()
})
</script>
