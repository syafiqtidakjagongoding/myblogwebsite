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
                <Github class="w-6 h-6" />
              </a>

              <a
                href="https://www.instagram.com/ganzz_fikkzzz/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-pink-400 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram class="w-6 h-6" />
              </a>
            </div>
            <div class="flex flex-col flex-wrap">
              <a
                href="https://mail.google.com"
                class="text-gray-400 flex md:text-md flex-wrap justify-center text-center text-sm gap-2 items-center hover:text-red-400 transition-colors duration-200"
                aria-label="Email"
                target="_blank"
              >
                <Mail class="w-6 h-6 md:inline-block hidden" /><span>syafiq_1971@disroot.org</span>
              </a>
            </div>
          </div>

          <div class="flex md:mt-0 mt-4 max-w-1/2 flex-col items-center gap-5">
            <h3 class="md:text-3xl text-xl font-semibold">Support me</h3>
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
                  src="https://storage.ko-fi.com/cdn/cup-border.png"
                  alt="Ko-fi"
                  class="md:w-8 w-5"
                />
                <span>Buy me a coffee</span>
              </a>

              <div class="flex items-center gap-1 max-w-100">
                <img src="/images/icon/monero-icon.png" alt="Ko-fi" class="md:w-12 w-5 ml-[-8px]" />
                <p class="truncate">
                  XMR :
                  <span class="text-wrap"
                    >46PdUhW3Cm46PAXanWY1MHZTzCrUgSp23fbjk9irapJCQAe13ARhQrt24AxJPuRzDfF4ZtoqzcUcxDzYHQZsZsGQ2PGCDHr</span
                  >
                </p>
                <button
                  onclick="navigator.clipboard.writeText('46PdUhW3Cm46PAXanWY1MHZTzCrUgSp23fbjk9irapJCQAe13ARhQrt24AxJPuRzDfF4ZtoqzcUcxDzYHQZsZsGQ2PGCDHr')"
                  class="text-xs bg-gray-700 text-white px-2 py-1 rounded"
                >
                  Copy
                </button>
              </div>
              <div class="flex items-center gap-2">
                <img src="/images/icon/usdt-trc20.png" alt="usdt" class="md:w-8 w-5" />
                <p>USDT (TRC20) : <span>TLFrZBWiC4B69bhDPcYZMFMRsX2b91oDYt</span></p>
                <button
                  onclick="navigator.clipboard.writeText('TLFrZBWiC4B69bhDPcYZMFMRsX2b91oDYt')"
                  class="text-xs bg-gray-700 text-white px-2 py-1 rounded"
                >
                  Copy
                </button>
              </div>
              <div class="flex items-center gap-2">
                <img src="/images/icon/btcln-icon.png" alt="bitcoin icon" class="md:w-8 w-5" />
                <p>BTC Lightning : <span>mentalquince39@walletofsatoshi.com</span></p>
                <button
                  onclick="navigator.clipboard.writeText('mentalquince39@walletofsatoshi.com')"
                  class="text-xs bg-gray-700 text-white px-2 py-1 rounded"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Copyright -->
        <div class="text-center pt-4 border-t border-gray-800 w-full">
          <p class="text-gray-500 text-sm">© {{ currentYear }} Syafiq. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Github, Instagram, Mail } from 'lucide-vue-next'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
