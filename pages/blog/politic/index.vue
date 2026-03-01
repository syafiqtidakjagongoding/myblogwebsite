<template>
  <BlogsCategory title="Politic Blog">
   <div v-if="politicBlog?.length == 0" class="w-full h-screen justify-center items-center">
      <h1 class="text-2xl font-semibold mb-2">No articles yet</h1>
      <p class="text-gray-600">Content is being prepared. Please come back later!</p>
    </div>
    <card-blog 
      v-for="blog in politicBlog"
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
import { getPoliticBlog } from '@/lib/query'
import type { BlogStat } from '@/lib/types'
import { ref, onMounted } from 'vue'

const config = useRuntimeConfig()

useHead({
  title: 'Syafiq Blog | Politic',
   link: [
    {
      rel: "canonical",
      href: `${config.public.baseUrl}/blog/politic`
    }
  ],
  meta: [
    {
      name: 'description',
      content: 'This is a politic blog',
    },
  ],
})

const politicBlog = ref<BlogStat[] | null>([])

async function fetchPoliticBlog() {
  try {
    const data = await getPoliticBlog()
    politicBlog.value = data
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  fetchPoliticBlog()
})
</script>
