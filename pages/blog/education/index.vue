<template>
  <BlogsCategory title="Education Blog">
       <div v-if="educationBlog?.length == 0" class="w-full h-screen justify-center items-center">
      <h1 class="text-2xl font-semibold mb-2">No articles yet</h1>
      <p class="text-gray-600">Content is being prepared. Please come back later!</p>
    </div>
    <card-blog 
      v-for="blog in educationBlog"
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
import { getEducationBlog} from '@/lib/query'
import type { BlogStat } from '@/lib/types'
import { ref, onMounted } from 'vue'

const config = useRuntimeConfig()

useHead({
  title: 'Syafiq Blog | Education',
   link: [
    {
      rel: "canonical",
      href: `${config.public.baseUrl}/blog/education`
    }
  ],
  meta: [
    {
      name: 'description',
      content: 'This is a education blog',
    },
  ],
})


const educationBlog = ref<BlogStat[] | null>([])

async function fetchEducationBlog() {
  try {
    const data = await getEducationBlog()
    educationBlog.value = data
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  fetchEducationBlog()
})
</script>
