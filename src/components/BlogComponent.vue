<template>
  <div class="min-h-screen">
    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4">
      <!-- Article Header -->

      <div class="flex justify-end">
        <div class="mt-5 mb-2">
          <Listbox v-model="selectedLanguage">
            <div class="relative mt-1">
              <ListboxButton
                class="relative w-full cursor-default rounded-lg bg-white py-2 pl-6 pr-10 text-left shadow-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
              >
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <font-awesome-icon :icon="['fas', 'globe']" size="lg" />
                </span>
                <span class="block truncate md:text-md text-xs">{{ selectedLanguage.name }}</span>
              </ListboxButton>

              <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <ListboxOptions
                  class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    v-slot="{ active, selected }"
                    v-for="lang in language"
                    :key="lang.name"
                    :value="lang"
                    as="template"
                  >
                    <li
                      :class="[
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-2',
                      ]"
                    >
                      <span
                        :class="[
                          selected ? 'font-medium' : 'font-normal',
                          'block truncate md:text-md text-xs',
                        ]"
                        >{{ lang.name }}</span
                      >
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
        </div>
      </div>
      <div class="flex flex-wrap items-center gap-3  mr-4">
        <!-- WhatsApp -->
        <a
          :href="`https://wa.me/?text=${encodeURIComponent(url)}`"
          target="_blank"
          title="WhatsApp"
        >
          <font-awesome-icon :icon="['fab', 'whatsapp']" size="lg" />
        </a>

        <!-- Facebook -->
        <a
          :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`"
          target="_blank"
          title="Facebook"
        >
          <font-awesome-icon :icon="['fab', 'facebook']" size="lg" />
        </a>

        <!-- Telegram -->
        <a
          :href="`https://t.me/share/url?url=${encodeURIComponent(url)}`"
          target="_blank"
          title="Telegram"
        >
          <font-awesome-icon :icon="['fas', 'send']" size="lg" />
        </a>

        <!-- Twitter / X -->
        <a
          :href="`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`"
          target="_blank"
          title="Twitter"
        >
          <font-awesome-icon :icon="['fab', 'x-twitter']" size="lg" />
        </a>

        <!-- LinkedIn -->
        <a
          :href="`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`"
          target="_blank"
          title="LinkedIn"
        >
          <font-awesome-icon :icon="['fab', 'linkedin']" size="lg" />
        </a>
        <!-- Copy Link -->
        <button @click="copyLink" title="Copy link">
          <font-awesome-icon :icon="['fas', 'copy']" size="lg" />
        </button>
      </div>
      <p class="text-xs mt-1 text-gray-400 italic" v-if="articlePublished">
        Published on {{ articlePublished }}
      </p>
      <article>
        <slot />
      </article>
      <!-- Article Footer -->
      <div class="px-2 py-6">
        <div class="flex flex-wrap items-center justify-between">
          <div class="flex flex-wrap items-center space-x-4">
            <span class="text-sm text-gray-500 md:mb-0 mb-2">Tags:</span>
            <div class="flex flex-wrap gap-2 space-x-2">
              <div
                v-for="tag in tags"
                :key="tag"
                class="p-2 text-xs flex w-max rounded-full bg-gray-200"
              >
                {{ tag }}
              </div>
              <div class="flex items-center text-gray-600">
                <font-awesome-icon :icon="['fas', 'book-open']" size="xl" />
                <span>{{ reader }} read</span>
              </div>
            </div>
          </div>
          <div class="flex items-center flex-wrap">
            <span class="text-md text-gray-500">Share:</span>
            <div class="flex items-center gap-3 p-2 mr-4 flex-wrap">
              <!-- WhatsApp -->
              <a
                :href="`https://wa.me/?text=${encodeURIComponent(url)}`"
                target="_blank"
                title="WhatsApp"
              >
              <font-awesome-icon :icon="['fab', 'whatsapp']" size="lg" />

              </a>

              <!-- Facebook -->
              <a
                :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`"
                target="_blank"
                title="Facebook"
              >
              <font-awesome-icon :icon="['fab', 'facebook']" size="lg" />
              </a>

              <!-- Telegram -->
              <a
                :href="`https://t.me/share/url?url=${encodeURIComponent(url)}`"
                target="_blank"
                title="Telegram"
              >
                <font-awesome-icon :icon="['fas', 'send']" size="lg" />
              </a>

              <!-- Twitter / X -->
              <a
                :href="`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`"
                target="_blank"
                title="Twitter"
              >
                <font-awesome-icon :icon="['fab', 'x-twitter']" size="lg" />
              </a>

              <!-- LinkedIn -->
              <a
                :href="`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`"
                target="_blank"
                title="LinkedIn"
              >
              <font-awesome-icon :icon="['fab', 'linkedin']" size="lg" />
              </a>

              <!-- Copy Link -->
              <button @click="copyLink" title="Copy link">
                <font-awesome-icon :icon="['fas', 'copy']" size="lg" />
              </button>
            </div>
            <div class="flex">
              <button @click="toggleLike">
                <font-awesome-icon
                  :icon="[isLiked ? 'fas' : 'far', 'heart']"
                  size="lg"
                  :class="[
                    'transition-all duration-200 cursor-pointer',
                    isLiked
                      ? 'text-red-500'
                      : 'text-gray-400 hover:text-red-300',
                  ]"
                />
              </button>
              <span>{{ likeTotal }}</span>
            </div>
          </div>
          <!-- Alert notification -->
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 transform translate-y-2 scale-95"
            enter-to-class="opacity-100 transform translate-y-0 scale-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 transform translate-y-0 scale-100"
            leave-to-class="opacity-0 transform translate-y-2 scale-95"
          >
            <div
              v-if="showAlert"
              class="fixed z-40 bottom-4 right-4 bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg max-w-sm"
            >
              <div class="flex items-center gap-3">
                <div class="flex-shrink-0">
                  <CheckCircle class="w-5 h-5 text-green-600" />
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-green-800">Copied to clipboard!</p>
                  <p class="text-xs text-green-600 mt-1">Text has been successfully copied</p>
                </div>
                <button
                  @click="hideAlert"
                  class="flex-shrink-0 text-green-400 hover:text-green-600 focus:outline-none"
                >
                  <X :size="16" />
                </button>
              </div>
            </div>
          </Transition>
        </div>
        <p class="text-xs mt-1 text-gray-400 italic" v-if="articlePublished">
          Published on {{ articlePublished }}
        </p>
        <div class="mt-10">
          <h2 class="text-xl font-semibold mb-4">💬 Comment</h2>

          <form @submit.prevent="submitComment" class="space-y-2">
            <input
              v-model="name"
              type="text"
              placeholder="Name (optional)"
              class="w-full border px-3 py-2 rounded"
            />

            <textarea
              v-model="content"
              required
              placeholder="Write your opinion..."
              class="w-full border px-3 py-2 rounded min-h-[100px]"
            ></textarea>

            <button
              type="submit"
              class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Send
            </button>
          </form>

          <div class="mt-6 space-y-3 max-h-96 overflow-y-scroll" style="scrollbar-width: none">
            <div v-for="comment in props.comments" :key="comment.id" class="border p-3 rounded">
              <div class="text-sm text-gray-600 mb-1">
                <strong>{{ comment.name || 'Anonim' }}</strong> –
                {{ formattedDate(comment.created_at) }}
              </div>
              <p class="text-gray-800 whitespace-pre-line">{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useLanguageStore } from '@/store/language'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { decrementLikeByid, incrementLikeByid, insertComments } from '@/lib/query'
