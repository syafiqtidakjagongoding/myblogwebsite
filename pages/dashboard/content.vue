<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '~/store/auth'

interface Article {
  id: number
  title: string
  description?: string
  picturePath?: string
  tags?: string[]
}

interface Content {
  contentIDN: string
  contentEN: string
}

interface Image {
  id: number
  articleId: number | null
  path: string
}

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const articleId = computed(() => Number(route.query.id))
const article = ref<Article | null>(null)
const content = ref<Content>({ contentIDN: '', contentEN: '' })
const images = ref<Image[]>([])
const isLoading = ref(false)
const isSaving = ref(false)
const activeTab = ref('idn')

const selectedFile = ref<File | null>(null)
const isUploading = ref(false)

const fetchArticle = async () => {
  if (!articleId.value) {
    router.push('/dashboard')
    return
  }
  
  isLoading.value = true
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const articles = await $fetch<Article[]>('/api/dashboard/articles')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    article.value = articles.find((a) => a.id === articleId.value) || null
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const contents = await $fetch<any>('/api/dashboard/content')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const articleContent = contents.find((c: any) => c.articleId === articleId.value)
    if (articleContent) {
      content.value = {
        contentIDN: articleContent.contentIDN || '',
        contentEN: articleContent.contentEN || '',
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allImages = await $fetch<any>('/api/dashboard/images')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    images.value = allImages.filter((img: any) => img.articleId === articleId.value)
  } catch (e) {
    console.error('Failed to fetch article:', e)
    alert('Failed to load article')
    router.push('/dashboard')
  }
  isLoading.value = false
}

const saveContent = async () => {
  isSaving.value = true
  try {
    await $fetch('/api/dashboard/articles', {
      method: 'PUT',
      body: {
        id: articleId.value,
        contentIDN: content.value.contentIDN,
        contentEN: content.value.contentEN,
      },
    })
    alert('Content saved successfully!')
    router.push('/dashboard')
  } catch (e) {
    console.error('Failed to save content:', e)
    alert('Failed to save content')
  }
  isSaving.value = false
}

const addImage = async () => {
  if (!selectedFile.value) return
  
  isUploading.value = true
  try {
    const formData = new FormData()
    formData.append('articleId', String(articleId.value))
    formData.append('file', selectedFile.value)

    const result = await $fetch('/api/dashboard/images', {
      method: 'POST',
      body: formData,
    })
    images.value.push(result as Image)
    selectedFile.value = null
  } catch (e) {
    console.error('Failed to upload image:', e)
    alert('Failed to upload image')
  }
  isUploading.value = false
}

const deleteImage = async (id: number) => {
  if (!confirm('Delete this image?')) return
  
  try {
    await $fetch('/api/dashboard/images', {
      method: 'DELETE',
      body: { id },
    })
    images.value = images.value.filter((img) => img.id !== id)
  } catch (e) {
    console.error('Failed to delete image:', e)
    alert('Failed to delete image')
  }
}

const goBack = () => {
  router.push('/dashboard')
}

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    router.push('/login')
    return
  }
  await fetchArticle()
})

useHead({
  title: 'Edit Content - Dashboard',
})
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <button @click="goBack" class="mr-4 text-gray-600 hover:text-gray-900">
              Back
            </button>
            <h1 class="text-xl font-bold">Edit Content</h1>
          </div>
          <div class="flex items-center">
            <span class="text-gray-600">{{ article?.title }}</span>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div v-if="isLoading" class="text-center py-8">Loading...</div>

        <div v-else-if="article" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 bg-white shadow rounded-lg p-6">
            <div class="border-b border-gray-200 mb-6">
              <nav class="-mb-px flex space-x-8">
                <button
                  @click="activeTab = 'idn'"
                  :class="[
                    activeTab === 'idn'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                  ]"
                >
                  Indonesia
                </button>
                <button
                  @click="activeTab = 'en'"
                  :class="[
                    activeTab === 'en'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                  ]"
                >
                  English
                </button>
              </nav>
            </div>

            <div v-if="activeTab === 'idn'" class="space-y-4">
              <h3 class="text-lg font-medium">Content Indonesia</h3>
              <textarea
                v-model="content.contentIDN"
                rows="20"
                class="w-full border border-gray-300 rounded-md px-3 py-2 font-mono text-sm"
                placeholder="<p>Write your Indonesian content here in HTML...</p>"
              />
            </div>

            <div v-if="activeTab === 'en'" class="space-y-4">
              <h3 class="text-lg font-medium">Content English</h3>
              <textarea
                v-model="content.contentEN"
                rows="20"
                class="w-full border border-gray-300 rounded-md px-3 py-2 font-mono text-sm"
                placeholder="<p>Write your English content here in HTML...</p>"
              />
            </div>

            <div class="flex justify-end space-x-3 pt-6 mt-6 border-t">
              <button
                @click="goBack"
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                @click="saveContent"
                :disabled="isSaving"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {{ isSaving ? 'Saving...' : 'Save Content' }}
              </button>
            </div>
          </div>

          <div class="bg-white shadow rounded-lg p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-medium">Images</h3>
            </div>

            <div class="space-y-3 mb-4">
              <div v-for="img in images" :key="img.id" class="flex items-center justify-between p-2 border rounded">
                <img :src="img.path" class="h-12 w-12 object-cover rounded" />
                <span class="text-xs text-gray-500 truncate flex-1 mx-2">{{ img.path }}</span>
                <button @click="deleteImage(img.id)" class="text-red-600 hover:text-red-900 text-sm">
                  Delete
                </button>
              </div>
              <div v-if="images.length === 0" class="text-sm text-gray-500 text-center py-4">
                No images yet
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                @change="(e) => selectedFile = (e.target as HTMLInputElement).files?.[0] || null"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <button
                @click="addImage"
                :disabled="!selectedFile || isUploading"
                class="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 text-sm"
              >
                {{ isUploading ? 'Uploading...' : 'Upload' }}
              </button>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-8 text-gray-500">
          Article not found
        </div>
      </div>
    </main>
  </div>
</template>
