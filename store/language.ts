import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('language', {
  state: () => ({
    language: 'en', // atau 'en' sebagai default
  }),
  actions: {
    setLanguage(code: string) {
      this.language = code
    },
  },
})
