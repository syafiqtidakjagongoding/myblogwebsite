<script setup lang="ts">
import { computed } from 'vue'
import BlogComponent from '@/components/BlogComponent.vue'
import CardBlog from '@/components/CardBlog.vue'
import { useLanguageStore } from '@/store/language'

import { getBlogByArticleCode, getCommentByArticleCode, getRelatedBlogExcept } from '@/lib/query'
import type { BlogStat, Comments } from '@/lib/types'
import { ref, onMounted } from 'vue'
import { useHead } from '@vueuse/head'

const lang = useLanguageStore()
const articleCode = 'frugal_living_tips'
const isEnglish = computed(() => lang.language === 'en')
useHead({
  title: 'Frugal Living Tips And Why You Should Do It ',
  link: [
    {
      rel: 'canonical',
      href: `${import.meta.env.VITE_BASE_URL}/blog/education/frugal-living-tips`,
    },
  ],
  meta: [
    {
      name: 'description',
      content: 'Same routine, same paycheck, but still broke? Maybe it’s time for a mindset shift. Frugal living isn’t about being cheap — it’s about spending smarter and living better. Read the full blog to see how small changes can make a big difference.',
    },
    {
      name: 'keywords',
      content: 'frugal living, how to live frugally, frugal living tips',
    },
  ],
})

const relatedBlog = ref<BlogStat[] | null>([])
const tags = ref<string[]>([])
const totalLike = ref<number>(0)
const id = ref<number>(0)
const comments = ref<Comments[] | null>([])
const reader = ref<number>(0)
const datePublished = ref<string | null>(null)
async function getBlog() {
  const data = await getBlogByArticleCode(articleCode)
  tags.value = data.tags
  id.value = data.id
  reader.value = data.total_read
  totalLike.value = data.like
  datePublished.value = data.date_published
}

async function fetchRelatedBlog() {
  try {
    const data = await getRelatedBlogExcept(articleCode)
    relatedBlog.value = data
  } catch (err) {
    console.log(err)
  }
}

async function getComments() {
  const res = await getCommentByArticleCode(id.value)
  comments.value = res
}

onMounted(async () => {
  await getBlog()
  await Promise.all([fetchRelatedBlog(), getComments()])
})
</script>

