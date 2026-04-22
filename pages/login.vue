<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/store/auth'
import * as openpgp from 'openpgp'

const router = useRouter()
const authStore = useAuthStore()

const privateKey = ref('')
const error = ref('')
const isLoading = ref(false)

const expectedMessage = 'Akhirnya kamu berhasil masuk ya'

const encryptedChallenge = `
-----BEGIN PGP MESSAGE-----

hF4DPaYuCw12JyESAQdAeP+NE2ui/7eHsNnAOmmi8PV/qLW/rkwuma8lFPrvmiAw
d122oTUVdnalKx6da2EGicJTStWibEL9tRyPA32ndgaql0AUySem+KOrlBOahMIR
0loBNrFi4wbIYtorWDq0gja/pi9XbfUPUA8IY8FY1xAY/ARKwBywXPq20Dl+LQEF
FWSdsFQvvdWR9C4i8XGc3pD2QO8ktTgjfnOWxmoHo+rCWcGtcbNf1AfQvlo=
=l7tM
-----END PGP MESSAGE-----`

const handleLogin = async () => {
  error.value = ''
  isLoading.value = true

  if (!privateKey.value) {
    error.value = 'Please enter your PGP private key'
    isLoading.value = false
    return
  }

  try {
    const privateKeyObj = await openpgp.readPrivateKey({
      armoredKey: privateKey.value,
    })
    if (!privateKeyObj) {
      error.value = 'Invalid private key format'
      isLoading.value = false
      return
    }

    const decrypted = await openpgp.decrypt({
      message: await openpgp.readMessage({ armoredMessage: encryptedChallenge }),
      decryptionKeys: privateKeyObj,
    })

    const decryptedMessage =
      decrypted.data instanceof Uint8Array
        ? new TextDecoder().decode(decrypted.data)
        : decrypted.data

    if (decryptedMessage.trim() === expectedMessage) {
      authStore.login('admin')
      router.push('/dashboard')
    } else {
      error.value = 'Decryption failed - unexpected result'
    }
  } catch (err) {
    console.error('PGP Error:', err)
  }

  isLoading.value = false
}

useHead({
  title: 'Login - Admin Dashboard',
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8 my-10">
      <h1 class="text-2xl font-bold text-center mb-6">Admin Login</h1>

      <p class="text-sm text-gray-600 mb-4">Enter your PGP private key to decrypt this message and
        access the dashboard.</p>
      <div class="w-full flex-wrap text-wrap my-5">
        <textarea
          class="w-full min-h-48 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs"
          disabled
          :value="encryptedChallenge"
        />
      </div>
      <div
        v-if="error"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
      >
        {{ error }}
      </div>

      <form class="space-y-4" @submit.prevent="handleLogin">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"> PGP Private Key </label>
          <textarea
            v-model="privateKey"
            rows="8"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs"
            placeholder="-----BEGIN PGP PRIVATE KEY-----"
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isLoading ? 'Verifying...' : 'Login' }}
        </button>
      </form>

      <div class="mt-6 text-center">
        <NuxtLink to="/" class="text-blue-600 hover:underline text-sm"> Back to Home </NuxtLink>
      </div>
    </div>
  </div>
</template>
