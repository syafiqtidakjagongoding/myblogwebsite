<template>
  <footer class="bg-gray-900 text-white py-8 mt-auto">
    <div class="container mx-auto px-4">
      <div class="flex flex-col space-y-4">
        <div class="flex flex-wrap justify-around w-full">
          <!-- Main content -->
          <div class="flex flex-col items-center gap-2">
            <div class="text-center">
              <h3 class="md:text-3xl text-xl font-semibold mb-2">Connect with me</h3>
            </div>

            <!-- Social media links -->
            <div class="flex space-x-6 flex-wrap">
              <a
                href="https://github.com/syafiqtidakjagongoding"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="GitHub"
              >
                <font-awesome-icon :icon="['fab', 'github']" size="xl" />
              </a>

              <a
                href="https://mastodon.social/@lettucenerd"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-pink-400 transition-colors duration-200"
                aria-label="Mastodon"
              >
                <font-awesome-icon :icon="['fab', 'mastodon']" size="xl" />
              </a>
              <a
                href="https://conversations.im/i/fikkz@im.hot-chilli.eu?omemo-sid-1965632009=eb065c539b7fdbfdcf7b839624a4575c151ec4fc5e8e96a59a441b81e6b1ad21"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-pink-400 transition-colors duration-200"
                aria-label="Mastodon"
              >
                <font-awesome-icon :icon="['far', 'comment']" size="xl" />
              </a>
            </div>
            <div class="flex flex-col flex-wrap">
              <a
                href="https://mail.google.com"
                class="text-gray-400 flex md:text-md flex-wrap justify-center text-center text-sm gap-2 items-center hover:text-red-400 transition-colors duration-200"
                aria-label="Email"
                target="_blank"
              >
                <font-awesome-icon :icon="['fas', 'envelope']" size="xl" /><span>syafiq_1971@disroot.org</span>
              </a>
            </div>
          </div>

          <div class="flex md:mt-0 mt-4 flex-col items-center gap-5">
            <h3 class="md:text-3xl text-xl font-semibold text-center">Support me</h3>
            <!-- Trakteer -->
            <div class="flex flex-col text-sm gap-2">
              <a
                href="https://trakteer.id/syafiqparadisam"
                target="_blank"
                class="flex gap-2 items-center"
              >
                <img
                  src="/images/icon/trakteer.webp"
                  alt="Dukung di Trakteer"
                  class="md:w-8 w-5 rounded-md"
                />
                <span>Traktir cendol yuk!</span>
              </a>

              <!-- Ko-fi -->
              <a
                href="https://ko-fi.com/syafiqparadisam"
                target="_blank"
                class="flex gap-2 items-center"
              >
                <img
                  src="/images/icon/cup-border.webp"
                  alt="Ko-fi"
                  class="md:w-8 w-5"
                />
                <span>Buy me a coffee</span>
              </a>
            </div>
          </div>
        </div>
        <!-- Copyright -->
        <div class="text-center pt-4 border-t border-gray-800 w-full">
          <p class="text-gray-500 text-sm">  <font-awesome-icon :icon="['fas', 'copyright']" size="md" /> {{ currentYear }} Syafiq. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
