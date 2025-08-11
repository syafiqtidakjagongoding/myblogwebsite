<template>
  <div class="flex flex-col w-full justify-center items-center h-screen">
    <p class="font-bold text-4xl">Not Found</p>
    <br />
    <p v-html="time" class="text-2xl"></p>
    <a href="/" class="px-4 py-2 bg-black text-white mt-3 rounded-xl cursor-pointer"
      >Go to home page</a
    >
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useHead } from '@vueuse/head'
import { useRouter } from 'vue-router'

const time = ref(5)
const router = useRouter()

const timerId = window.setInterval(() => {
  time.value -= 1
  if (time.value <= 0) {
    router.push('/')
  }
}, 1000)

onUnmounted(() => {
  window.clearInterval(timerId) // bersihkan kalau user pergi sebelum habis
})

useHead({
  title: '404 - Halaman Tidak Ditemukan',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'description', content: 'Halaman yang Anda cari tidak ditemukan.' },
  ],
})
</script>
