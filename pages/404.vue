<template>
  <div class="flex flex-col w-full justify-center items-center h-screen">
    <p class="font-bold text-4xl">404</p>
    <p class="text-2xl mt-2">Page Not Found</p>
    <p class="text-gray-600 mt-2">The page you're looking for doesn't exist.</p>
    <div class="flex gap-4 mt-6">
      <button 
        @click="goBack" 
        class="px-4 py-2 bg-gray-200 text-gray-800 rounded-xl cursor-pointer hover:bg-gray-300"
      >
        ← Go Back
      </button>
      <NuxtLink to="/" class="px-4 py-2 bg-black text-white rounded-xl cursor-pointer hover:bg-gray-800">
        Go to Home
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}

useHead({
  title: '404 - Page Not Found',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'description', content: 'The page you are looking for does not exist.' },
  ],
})
</script>
