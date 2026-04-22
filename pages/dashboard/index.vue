<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/store/auth'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

interface Article {
  id: number
  title: string
  description?: string
  picturePath?: string
  path?: string
  tags?: string[]
  articleCode?: string
  category?: string
  status?: string
  datePublished?: string | Date | null
}

interface Comment {
  id: number
  articleId: number
  name?: string
  content: string
  articleTitle?: string
  createdAt?: string | Date | null
}

const router = useRouter()
const authStore = useAuthStore()

const activeTab = ref('articles')
const articles = ref<Article[]>([])
const comments = ref<Comment[]>([])
const isLoading = ref(false)

const showModal = ref(false)
const editingArticle = ref<Article | null>(null)
const availableTags = ['Tech', 'Finance', 'Education', 'Politic']

const addTag = (tag: string) => {
  const trimmed = tag.trim()
  if (trimmed && !form.value.tags.includes(trimmed)) {
    form.value.tags.push(trimmed)
  }
}

const newTagInput = ref('')

const addNewTag = () => {
  if (newTagInput.value.trim()) {
    addTag(newTagInput.value)
    newTagInput.value = ''
  }
}

const removeTag = (tag: string) => {
  form.value.tags = form.value.tags.filter((t) => t !== tag)
}

const form = ref({
  title: '',
  description: '',
  category: 'tech',
  status: 'draft',
  picturePath: '/images/placeholder.jpg',
  articleCode: '',
  tags: [] as string[],
})

const selectedCoverFile = ref<File | null>(null)
const previewUrl = ref<string>('')
const croppedRef = ref<InstanceType<typeof Cropper> | null>(null)

const fetchArticles = async () => {
  isLoading.value = true
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    articles.value = await $fetch<any[]>('/api/dashboard/articles')
  } catch (e) {
    console.error('Failed to fetch articles:', e)
  }
  isLoading.value = false
}

const fetchComments = async () => {
  isLoading.value = true
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    comments.value = await $fetch<any>('/api/dashboard/comments')
  } catch (e) {
    console.error('Failed to fetch comments:', e)
  }
  isLoading.value = false
}

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    router.push('/login')
    return
  }
  await fetchArticles()
})

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const openModal = async (article?: Article) => {
  if (article) {
    editingArticle.value = article
    form.value = {
      title: article.title,
      description: article.description || '',
      category: article.category || 'tech',
      status: article.status || 'draft',
      picturePath: article.picturePath || '/images/placeholder.jpg',
      articleCode: article.articleCode || '',
      tags: article.tags || [],
    }
  } else {
    editingArticle.value = null
    form.value = {
      title: '',
      description: '',
      category: 'tech',
      status: 'draft',
      picturePath: '/images/placeholder.jpg',
      articleCode: '',
      tags: [],
    }
    previewUrl.value = ''
    selectedCoverFile.value = null
  }
  showModal.value = true
}

const closeModal = async () => {
  if (!editingArticle.value?.title && editingArticle.value?.id) {
    try {
      await $fetch('/api/dashboard/articles', {
        method: 'DELETE',
        body: { id: editingArticle.value.id },
      })
      await fetchArticles()
    } catch (e) {
      console.error('Failed to delete empty article:', e)
    }
  }
  showModal.value = false
  editingArticle.value = null
}

