import { useLanguageStore } from '@/store/language'

export const useDetectCountry = () => {
  const countryDetected = useState('countryDetected', () => false)
  
  if (import.meta.client && !countryDetected.value) {
    countryDetected.value = true
    
    fetch('http://ip-api.com/json/?fields=status,countryCode')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success' && data.countryCode === 'ID') {
          useLanguageStore().setLanguage('id')
        } else {
          useLanguageStore().setLanguage('en')
        }
      })
      .catch(() => {
        useLanguageStore().setLanguage('en')
      })
  }
}
