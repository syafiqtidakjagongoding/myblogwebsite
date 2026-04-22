<script setup lang="ts">
import { getRelatedBlogExcept } from '@/lib/query'
import type { BlogStat } from '@/lib/types'

const { articleCode } = defineProps({
  articleCode: {
    type: String,
    required: true,
  },
})

const relatedBlog = ref<BlogStat[] | null>([])
async function fetchRelatedBlog() {
  try {
    const data = await getRelatedBlogExcept(articleCode)
    relatedBlog.value = data
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  await Promise.all([fetchRelatedBlog()])
})
</script>

<template>
  <!-- Related Articles -->
  <section class="mt-12 mx-auto lg:max-w-4xl w-full flex flex-col justify-center pb-8 px-8">
    <h2 class="text-2xl font-bold text-gray-900 text-left mb-6">Related Articles</h2>
    <div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <card-blog
          v-for="blog in relatedBlog"
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
  </section>
</template>