import type { Comments } from '@/lib/types'

const url = window.location.href
const title = document.title

const props = defineProps<{
  tags: string[]
  id: number
  total_like: number
  date_published: string | null
  reader: number
  comments: Comments[] | null
}>()

const name = ref<string>('')
const content = ref<string>('')

async function submitComment() {
  if (!content.value.trim()) return

  const res = await insertComments(props.id, name.value, content.value)
  if (!res) {
    console.error('error while inserting comment')
  }

  name.value = ''
  content.value = ''
}

const showAlert = ref(false)
let alertTimeout: ReturnType<typeof setTimeout>
const language = [
  { name: 'English', code: 'en' },
  { name: 'Indonesia', code: 'id' },
]
const langStore = useLanguageStore()
const selectedLanguage = ref(
  language.find((lang) => lang.code === langStore.language) || language[0],
)

watch(selectedLanguage, (newVal) => {
  useLanguageStore().setLanguage(newVal.code)
})

const formattedDate = (date: Date | string) => {
  if (!date) return null // atau "Loading..."

  const dates = new Date(date)
  if (isNaN(dates.getTime())) return 'Invalid date'

  return dates.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

const articlePublished = computed(() => {
  const raw = props.date_published
  if (!raw) return null // atau "Loading..."

  const date = new Date(raw)
  if (isNaN(date.getTime())) return 'Invalid date'

  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
})

const hideAlert = () => {
  showAlert.value = false
  if (alertTimeout) {
    clearTimeout(alertTimeout)
  }
}

function copyLink() {
  navigator.clipboard
    .writeText(url)
    .then(() => {
      showAlert.value = true
      // Clear existing timeout
      if (alertTimeout) {
        clearTimeout(alertTimeout)
      }

      // Auto hide after 3 seconds
      alertTimeout = setTimeout(() => {
        showAlert.value = false
      }, 3000)
    })
    .catch((err) => {
      console.error('Failed to copy: ', err)
    })
}

// Single heart toggle
const isLiked = ref(false)
const likeTotal = ref(props.total_like)

watch(
  () => props.total_like,
  (newVal) => {
    likeTotal.value = newVal
  },
)

async function liked() {
  await incrementLikeByid(props.id)
}

async function cancelLiked() {
  await decrementLikeByid(props.id)
}
let likeTimeout: ReturnType<typeof setTimeout> | null = null

const toggleLike = () => {
  // Update UI langsung
  isLiked.value = !isLiked.value
  likeTotal.value += isLiked.value ? 1 : -1

  // Hapus timeout sebelumnya (kalau ada)
  if (likeTimeout) clearTimeout(likeTimeout)

  // Jadwalkan update ke server setelah 1 detik tanpa klik tambahan
  likeTimeout = setTimeout(() => {
    if (isLiked.value) {
      liked()
    } else {
      cancelLiked()
    }
  }, 1000)
}

onMounted(() => {})
</script>
