<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div class="flex flex-col w-full justify-center items-center h-screen">
    <p class="font-bold text-4xl">Not Found</p>
    <br >
    <!-- eslint-disable-next-line vue/no-v-html -->
    <p class="text-2xl" v-html="time"/>
    <NuxtLink to="/" class="px-4 py-2 bg-black text-white mt-3 rounded-xl cursor-pointer"
      >Go to home page</NuxtLink
    >
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

const time = ref(5)
const router = useRouter()

const timerId = window.setInterval(() => {
  time.value -= 1
  if (time.value <= 0) {
    router.push('/')
  }
}, 1000)

onUnmounted(() => {
  window.clearInterval(timerId)
})

useHead({
  title: '404 - Halaman Tidak Ditemukan',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'description', content: 'Halaman yang Anda cari tidak ditemukan.' },
  ],
})
</script>