<template>
  <BlogComponent
    :tags="tags"
    :id="id"
    :total_like="totalLike"
    :date_published="datePublished"
    :reader="reader"
    :comments="comments"
  >
    <h1 class="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
      {{
        isEnglish
          ? 'Frugal living tips and why you should do it'
          : 'Cara hidup frugal dan kenapa kalian harus melakukannya'
      }}
    </h1>
    <p
      class="text-lg text-gray-600 mb-6 leading-relaxed"
      v-html="
        isEnglish
          ? 'Frugal living is a <strong>lifestyle of conscious spending</strong> that focuses on saving money without sacrificing quality of life. It’s not about being cheap, but about spending wisely.'
          : 'Frugal living adalah <strong>gaya hidup dengan pengeluaran yang sadar</strong> dan berfokus pada menghemat uang tanpa mengorbankan kualitas hidup. Bukan soal pelit, tapi soal bijak dalam membelanjakan.'
      "
    ></p>
    <!-- Featured Image -->
    <div class="relative">
      <img
        src="/images/blogs/frugallivingtips/thumbnail.webp"
        alt="Illustration of people reading book"
        class="w-full h-full max-h-140 object-top object-cover "
      />
    </div>

    <!-- Article Content -->
    <div class="px-2 py-8">
      <div class="max-w-none">
        <h2 class="text-2xl font-semibold mt-8 mb-3 text-gray-900">
          {{ isEnglish ? 'What is frugal living ?' : 'Apa itu frugal living ?' }}
        </h2>
        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? 'Frugal living is a philosophy of living that emphasizes using resources wisely and efficiently. It’s not about living in lack or rejecting all comforts, but about making smart choices in spending and consumption.'
              : 'Frugal living, atau gaya hidup hemat, adalah filosofi hidup yang menekankan penggunaan sumber daya secara bijak dan efisien. Ini bukan berarti hidup dalam kekurangan atau menolak kenyamanan, melainkan tentang membuat pilihan yang cerdas dalam pengeluaran dan konsumsi.'
          }}
        </p>
        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? 'This concept has existed for a long time and is practiced in many cultures around the world. In Japan, for example, there is the "mottainai" philosophy, which teaches not to waste resources. In Indonesia, we have the saying "hemat pangkal kaya", reflecting similar values.'
              : 'Konsep ini sebenarnya telah ada sejak lama dan dipraktikkan oleh berbagai budaya di dunia. Di Jepang, misalnya, ada filosofi "mottainai" yang mengajarkan untuk tidak menyia-nyiakan sumber daya. Sementara itu, di Indonesia, kita mengenal ungkapan "hemat pangkal kaya" yang mencerminkan nilai-nilai frugal living.'
          }}
        </p>
        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? 'Frugal living doesn’t mean being poor or stingy. Instead, it’s about making thoughtful, strategic spending decisions. A frugal person might spend more on things that truly matter to them, while cutting costs in areas that are less important.'
              : 'Frugal living bukan berarti hidup miskin atau kikir. Sebaliknya, ini tentang membuat keputusan pengeluaran yang cerdas dan strategis. Seseorang yang hidup hemat bisa saja mengeluarkan uang lebih banyak untuk hal-hal yang penting baginya, sambil berhemat di aspek lain yang kurang prioritas.'
          }}
        </p>

        <h2 class="text-2xl font-semibold mt-8 mb-3 text-gray-900">
          {{ isEnglish ? 'Benefits of frugal living' : 'Manfaat frugal living' }}
        </h2>
        <img
          src="/images/blogs/frugallivingtips/frugalliving.webp"
          alt="Illustration of frugal living"
          class="w-full h-full object-cover object-top max-h-170 mb-3"
        />
        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? 'One of the main benefits of frugal living is better financial control. By being mindful of your expenses, you can avoid unnecessary debt, build savings, and achieve financial goals faster.'
              : 'Salah satu manfaat utama dari frugal living adalah kontrol keuangan yang lebih baik. Dengan lebih sadar terhadap pengeluaran, kamu bisa menghindari utang yang tidak perlu, menabung lebih banyak, dan mencapai tujuan keuangan lebih cepat.'
          }}
        </p>
        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? 'Frugal living also reduces stress related to money. When you live below your means, you have more peace of mind and flexibility to handle unexpected expenses.'
              : 'Frugal living juga membantu mengurangi stres yang berkaitan dengan uang. Ketika kamu hidup di bawah kemampuan finansialmu, kamu akan merasa lebih tenang dan lebih siap menghadapi pengeluaran tak terduga.'
          }}
        </p>
        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? 'Beyond financial gains, frugal living encourages a more intentional and meaningful lifestyle. You learn to appreciate what you have, consume less, and focus on what truly brings you value.'
              : 'Selain keuntungan finansial, frugal living mendorong gaya hidup yang lebih sadar dan bermakna. Kamu belajar menghargai apa yang dimiliki, mengurangi konsumsi berlebihan, dan fokus pada hal-hal yang benar-benar memberi nilai.'
          }}
        </p>

        <h2 class="text-2xl font-semibold mt-8 mb-3 text-gray-900">
          {{ isEnglish ? 'Examples of frugal living' : 'Contoh frugal living' }}
        </h2>

        <ul class="list-disc">
          <li class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? 'Cooking at home instead of eating out regularly. This saves a lot of money over time and helps control your nutrition.'
                : 'Memasak di rumah daripada sering makan di luar. Ini bisa menghemat banyak uang dalam jangka panjang dan juga lebih sehat.'
            }}
          </li>

          <li class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? 'Using a shopping list to avoid impulsive purchases at the supermarket.'
                : 'Menggunakan daftar belanja agar tidak membeli barang secara impulsif di supermarket.'
            }}
          </li>

          <li class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? 'Buying secondhand items such as clothes, furniture, or electronics that are still in good condition.'
                : 'Membeli barang bekas seperti pakaian, furnitur, atau elektronik yang masih layak pakai.'
            }}
          </li>

          <li class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? 'Canceling unused subscriptions like streaming services, gyms, or apps that are no longer beneficial.'
                : 'Berhenti berlangganan layanan seperti streaming, gym, atau aplikasi yang sudah jarang digunakan.'
            }}
          </li>

          <li class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? 'Using a reusable water bottle instead of constantly buying bottled water.'
                : 'Menggunakan botol minum isi ulang daripada terus membeli air kemasan.'
            }}
          </li>

          <li class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? 'Choosing to repair clothes, electronics, or furniture instead of replacing them immediately.'
                : 'Memperbaiki pakaian, elektronik, atau furnitur daripada langsung menggantinya.'
            }}
          </li>

          <li class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? 'Taking advantage of discounts, cashback, or reward programs when shopping.'
                : 'Memanfaatkan diskon, cashback, atau program poin saat berbelanja.'
            }}
          </li>

          <li class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? 'Using public transportation or biking instead of owning a car, especially in urban areas.'
                : 'Menggunakan transportasi umum atau bersepeda daripada memiliki mobil sendiri, terutama di kota besar.'
            }}
          </li>

          <li class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? 'Limiting eating out to special occasions and treating it as a luxury, not a routine.'
                : 'Membatasi makan di luar hanya untuk momen spesial dan menganggapnya sebagai kemewahan, bukan rutinitas.'
            }}
          </li>

          <li class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? 'Sharing streaming accounts (legally) with family members to split costs.'
                : 'Berbagi akun layanan streaming (secara legal) dengan anggota keluarga untuk menghemat biaya.'
            }}
          </li>
        </ul>
        <h1 class="text-2xl mt-8 mb-3 font-bold text-gray-900">
          {{ isEnglish ? 'Managing Your Finances Wisely' : 'Mengatur Keuangan dengan Bijak' }}
        </h1>
        <img
          src="/images/blogs/frugallivingtips/managingmoney.webp"
          alt="Illustration of people managing money"
          class="w-full h-full max-h-120 object-cover object-center mb-3"
        />
        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? 'Managing your finances wisely is a crucial life skill that helps you stay in control, avoid unnecessary debt, and build a secure future.'
              : 'Mengatur keuangan dengan bijak adalah keterampilan hidup penting yang membantu kamu tetap terkendali, menghindari utang yang tidak perlu, dan membangun masa depan yang aman.'
          }}
        </p>

        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? 'Without proper financial planning, it’s easy to overspend, fall into debt, and struggle to save for emergencies or long-term goals.'
              : 'Tanpa perencanaan keuangan yang tepat, kita mudah menghabiskan uang secara berlebihan, terjebak dalam utang, dan kesulitan menabung untuk keadaan darurat atau tujuan jangka panjang.'
          }}
        </p>

        <h2 class="text-2xl font-semibold mt-8 mb-3 text-gray-900">
          {{
            isEnglish
              ? 'Basic principles of financial management'
              : 'Prinsip dasar dalam mengatur keuangan'
          }}
        </h2>
        <ul class="list-disc pl-5">
          <li class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? 'Track your income and expenses regularly.'
                : 'Catat pendapatan dan pengeluaran secara rutin.'
            }}
          </li>
          <li class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? 'Create a realistic monthly budget.'
                : 'Buat anggaran bulanan yang realistis.'
            }}
          </li>
          <li class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? 'Prioritize savings — pay yourself first.'
                : 'Utamakan menabung — bayarlah diri sendiri lebih dulu.'
            }}
          </li>
          <li class="text-gray-700 leading-relaxed mb-4">
            {{ isEnglish ? 'Avoid impulsive purchases.' : 'Hindari belanja impulsif.' }}
          </li>
          <li class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? 'Set financial goals (short and long-term).'
                : 'Tetapkan tujuan keuangan (jangka pendek dan panjang).'
            }}
          </li>
        </ul>

        <h2 class="text-2xl font-semibold mt-8 mb-3 text-gray-900">
          {{
            isEnglish
              ? 'Practical tips to manage your money better'
              : 'Tips praktis agar keuangan lebih teratur'
          }}
        </h2>
        <img
          src="/images/blogs/frugallivingtips/budgeting.webp"
          alt="Illustration of 50/30/20 rules of money"
          class="w-full h-full max-h-150 object-cover object-top mb-3"
        />
        <ul class="list-disc pl-5">
          <li class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? 'Use financial apps or spreadsheets to monitor your cash flow.'
                : 'Gunakan aplikasi keuangan atau spreadsheet untuk memantau arus kas.'
            }}
          </li>
          <li class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? 'Cook more at home and reduce unnecessary subscriptions.'
                : 'Lebih sering masak di rumah dan kurangi langganan yang tidak perlu.'
            }}
          </li>
          <li class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? 'Use the 50/30/20 budgeting rule: 50% needs, 30% wants, 20% savings.'
                : 'Gunakan aturan anggaran 50/30/20: 50% kebutuhan, 30% keinginan, 20% tabungan.'
            }}
          </li>
          <li class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? 'Review your spending habits monthly and make improvements.'
                : 'Tinjau kebiasaan belanja setiap bulan dan lakukan perbaikan.'
            }}
          </li>
        </ul>

        <h2 class="text-2xl font-semibold mt-8 mb-3 text-gray-900">
          {{ isEnglish ? 'Conclusion' : 'Kesimpulan' }}
        </h2>
        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? 'Frugal living is not about deprivation or being cheap — it’s about being intentional and wise with your resources. By spending mindfully, prioritizing what truly matters, and avoiding unnecessary expenses, you can gain greater financial freedom, reduce stress, and live a more meaningful life.'
              : 'Frugal living bukanlah tentang hidup serba kekurangan atau menjadi pelit — tapi tentang menggunakan sumber daya secara bijak dan penuh kesadaran. Dengan berbelanja secara cermat, memprioritaskan hal yang benar-benar penting, dan menghindari pengeluaran yang tidak perlu, kamu bisa meraih kebebasan finansial yang lebih besar, mengurangi stres, dan menjalani hidup yang lebih bermakna.'
          }}
        </p>
      </div>
    </div>
  </BlogComponent>
  <!-- Related Articles -->
  <section class="mt-12 mx-auto lg:max-w-4xl w-full flex flex-col justify-center pb-8 px-8">
    <h2 class="text-2xl font-bold text-gray-900 text-left mb-6">Related Articles</h2>
    <div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <card-blog
          v-for="blog in relatedBlog"
          :key="blog.id"
          :id="blog.id"
          :picture="blog.picture_path"
          :path="blog.path"
          :reader="blog.total_read"
          :title="blog.title"
          :like-total="blog.like"
          :desc="blog.description"
          :tags="blog.tags"
          :date_published="blog.date_published"
        />
      </div>
    </div>
  </section>
</template>
