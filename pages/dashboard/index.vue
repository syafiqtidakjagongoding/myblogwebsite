<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/store/auth'

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
const availableTags = ['Tech', 'Finance', 'Programming', 'Politic']

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
  form.value.tags = form.value.tags.filter(t => t !== tag)
}

const form = ref({
  title: '',
  description: '',
  category: 'tech',
  status: 'draft',
  picturePath: '/images/placeholder.jpg',
  articleCode: '',
  path: '',
  tags: [] as string[],
})

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

const openModal = (article?: Article) => {
  if (article) {
    editingArticle.value = article
    form.value = {
      title: article.title,
      description: article.description || '',
      category: article.category || 'tech',
      status: article.status || 'draft',
      picturePath: article.picturePath || '/images/placeholder.jpg',
      articleCode: article.articleCode || '',
      path: article.path || '',
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
      articleCode: `article-${Date.now()}`,
      path: '',
      tags: [],
    }
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingArticle.value = null
}

const saveArticle = async () => {
  try {
    const payload = {
      ...form.value,
      category: form.value.path.split('/')[2] || form.value.category,
    }

    if (editingArticle.value) {
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
    await $fetch('/api/dashboard/articles', {
      method: 'DELETE',
      body: { id },
    })
    articles.value = articles.value.filter((a) => a.id !== id)
  } catch (e) {
    console.error('Failed to delete article:', e)
  }
}

const deleteComment = async (id: number) => {
  if (!confirm('Are you sure you want to delete this comment?')) return
  try {
    await $fetch('/api/dashboard/comments', {
      method: 'DELETE',
      body: { id },
    })
    comments.value = comments.value.filter((c) => c.id !== id)
  } catch (e) {
    console.error('Failed to delete comment:', e)
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

useHead({
  title: 'Dashboard Panel',
})
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
            <button @click="handleLogout" class="text-red-600 hover:text-red-800">Logout</button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="border-b border-gray-200 mb-6">
          <nav class="-mb-px flex space-x-8">
            <button
              @click="switchTab('articles')"
              :class="[
                activeTab === 'articles'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
              ]"
            >
              Articles
            </button>
            <button
              @click="switchTab('comments')"
              :class="[
                activeTab === 'comments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
              ]"
            >
              Comments
            </button>
          </nav>
        </div>

        <div v-if="activeTab === 'articles'">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Articles</h2>
            <button
              @click="openModal()"
              class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              + New Article
            </button>
          </div>

          <div v-if="isLoading" class="text-center py-8">Loading...</div>

          <div v-else class="bg-white shadow overflow-hidden sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="article in articles" :key="article.id">
                  <td class="px-6 py-4">{{ article.title }}</td>
                  <td class="px-6 py-4">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {{ article.path?.split('/')[2] || 'tech' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(article.datePublished) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <button @click="openModal(article)" class="text-blue-600 hover:text-blue-900 mr-3">
                      Edit
                    </button>
                    <button @click="router.push(`/dashboard/content?id=${article.id}`)" class="text-green-600 hover:text-green-900 mr-3">
                      Content
                    </button>
                    <button @click="deleteArticle(article.id)" class="text-red-600 hover:text-red-900">
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
          <h2 class="text-2xl font-bold mb-6">Comments</h2>

          <div v-if="isLoading" class="text-center py-8">Loading...</div>

          <div v-else class="bg-white shadow overflow-hidden sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Article
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comment
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                  <td class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{{ comment.content }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(comment.createdAt) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <button @click="deleteComment(comment.id)" class="text-red-600 hover:text-red-900">
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

        <form @submit.prevent="saveArticle" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              v-model="form.title"
              type="text"
              required
              class="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              v-model="form.description"
              rows="2"
              class="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Article Code</label>
              <input
                v-model="form.articleCode"
                type="text"
                class="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Path</label>
              <input
                v-model="form.path"
                type="text"
                placeholder="/blog/tech/article-code"
                class="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Picture Path</label>
            <input
              v-model="form.picturePath"
              type="text"
              class="w-full border border-gray-300 rounded-md px-3 py-2"
            />
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
                  @click="removeTag(tag)"
                  class="ml-1 text-blue-600 hover:text-blue-900"
                >
                  ×
                </button>
              </span>
            </div>
            <div class="flex gap-2">
              <select
                @change="addTag(($event.target as HTMLSelectElement).value); ($event.target as HTMLSelectElement).value = ''"
                class="flex-1 border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select a tag...</option>
                <option v-for="tag in availableTags" :key="tag" :value="tag" :disabled="form.tags.includes(tag)">
                  {{ tag }}
                </option>
              </select>
              <input
                v-model="newTagInput"
                @keyup.enter="addNewTag"
                type="text"
                placeholder="Or type custom tag..."
                class="flex-1 border border-gray-300 rounded-md px-3 py-2"
              />
              <button
                type="button"
                @click="addNewTag"
                class="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Add
              </button>
            </div>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
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
