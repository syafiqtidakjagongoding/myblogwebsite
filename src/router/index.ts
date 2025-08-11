import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PGPEncryption from '@/views/blog/PGPEncryption.vue'
import TechBlog from '@/views/TechBlog.vue'
import EducationBlog from '@/views/EducationBlog.vue'
import FinanceBlog from '@/views/FinanceBlog.vue'
import PoliticBlog from '@/views/PoliticBlog.vue'
import MoneroCoin from '@/views/blog/MoneroCoin.vue'
import FrugalLiving from '@/views/blog/FrugalLiving.vue'
import TrumpProCrypto from '@/views/blog/TrumpProCrypto.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/blog/tech/what-is-openpgp-encryption',
      name: 'PGPEncryption',
      component: PGPEncryption,
    },
    {
      path: '/blog/tech/what-is-monero',
      name: 'MoneroCoinBlog',
      component: MoneroCoin,
    },
    {
      path: '/blog/education/frugal-living-tips',
      name: 'FrugalLivingTips',
      component: FrugalLiving,
    },
    {
      path: '/blog/politic/donald-trump-pro-crypto',
      name: 'DonaldTrumpProCrypto',
      component: TrumpProCrypto,
    },
    {
      path: '/blog/tech',
      name: 'TechBlog',
      component: TechBlog,
    },
    {
      path: '/blog/education',
      name: 'EducationBlog',
      component: EducationBlog,
    },
    {
      path: '/blog/finance',
      name: 'FinanceBlog',
      component: FinanceBlog,
    },
    {
      path: '/blog/politic',
      name: 'PoliticBlog',
      component: PoliticBlog,
    },
  ],
})

export default router
