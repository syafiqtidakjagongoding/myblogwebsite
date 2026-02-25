<script setup lang="ts">
import NavbarComponent from '~/components/NavbarComponent.vue'
import FooterComponent from '~/components/FooterComponent.vue'
import { useDetectCountry } from '~/composables/useDetectCountry'

useDetectCountry()
</script>

<template>
  <div class="min-h-screen">
    <NavbarComponent />
    <NuxtPage />
    <FooterComponent />
  </div>
</template>
