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
const articleCode = 'genz_spending_habits'
const isEnglish = computed(() => lang.language === 'en')
useHead({
  title: "Why Indonesia's Gen Z Spending Habits Are Raising Eyebrows ",
  link: [
    {
      rel: 'canonical',
      href: `${import.meta.env.VITE_BASE_URL}/blog/education/gen-z-spending-habits-indonesia`,
    },
  ],
  meta: [
    {
      name: 'description',
      content:
        'Why do Indonesia’s Gen Z spend heavily on virtual items, concerts, and lifestyle trends? We explore the cultural, social, and financial factors shaping their unique consumption patterns.',
    },
    {
      name: 'keywords',
      content: 'genz, spending habits, investing, finance,people, managing money',
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
          ? "Why Indonesia's Gen Z Spending Habits Are Raising Eyebrows"
          : 'Kenapa Kebiasaan Pengeluaran Gen Z di Indonesia Bikin Geleng Kepala'
      }}
    </h1>
    <p
      class="text-lg text-gray-600 mb-6 leading-relaxed"
      v-html="
        isEnglish
          ? 'Why do Indonesia’s Gen Z spend heavily on virtual items, concerts, and lifestyle trends? We explore the cultural, social, and financial factors shaping their unique consumption patterns.'
          : 'Kenapa Gen Z di Indonesia banyak menghabiskan uang untuk barang virtual, konser, dan tren gaya hidup? Artikel ini membahas faktor budaya, sosial, dan finansial yang membentuk pola konsumsi unik mereka.'
      "
    ></p>
    <!-- Featured Image -->
    <div class="relative">
      <img
        src="/images/blogs/genzspendinghabits/peopleshopping.webp"
        alt="Illustration of people shopping"
        class="w-full h-full max-h-140 object-top object-cover"
      />
    </div>

    <!-- Article Content -->
    <div class="px-2 py-8">
      <div class="max-w-none">
        <h2 class="text-2xl font-semibold mb-3 text-gray-900">
          {{
            isEnglish
              ? 'Trends Behind Gen Z’s Spending in Indonesia'
              : 'Tren di Balik Pengeluaran Gen Z Indonesia'
          }}
        </h2>
        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? "Indonesia's Gen Z spending habits are shaped by a mix of cultural shifts, digital influence, and lifestyle aspirations. While older generations often prioritize savings and stability, Gen Z tends to seek instant gratification and unique experiences, leading to spending choices that many see as unusual or even reckless."
              : 'Kebiasaan pengeluaran Gen Z Indonesia dipengaruhi oleh perpaduan perubahan budaya, pengaruh digital, dan aspirasi gaya hidup. Jika generasi sebelumnya lebih mengutamakan tabungan dan stabilitas, Gen Z cenderung mengejar kepuasan instan dan pengalaman unik, sehingga sering membuat pilihan pengeluaran yang dianggap tidak biasa bahkan nekat.'
          }}
        </p>

        <h3 class="text-xl font-semibold mt-6 mb-2 text-gray-900">
          {{
            isEnglish
              ? '1. Topup Games and Microtransactions'
              : '1. Pembelian Game dan Mikrotransaksi'
          }}
        </h3>
        <img
          src="/images/blogs/genzspendinghabits/topupgame.webp"
          alt="Illustration of people topup game"
          class="w-full h-full max-h-120 object-center object-cover"
        />
        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? "Top-up games have evolved into a highly profitable entertainment model, blending psychology and game design to encourage continuous spending. Beyond the thrill of chance, developers use limited-time offers, seasonal events, and exclusive skins to trigger urgency. Many Gen Z players see small purchases—just a few dollars at a time—as harmless fun, but the frequency and accumulation can lead to hundreds of dollars spent over months or years. Social pressure also plays a role, as friends or online communities often compare in-game items, indirectly pushing players to spend more to 'keep up'. For some, the spending becomes less about enjoyment and more about maintaining a certain status in the game."
              : "Top-up game telah berkembang menjadi model hiburan yang sangat menguntungkan, memadukan psikologi dan desain game untuk mendorong pengeluaran secara terus-menerus. Selain sensasi mendapatkan hadiah acak, pengembang memanfaatkan penawaran terbatas, event musiman, dan skin eksklusif untuk memicu rasa urgensi. Banyak pemain Gen Z menganggap pembelian kecil—hanya beberapa ribu atau puluh ribu rupiah—sebagai hiburan yang tidak berbahaya, namun frekuensi dan akumulasi pengeluaran ini bisa mencapai ratusan ribu hingga jutaan rupiah dalam hitungan bulan atau tahun. Tekanan sosial juga berperan, karena teman atau komunitas online sering membandingkan item dalam game, secara tidak langsung mendorong pemain untuk terus top-up agar 'tidak ketinggalan'. Bagi sebagian orang, pengeluaran ini akhirnya bukan lagi demi kesenangan, melainkan demi mempertahankan status tertentu di dalam game."
          }}
        </p>

        <h3 class="text-xl font-semibold mt-6 mb-2 text-gray-900">
          {{ isEnglish ? '2. Concerts and Live Events' : '2. Konser dan Acara Live' }}
        </h3>
        <img
          src="/images/blogs/genzspendinghabits/live-concert.webp"
          alt="Illustration of people watching concert"
          class="w-full h-full max-h-100 object-center object-cover"
        />
        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? "Concerts have evolved into more than just live music—they're now status symbols, social milestones, and content creation opportunities. For many in Gen Z, attending a major concert isn’t only about enjoying the performance, but also about proving they were there, often documented through Instagram stories, TikTok videos, and selfies with exclusive merchandise. The fear of missing out (FOMO) is a huge driver, with limited ticket sales creating urgency and hype months in advance. Prices for front-row seats or VIP packages can reach millions of rupiah, yet fans justify the expense as a 'once-in-a-lifetime' memory. In many cases, the experience is as much about the social validation and shared excitement as it is about the music itself."
              : "Konser telah berkembang menjadi lebih dari sekadar pertunjukan musik langsung—sekarang menjadi simbol status, pencapaian sosial, sekaligus momen untuk membuat konten. Bagi banyak Gen Z, menghadiri konser besar bukan hanya soal menikmati penampilan, tetapi juga soal membuktikan bahwa mereka pernah ada di sana, yang sering diabadikan melalui Instagram story, video TikTok, dan swafoto bersama merchandise eksklusif. Rasa takut ketinggalan (FOMO) menjadi pendorong besar, dengan penjualan tiket terbatas yang memicu urgensi dan hype berbulan-bulan sebelumnya. Harga tiket untuk barisan depan atau paket VIP bisa mencapai jutaan rupiah, namun para penggemar membenarkannya sebagai kenangan 'sekali seumur hidup'. Dalam banyak kasus, pengalaman ini sama besarnya nilainya untuk validasi sosial dan kegembiraan bersama, bukan hanya untuk musik itu sendiri."
          }}
        </p>

        <h3 class="text-xl font-semibold mt-6 mb-2 text-gray-900">
          {{
            isEnglish
              ? '3. Online Tipping and donate useless influencer'
              : '3. Budaya donate Online influencer sampah'
          }}
        </h3>
        <img
          src="/images/blogs/genzspendinghabits/donatevtuber.webp"
          alt="Illustration of donate vtuber"
          class="w-full h-full max-h-100 object-center object-cover"
        />
        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? "Streaming platforms and social media live sessions have popularized online tipping, or donate useless influencer. While originally intended as a way to support content creators, many Gen Z viewers overspend for attention, fleeting recognition, or even the illusion of a personal connection. Some go as far as daydreaming about dating or 'marrying' their favorite VTuber or streamer, seeing them not just as entertainers but as idealized partners. This parasocial relationship creates a powerful emotional hook, making viewers more willing to drop large sums just to receive a shout-out or a few seconds of direct interaction. What starts as small, harmless contributions can quickly snowball into financially damaging habits."
              : "Platform streaming dan sesi live di media sosial telah mempopulerkan budaya 'sawer' online. Awalnya dimaksudkan sebagai cara untuk mendukung kreator, banyak penonton Gen Z yang justru berlebihan demi mendapatkan perhatian, pengakuan singkat, atau bahkan ilusi hubungan pribadi. Beberapa sampai berkhayal untuk berpacaran atau 'menikahi' VTuber atau streamer favorit mereka, memandangnya bukan sekadar sebagai penghibur tetapi sebagai pasangan ideal yang sempurna di mata mereka. Hubungan parasosial seperti ini menciptakan ikatan emosional yang kuat, membuat penonton rela mengeluarkan uang besar hanya untuk mendapatkan sapaan atau interaksi langsung beberapa detik. Apa yang awalnya berupa kontribusi kecil yang terasa wajar dapat dengan cepat berubah menjadi kebiasaan yang merusak finansial."
          }}
        </p>

        <h3 class="text-xl font-semibold mt-6 mb-2 text-gray-900">
          {{
            isEnglish
              ? '4. Prestige Purchases Like iPhones'
              : '4. Pembelian Bergengsi seperti iPhone'
          }}
        </h3>
        <img
          src="/images/blogs/genzspendinghabits/iphone.webp"
          alt="Illustration of iphone"
          class="w-full h-full max-h-80 object-center object-cover"
        />
        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? 'For many, owning the latest iPhone is not merely about having advanced technology—it’s a status symbol, a marker of lifestyle, and a ticket to social belonging. In certain circles, especially among Gen Z, not having the latest model can create subtle feelings of exclusion or inferiority. Social media amplifies this pressure, as influencers and peers flaunt their new devices, often associating them with success and modernity. This prestige-driven mindset leads some to prioritize brand image over practicality, sometimes opting for expensive installment plans or even taking on debt just to keep up appearances. In the end, the purchase becomes less about functional needs and more about maintaining a certain image in the eyes of others.'
              : 'Bagi banyak orang, memiliki iPhone terbaru bukan hanya soal teknologi canggih—ini adalah simbol status, penanda gaya hidup, dan tiket untuk diterima dalam pergaulan. Di kalangan tertentu, terutama Gen Z, tidak memiliki model terbaru bisa menimbulkan rasa tersisih atau minder secara halus. Media sosial memperkuat tekanan ini, ketika influencer dan teman sebaya memamerkan perangkat baru mereka, sering kali mengaitkannya dengan kesuksesan dan kemodernan. Pola pikir yang berorientasi gengsi ini membuat sebagian orang mengutamakan citra merek dibandingkan kepraktisan, bahkan rela mengambil cicilan mahal atau berutang hanya demi menjaga penampilan. Pada akhirnya, pembelian ini bukan lagi soal kebutuhan fungsional, melainkan demi mempertahankan citra tertentu di mata orang lain.'
          }}
        </p>

        <h3 class="text-xl font-semibold mt-6 mb-2 text-gray-900">
          {{ isEnglish ? '5. Viral Trends and FOMO' : '5. Tren Viral dan FOMO' }}
        </h3>
        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? "Fear of Missing Out (FOMO) pushes Gen Z to chase every viral trend—whether it's limited fashion drops, exclusive merchandise, or special edition gadgets. Social media plays a huge role, with influencers and peers showcasing their latest purchases in real-time, creating a sense of urgency and scarcity. This constant exposure builds the belief that if they don’t buy now, they’re missing out on a once-in-a-lifetime opportunity. The psychological pressure can lead to impulsive purchases that might offer short-term satisfaction but strain long-term financial stability. Over time, this cycle of chasing trends can create a habit where self-worth is measured by how current and trendy one’s possessions are."
              : 'Fear of Missing Out (FOMO) mendorong Gen Z untuk mengejar setiap tren viral—mulai dari perilisan fashion terbatas, merchandise eksklusif, hingga gadget edisi khusus. Media sosial memegang peran besar, dengan influencer dan teman sebaya memamerkan pembelian terbaru mereka secara real-time, menciptakan rasa urgensi dan kelangkaan. Paparan yang terus-menerus ini membentuk keyakinan bahwa jika tidak membeli sekarang, mereka akan melewatkan kesempatan sekali seumur hidup. Tekanan psikologis ini sering memicu pembelian impulsif yang mungkin memberi kepuasan sesaat, namun membebani kestabilan finansial jangka panjang. Lama-kelamaan, siklus mengejar tren ini dapat menciptakan kebiasaan di mana harga diri diukur dari seberapa terkini dan trendi barang yang dimiliki.'
          }}
        </p>

        <h2 class="text-2xl font-semibold mt-8 mb-3 text-gray-900">
          {{
            isEnglish
              ? 'How Gen Z Can Spend Smarter'
              : 'Cara Gen Z Mengelola Pengeluaran dengan Lebih Bijak'
          }}
        </h2>

        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? 'The first step is awareness—tracking daily expenses to understand where the money goes. Many overspending habits come from not realizing how much is spent on small, repeated purchases.'
              : 'Langkah pertama adalah kesadaran—mencatat pengeluaran harian untuk memahami kemana uang pergi. Banyak kebiasaan boros berasal dari ketidaksadaran akan besarnya biaya dari pembelian kecil yang berulang.'
          }}
        </p>

        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? 'Set clear financial goals, both short and long-term. When there’s a concrete target—like saving for a business, education, or travel—it becomes easier to say no to impulsive spending.'
              : 'Tetapkan tujuan keuangan yang jelas, baik jangka pendek maupun jangka panjang. Saat ada target nyata—seperti menabung untuk usaha, pendidikan, atau perjalanan—lebih mudah untuk menolak pengeluaran impulsif.'
          }}
        </p>

        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? 'Learn to separate wants from needs. Just because something is trending doesn’t mean it’s essential. Waiting 24–48 hours before buying can help curb unnecessary purchases.'
              : 'Belajar membedakan keinginan dan kebutuhan. Hanya karena sesuatu sedang tren, bukan berarti itu penting. Menunggu 24–48 jam sebelum membeli dapat membantu menghindari pembelian yang tidak perlu.'
          }}
        </p>

        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? 'Find alternative sources of joy that don’t require overspending—such as free events, skill-building hobbies, or content creation that could even generate income.'
              : 'Cari sumber kebahagiaan alternatif yang tidak memerlukan banyak biaya—seperti menghadiri acara gratis, hobi yang mengasah keterampilan, atau membuat konten yang bahkan bisa menghasilkan uang.'
          }}
        </p>

        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? 'Lastly, build a support system of like-minded friends who value mindful spending. Social influence works both ways—being around people with good financial habits can inspire better choices.'
              : 'Terakhir, bangun lingkungan pertemanan yang memiliki pola pikir pengeluaran bijak. Pengaruh sosial bekerja dua arah—berada di sekitar orang dengan kebiasaan keuangan yang sehat dapat menginspirasi keputusan yang lebih baik.'
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