const saveArticle = async () => {
  try {
    const articleCode = form.value.articleCode || `article-${Date.now()}`

    if (selectedCoverFile.value && croppedRef.value) {
      const { canvas } = croppedRef.value.getResult()
      if (canvas) {
        const blob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((b) => resolve(b!), 'image/jpeg', 0.9)
        })

        const formData = new FormData()
        formData.append('file', blob, 'cover.jpg')
        formData.append('articleCode', articleCode)

        const result = (await $fetch('/api/dashboard/articles', {
          method: 'POST',
          body: formData,
        })) as { picturePath: string }
        form.value.picturePath = result.picturePath
      }
    }

    const category = form.value.tags[0]?.toLowerCase() || 'tech'
    const path = `/blog/${category}/${articleCode}`
    const payload = {
      title: form.value.title,
      description: form.value.description,
      picturePath: form.value.picturePath,
      articleCode,
      path,
      tags: form.value.tags,
      category,
    }

    if (editingArticle.value) {
      if (selectedCoverFile.value && croppedRef.value) {
        const { canvas } = croppedRef.value.getResult()
        if (canvas) {
          const blob = await new Promise<Blob>((resolve) => {
            canvas.toBlob((b) => resolve(b!), 'image/jpeg', 0.9)
          })

          const formData = new FormData()
          formData.append('file', blob, 'cover.jpg')
          formData.append('articleCode', editingArticle.value.articleCode || articleCode)

          await $fetch('/api/dashboard/articles', {
            method: 'POST',
            body: formData,
          })
        }
      }

      await $fetch('/api/dashboard/articles', {
        method: 'PUT',
        body: { id: editingArticle.value.id, ...payload },
      })
    } else {
      await $fetch('/api/dashboard/articles', {
        method: 'POST',
        body: payload,
      })
    }

    selectedCoverFile.value = null
    previewUrl.value = ''
    await fetchArticles()
    closeModal()
  } catch (e) {
    console.error('Failed to save article:', e)
    alert('Failed to save article')
  }
}

const deleteArticle = async (id: number) => {
  if (!confirm('Are you sure you want to delete this article?')) return
  try {
    await $fetch(`/api/dashboard/articles?id=${id}`, {
      method: 'DELETE',
    })
    articles.value = articles.value.filter((a) => a.id !== id)
  } catch (e) {
    console.error('Failed to delete article:', e)
  }
}

const deleteComment = async (id: number) => {
  if (!confirm('Are you sure you want to delete this comment?')) return
  if (!id) {
    console.error('Invalid comment id:', id)
    return
  }
  try {
    await $fetch(`/api/dashboard/comments?id=${id}`, {
      method: 'DELETE',
    })
    comments.value = comments.value.filter((c) => c.id !== id)
    await fetchComments()
  } catch (e) {
    console.error('Failed to delete comment:', e)
  }
}

const onCoverFileChange = (e: Event) => {
  if (!form.value.articleCode.trim()) {
    alert('Please enter Article Code first')
    const target = e.target as HTMLInputElement
    target.value = ''
    return
  }

  const target = e.target as HTMLInputElement
  const file = target.files?.[0] || null
  selectedCoverFile.value = file

  if (file) {
    previewUrl.value = URL.createObjectURL(file)
  } else {
    previewUrl.value = ''
  }
}

const switchTab = async (tab: string) => {
  activeTab.value = tab
  if (tab === 'comments' && comments.value.length === 0) {
    await fetchComments()
  }
}

