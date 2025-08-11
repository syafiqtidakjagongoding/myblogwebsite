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
const articleCode = 'donald_trump_pro_crypto'
const isEnglish = computed(() => lang.language === 'en')
useHead({
  title: 'Donald Trump Supports Bitcoin – How Will It Shape the Crypto Landscape?',
  link: [
    {
      rel: 'canonical',
      href: `${import.meta.env.VITE_BASE_URL}/blog/politic/donald-trump-pro-crypto`,
    },
  ],
  meta: [
    {
      name: 'description',
      content:
        'Donald Trump has voiced strong support for cryptocurrency ahead of the 2024 U.S. election',
    },
    {
      name: 'keywords',
      content: 'crypto,donald trump, bitcoin,cryptocurrency, US',
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
          ? 'Donald Trump Supports Bitcoin – How Will It Shape the Crypto Landscape?'
          : 'Donald Trump Dukung Bitcoin – Apa Dampaknya bagi Masa Depan Crypto?'
      }}
    </h1>

    <p
      class="text-lg text-gray-600 mb-6 leading-relaxed"
      v-html="
        isEnglish
          ? 'Former U.S. President Donald Trump has expressed support for cryptocurrencies like Bitcoin. With the 2024 election approaching, his pro-crypto stance could reshape America’s blockchain regulations and global crypto policies.'
          : 'Mantan Presiden AS Donald Trump menyatakan dukungan terhadap cryptocurrency seperti Bitcoin. Menjelang pemilu 2024, sikap pro-cryptonya bisa mengubah regulasi blockchain Amerika dan arah kebijakan crypto global.'
      "
    ></p>

    <!-- Featured Image -->
    <div class="relative">
      <img
        src="/images/blogs/trumpprocrypto/trump.webp"
        alt="Donald Trump and Bitcoin"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Article Content -->
    <div class="px-2 py-8">
      <div class="max-w-none">
        <!-- Section 1 -->
        <h2 class="text-2xl font-semibold mt-8 mb-3 text-gray-900">
          {{
            isEnglish
              ? 'Why is Donald Trump Suddenly Pro-Crypto?'
              : 'Mengapa Donald Trump Mendadak Pro-Crypto?'
          }}
        </h2>

        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? 'In recent statements, Trump emphasized that the U.S. should lead in innovation, including blockchain and digital assets. While he was skeptical in the past, he now sees crypto as a strategic asset—especially as Biden’s administration enforces stricter crypto regulations.'
              : 'Dalam pernyataan terbaru, Trump menekankan bahwa AS harus memimpin inovasi, termasuk blockchain dan aset digital. Meski dulu skeptis, kini ia melihat crypto sebagai aset strategis—terutama saat pemerintahan Biden semakin ketat terhadap industri ini.'
          }}
        </p>

        <!-- Section 2 -->
        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? 'Trump’s campaign has even started accepting crypto donations, signaling a bold shift in how political campaigns interact with digital finance.'
              : 'Bahkan kampanye Trump sudah mulai menerima donasi crypto, yang menandakan perubahan besar dalam cara politik berinteraksi dengan keuangan digital.'
          }}
        </p>

        <!-- Section 3 -->
        <h2 class="text-2xl font-semibold mt-8 mb-3 text-gray-900">
          {{
            isEnglish
              ? 'Potential Impact on the Crypto Market'
              : 'Dampak Potensial pada Pasar Crypto'
          }}
        </h2>

        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? 'If Trump returns to the White House, the crypto market could benefit from friendlier policies, reduced regulation, and government support for blockchain development. This could boost investor confidence and accelerate adoption in the U.S.'
              : 'Jika Trump kembali ke Gedung Putih, pasar crypto berpotensi mendapat keuntungan dari kebijakan yang lebih ramah, pengurangan regulasi, dan dukungan pemerintah terhadap pengembangan blockchain. Hal ini bisa meningkatkan kepercayaan investor dan mempercepat adopsi crypto di AS.'
          }}
        </p>

        <!-- Section 4 -->
        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? 'However, critics warn that deregulation might open the door to scams or financial instability. Balancing innovation and safety will be key.'
              : 'Namun, para kritikus memperingatkan bahwa deregulasi bisa membuka celah bagi penipuan atau ketidakstabilan keuangan. Menemukan keseimbangan antara inovasi dan keamanan akan menjadi kuncinya.'
          }}
        </p>

        <!-- Image -->
        <img
          src="/images/blogs/trumpprocrypto/bitcoin.jpg"
          alt="Bitcoin illustration"
          class="w-full h-full max-h-120 object-cover object-center mb-3"
        />

        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? 'Three major crypto companies have invested around $150 million to support pro-crypto candidates in the U.S. Congress. Meanwhile, Trump proudly declared himself as “the first major party nominee in history to accept Bitcoin and crypto donations,” revealing his campaign raised $25 million in crypto contributions over just two months.'
              : 'Tiga perusahaan crypto besar telah menginvestasikan sekitar $150 juta untuk mendukung kandidat pro-crypto di Kongres AS. Sementara itu, Trump dengan bangga menyebut dirinya sebagai “calon dari partai besar pertama dalam sejarah yang menerima donasi Bitcoin dan crypto,” dengan kampanyenya berhasil mengumpulkan $25 juta dalam dua bulan terakhir.'
          }}
        </p>

        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? 'Trump promised massive deregulation and the creation of a “strategic national Bitcoin stockpile,” positioning the U.S. as a future leader in crypto. He declared, “America will be the crypto capital of the world and a Bitcoin superpower,” emphasizing values like privacy, property rights, and freedom of transaction.'
              : 'Trump menjanjikan deregulasi besar-besaran dan pembentukan “cadangan nasional Bitcoin strategis,” dengan tujuan menjadikan AS sebagai pemimpin masa depan dalam dunia crypto. Ia menyatakan, “Amerika akan menjadi pusat crypto dunia dan kekuatan super Bitcoin,” sambil menekankan nilai-nilai seperti privasi, hak milik, dan kebebasan bertransaksi.'
          }}
        </p>

        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? 'Trump vowed to stop any plans for a U.S. central bank digital currency (CBDC), a concept many crypto advocates oppose. He also pledged to form a “Bitcoin and crypto presidential advisory council,” made up of people who support the industry, not oppose it.'
              : 'Trump berjanji akan menghentikan rencana pembuatan mata uang digital bank sentral AS (CBDC), yang selama ini banyak ditentang oleh komunitas crypto. Ia juga bertekad membentuk “dewan penasihat presiden untuk Bitcoin dan crypto,” yang anggotanya berasal dari pihak-pihak yang mendukung industri ini, bukan yang menentangnya.'
          }}
        </p>

        <!-- Image -->
        <img
          src="/images/blogs/trumpprocrypto/chartstock.webp"
          alt="Bitcoin illustration"
          class="w-full h-full max-h-120 object-cover object-center mb-3"
        />

        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? 'Although Trump didn’t specify how these crypto-friendly policies would be implemented, he strongly criticized the Biden administration and the SEC’s chairman, Gary Gensler, for their aggressive regulatory actions. He promised to fire Gensler “on day one,” receiving loud cheers from the crowd.'
              : 'Meski Trump belum menjelaskan secara detail bagaimana kebijakan pro-crypto ini akan dijalankan, ia secara keras mengkritik pemerintahan Biden dan Ketua SEC, Gary Gensler, atas tindakan regulasi yang dianggap terlalu ketat. Ia berjanji akan memecat Gensler “di hari pertama,” yang disambut sorakan meriah dari para pendukungnya.'
          }}
        </p>

        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? 'He also mocked prominent Democrats like Elizabeth Warren and Kamala Harris, accusing them of being “anti-crypto” and labeling current law enforcement actions against crypto users as fascist. “These totalitarians want to destroy crypto,” Trump said.'
              : 'Trump juga mengejek tokoh Demokrat seperti Elizabeth Warren dan Kamala Harris, menuduh mereka “anti-crypto” dan menyamakan tindakan hukum terhadap pengguna crypto sebagai bentuk fasisme. “Para totalitarian ini ingin menghancurkan crypto,” ucap Trump.'
          }}
        </p>

        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? 'Robert F. Kennedy Jr., who also spoke at the Bitcoin conference, accused Trump of being late to support crypto and highlighted that during his presidency, Trump often criticized Bitcoin. Kennedy also pointed out Trump’s past comments calling Bitcoin “a scam.”'
              : 'Robert F. Kennedy Jr., yang juga berbicara di konferensi Bitcoin, menuding Trump terlambat mendukung crypto dan mengingatkan bahwa selama masa jabatannya, Trump sering mengkritik Bitcoin. Kennedy juga menyinggung pernyataan Trump sebelumnya yang menyebut Bitcoin sebagai “penipuan.”'
          }}
        </p>

        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? 'Responding to the crowd, Trump promised to commute the sentence of Ross Ulbricht, founder of Silk Road, who many in the crypto community view as a martyr. This announcement received strong approval from attendees.'
              : 'Menanggapi sorakan dari audiens, Trump berjanji akan meringankan hukuman Ross Ulbricht, pendiri Silk Road, yang dianggap sebagai martir oleh sebagian komunitas crypto. Pernyataan ini disambut dengan antusias oleh para peserta konferensi.'
          }}
        </p>

        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? 'We are standing at the edge of a new financial revolution. As digital assets gain momentum, political figures like Donald Trump stepping in can change the narrative—either accelerating adoption or intensifying the debate. Whether driven by innovation, politics, or public demand, one thing is clear: crypto is no longer just a trend; it’s a movement shaping the future of global finance.'
              : 'Kita sedang berada di ambang revolusi finansial baru. Saat aset digital semakin berkembang, keterlibatan tokoh politik seperti Donald Trump bisa mengubah arah cerita—baik mempercepat adopsi, maupun memicu perdebatan yang lebih luas. Apakah didorong oleh inovasi, politik, atau permintaan publik, satu hal yang pasti: crypto bukan lagi sekadar tren, melainkan sebuah gerakan yang membentuk masa depan keuangan global.'
          }}
        </p>

        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? 'As the 2024 U.S. election approaches, crypto has become more than just a tech issue—it’s now part of the political battleground. The question remains: will this lead to progress, or more division? Only time—and the voters—will decide.'
              : 'Menjelang Pemilu AS 2024, crypto bukan lagi isu teknologi semata—tetapi sudah masuk ke dalam arena pertempuran politik. Pertanyaannya, apakah ini akan membawa kemajuan atau justru perpecahan? Hanya waktu—dan para pemilih—yang akan menjawabnya.'
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