const formatDate = (date: string | Date | null | undefined) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toISOString().split('T')[0]
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-bold">Dashboard</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-gray-600">Welcome, {{ authStore.user }}</span>
            <button class="text-red-600 hover:text-red-800" @click="handleLogout">Logout</button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="border-b border-gray-200 mb-6">
          <nav class="-mb-px flex space-x-8">
            <button
              :class="[
                activeTab === 'articles'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
              ]"
              @click="switchTab('articles')"
            >
              Articles
            </button>
            <button
              :class="[
                activeTab === 'comments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
              ]"
              @click="switchTab('comments')"
            >
              Comments
            </button>
          </nav>
        </div>

        <div v-if="activeTab === 'articles'">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Articles</h2>
            <button
              class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              @click="openModal()"
            >
              + New Article
            </button>
          </div>

          <div v-if="isLoading" class="text-center py-8">Loading...</div>

          <div v-else class="bg-white shadow overflow-hidden sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="article in articles" :key="article.id">
                  <td class="px-6 py-4">{{ article.title }}</td>
                  <td class="px-6 py-4">
                    <span
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"
                    >
                      {{ article.path?.split('/')[2] || 'tech' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(article.datePublished) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      class="text-blue-600 hover:text-blue-900 mr-3"
                      @click="openModal(article)"
                    >
                      Edit
                    </button>
                    <button
                      class="text-green-600 hover:text-green-900 mr-3"
                      @click="router.push(`/dashboard/content?id=${article.id}`)"
                    >
                      Content
                    </button>
                    <button
                      class="text-red-600 hover:text-red-900"
                      @click="deleteArticle(article.id)"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="articles.length === 0" class="text-center py-8 text-gray-500">
              No articles found
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'comments'">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Comments</h2>
            <button
              :disabled="isLoading"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              @click="fetchComments"
            >
              Refresh
            </button>
          </div>

          <div v-if="isLoading" class="text-center py-8">Loading...</div>

          <div v-else class="bg-white shadow overflow-hidden sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Article
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Comment
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="comment in comments" :key="comment.id">
                  <td class="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                    {{ comment.articleTitle || 'Unknown' }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">{{ comment.name || 'Anonymous' }}</td>
                  <td class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {{ comment.content }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(comment.createdAt) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      class="text-red-600 hover:text-red-900"
                      @click="deleteComment(comment.id)"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="comments.length === 0" class="text-center py-8 text-gray-500">
              No comments found
            </div>
          </div>
        </div>
      </div>
    </main>

    <div
      v-if="showModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
    >
      <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 class="text-lg font-bold mb-4">
          {{ editingArticle ? 'Edit Article' : 'New Article' }}
        </h3>

        <form class="space-y-4" @submit.prevent="saveArticle">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              v-model="form.title"
              type="text"
              required
              class="w-full border border-gray-300 rounded-md px-3 py-2"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              v-model="form.description"
              rows="2"
              class="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Article Code</label>
            <input
              v-model="form.articleCode"
              type="text"
              class="w-full border border-gray-300 rounded-md px-3 py-2"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
            <div class="space-y-2">
              <div v-if="previewUrl" class="w-full bg-gray-100 rounded-md overflow-hidden">
                <Cropper ref="croppedRef" :src="previewUrl" :aspect-ratio="19 / 6" class="h-48" />
              </div>
              <div
                v-else-if="form.picturePath"
                class="relative w-full h-48 bg-gray-100 rounded-md overflow-hidden"
              >
                <img :src="form.picturePath" class="w-full h-full object-cover" >
              </div>
              <input
                type="file"
                accept="image/*"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                @change="onCoverFileChange"
              >
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <div class="flex flex-wrap gap-2 mb-2">
              <span
                v-for="tag in form.tags"
                :key="tag"
                class="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-sm"
              >
                {{ tag }}
                <button
                  type="button"
                  class="ml-1 text-blue-600 hover:text-blue-900"
                  @click="removeTag(tag)"
                >
                  ×
                </button>
              </span>
            </div>
            <div class="flex gap-2">
              <select
                class="flex-1 border border-gray-300 rounded-md px-3 py-2"
                @change="
                  addTag(($event.target as HTMLSelectElement).value)
                  ;($event.target as HTMLSelectElement).value = ''
                "
              >
                <option value="">Select a tag...</option>
                <option
                  v-for="tag in availableTags"
                  :key="tag"
                  :value="tag"
                  :disabled="form.tags.includes(tag)"
                >
                  {{ tag }}
                </option>
              </select>
              <input
                v-model="newTagInput"
                type="text"
                placeholder="Or type custom tag..."
                class="flex-1 border border-gray-300 rounded-md px-3 py-2"
                @keyup.enter="addNewTag"
              >
              <button
                type="button"
                class="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                @click="addNewTag"
              >
                Add
              </button>
            </div>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              @click="closeModal"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
