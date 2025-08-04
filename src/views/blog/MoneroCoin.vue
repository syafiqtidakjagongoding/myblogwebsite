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
const articleCode = 'whatis_monerocoin'
const isEnglish = computed(() => lang.language === 'en')
useHead({
  title: 'Syafiq Blog | What is monero ?',
  link: [
    {
      rel: 'canonical',
      href: `${import.meta.env.VITE_BASE_URL}/blog/tech/what-is-monero`,
    },
  ],
  meta: [
    {
      name: 'description',
      content: 'This is a monero coin blog',
    },
    {
      name: 'keywords',
      content: 'monero, cryptocurrency, monerocoin, whatismonero',
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
      {{ isEnglish ? 'Tired of Traceable Crypto? Here’s Why Monero Is Different' : 'Ingin Transaksi Kripto Tanpa Jejak? Monero Jawabannya!' }}
    </h1>

    <p
      class="text-lg text-gray-600 mb-6 leading-relaxed"
      v-html="
        isEnglish
          ? 'Monero is a <strong>privacy-focused cryptocurrency</strong> that allows secure and anonymous transactions. Unlike Bitcoin, Monero hides sender, receiver, and amount.'
          : 'Monero adalah <strong>cryptocurrency yang fokus pada privasi</strong> dan memungkinkan transaksi yang aman dan anonim. Berbeda dengan Bitcoin, Monero menyembunyikan pengirim, penerima, dan jumlah transaksi.'
      "
    ></p>

    <!-- Featured Image -->
    <div class="relative">
      <img
        src="/images/blogs/monerocoin/monero.png"
        alt="Illustration of Monero coin"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Article Content -->
    <div class="px-2 py-8">
      <div class="max-w-none">
        <h1 class="text-2xl font-semibold mt-8 mb-3 text-gray-900">
          🔐 {{ isEnglish ? 'How Does Monero Work?' : 'Bagaimana Cara Kerja Monero?' }}
        </h1>
        <p
          class="mb-4"
          v-html="
            isEnglish
              ? 'Monero uses <strong>privacy-centric technologies</strong> to hide sender, receiver, and amount of every transaction. Key features include:'
              : 'Monero menggunakan <strong>teknologi yang fokus pada privasi</strong> untuk menyembunyikan pengirim, penerima, dan jumlah dari setiap transaksi. Fitur utama meliputi:'
          "
        ></p>
        <ul class="list-disc list-inside mb-6 space-y-1">
          <li>
            {{
              isEnglish
                ? 'Ring Signatures – hides the sender'
                : 'Ring Signature – menyembunyikan pengirim'
            }}
          </li>
          <li>
            {{
              isEnglish
                ? 'Stealth Addresses – hides the receiver'
                : 'Stealth Address – menyembunyikan penerima'
            }}
          </li>
          <li>
            {{
              isEnglish
                ? 'Confidential Transactions – hides the amount'
                : 'Confidential Transaction – menyembunyikan jumlah'
            }}
          </li>
        </ul>
        <p
          class="mb-4"
          v-html="
            isEnglish
              ? 'Unlike Bitcoin, where transaction history is public, Monero transactions are <strong>completely obfuscated</strong> by default.'
              : 'Berbeda dengan Bitcoin, di mana riwayat transaksi bersifat publik, transaksi Monero <strong>selalu disembunyikan</strong> secara default.'
          "
        ></p>

        <h2 class="text-2xl font-semibold mt-8 mb-3 text-gray-900">
          {{ isEnglish ? '🔏 Ring Signature' : '🔏 Ring Signature' }}
        </h2>
        <!-- Ilustrasi Ring Signature -->
        <img
          src="/images/blogs/monerocoin/ringsignature.png"
          alt="Ring Signature Illustration"
          class="w-full h-full object-cover"
        />

        <p
          class="mb-4"
          v-html="
            isEnglish
              ? 'Ring signature is a <strong>cryptographic method</strong> used by Monero to ensure that <strong>the sender remains anonymous</strong>. When someone sends a Monero transaction, their signature is combined with a group of other possible signers, forming a &quot;ring&quot;.'
              : 'Ring signature adalah <strong>metode kriptografi</strong> yang digunakan oleh Monero untuk memastikan bahwa <strong>pengirim tetap anonim</strong>. Saat seseorang mengirim transaksi Monero, tanda tangannya digabungkan dengan beberapa penandatangan lain yang mungkin, membentuk sebuah &quot;ring&quot;.'
          "
        ></p>

        <p
          class="mb-4"
          v-html="
            isEnglish
              ? 'This group of signatures makes it <em>mathematically impossible</em> to determine who actually sent the transaction, since all members of the ring appear equally likely to be the real sender.'
              : 'Kelompok tanda tangan ini membuatnya <em>secara matematis mustahil</em> untuk mengetahui siapa pengirim sebenarnya, karena semua anggota ring tampak sama kemungkinannya sebagai pengirim asli.'
          "
        ></p>

        <p
          class="mb-4"
          v-html="
            isEnglish
              ? 'Think of it like a group of people signing a document anonymously — an outsider can see that the document was signed, but <strong>can’t tell who exactly signed it</strong>. That’s how ring signatures protect the sender’s identity in Monero.'
              : 'Bayangkan seperti sekelompok orang yang menandatangani dokumen secara anonim — orang luar bisa melihat dokumen telah ditandatangani, tapi <strong>tidak bisa tahu siapa yang menandatanganinya</strong>. Seperti itulah ring signature melindungi identitas pengirim di Monero.'
          "
        ></p>

        <h2 class="text-2xl font-semibold mt-8 mb-3 text-gray-900">
          {{ isEnglish ? '🕵️‍♂️ Stealth Address' : '🕵️‍♂️ Alamat Stealth' }}
        </h2>
        <!-- Gambar ilustrasi Stealth Address -->
        <img
          src="/images/blogs/monerocoin/stealthaddress.png"
          alt="Stealth Address Illustration"
          class="w-full h-full object-cover"
        />
        <p
          class="mb-4"
          v-html="
            isEnglish
              ? 'A stealth address is a <strong>one-time, random address</strong> created for every Monero transaction. This feature ensures that <strong>only the sender and the receiver</strong> can detect where the funds went — no one else can track or link transactions on the blockchain.'
              : 'Alamat stealth adalah <strong>alamat acak sekali pakai</strong> yang dibuat untuk setiap transaksi Monero. Fitur ini memastikan bahwa <strong>hanya pengirim dan penerima</strong> yang bisa tahu ke mana dana dikirim — orang lain tidak bisa melacak atau menghubungkan transaksi di blockchain.'
          "
        ></p>

        <p
          class="mb-4"
          v-html="
            isEnglish
              ? 'Even if you post your Monero address publicly, nobody can see how much you’ve received or from whom. Every payment goes to a <em>unique stealth address</em>, making it <strong>impossible to link payments</strong> back to your public address.'
              : 'Bahkan jika kamu mempublikasikan alamat Monero kamu, orang lain tetap <em>tidak bisa melihat berapa banyak yang kamu terima</em> atau dari siapa. Setiap pembayaran masuk ke <em>alamat stealth unik</em>, membuatnya <strong>mustahil untuk dilacak kembali</strong> ke alamat publikmu.'
          "
        ></p>

        <p
          class="mb-4"
          v-html="
            isEnglish
              ? 'This technology is a core reason why Monero is considered <strong>fully private by default</strong>. Stealth addresses prevent blockchain analysis and protect the financial privacy of its users.'
              : 'Teknologi ini adalah alasan utama mengapa Monero dianggap <strong>sepenuhnya privat secara default</strong>. Alamat stealth mencegah analisis blockchain dan melindungi privasi finansial penggunanya.'
          "
        ></p>

        <h2 class="text-2xl font-semibold mt-8 mb-3 text-gray-900">
          {{
            isEnglish
              ? '🔒 RingCT (Ring Confidential Transactions)'
              : '🔒 RingCT (Ring Confidential Transactions)'
          }}
        </h2>

        <p
          class="mb-4"
          v-html="
            isEnglish
              ? 'RingCT is a technology used in Monero to <strong>hide the amount</strong> being sent in every transaction. Introduced in 2017, it’s an upgraded version of ring signatures that ensures <em>transaction amounts are kept completely confidential</em>.'
              : 'RingCT adalah teknologi yang digunakan dalam Monero untuk <strong>menyembunyikan jumlah</strong> yang dikirim dalam setiap transaksi. Diperkenalkan pada tahun 2017, ini adalah versi upgrade dari ring signature yang memastikan <em>jumlah transaksi tetap sepenuhnya rahasia</em>.'
          "
        ></p>

        <p
          class="mb-4"
          v-html="
            isEnglish
              ? 'When you send Monero, the blockchain does <strong>not reveal how much</strong> you’re sending. The amount is encrypted and only the sender and receiver can view the real value, while the network can still validate that no coins were created or destroyed.'
              : 'Saat kamu mengirim Monero, blockchain <strong>tidak akan menunjukkan berapa jumlah</strong> yang kamu kirim. Jumlah tersebut dienkripsi, dan hanya pengirim serta penerima yang bisa melihat nilainya. Sementara itu, jaringan tetap bisa memverifikasi bahwa tidak ada koin yang dibuat atau dihancurkan.'
          "
        ></p>

        <p
          class="mb-4"
          v-html="
            isEnglish
              ? 'Thanks to RingCT, Monero offers <strong>full transaction privacy</strong>: who sent it, who received it, and <em>how much</em> — all remain hidden from public view. This makes Monero one of the <strong>most private cryptocurrencies</strong> available.'
              : 'Berkat RingCT, Monero menawarkan <strong>privasi transaksi penuh</strong>: siapa pengirimnya, siapa penerimanya, dan <em>berapa jumlahnya</em> — semuanya tersembunyi dari publik. Ini membuat Monero menjadi salah satu <strong>kriptokurensi paling privat</strong> yang tersedia saat ini.'
          "
        ></p>

        <h2 class="text-2xl font-semibold mt-8 mb-3 text-gray-900">
          {{ isEnglish ? '🌼 Dandelion' : '🌼 Dandelion' }}
        </h2>

        <!-- Gambar ilustrasi Dandelion -->
        <img
          src="/images/blogs/monerocoin/dandelion.png"
          alt="Dandelion Illustration"
          class="w-full h-full object-cover"
        />

        <p
          class="mb-4"
          v-html="
            isEnglish
              ? 'Dandelion is a network-level privacy feature used in Monero to <strong>hide the sender & an IP address</strong> when broadcasting a transaction. Instead of broadcasting directly, the transaction is first routed quietly through a random path of nodes before it becomes visible to the network.'
              : 'Dandelion adalah fitur privasi di level jaringan yang digunakan oleh Monero untuk <strong>menyembunyikan alamat IP pengirim</strong> saat menyiarkan transaksi. Alih-alih langsung disiarkan, transaksi ini awalnya dilewatkan secara diam-diam melalui jalur node acak sebelum terlihat oleh jaringan.'
          "
        ></p>

        <p
          class="mb-4"
          v-html="
            isEnglish
              ? 'This process is divided into two phases: <em>stem phase</em> and <em>fluff phase</em>. During the stem phase, the transaction hops quietly from one node to another. Then in the fluff phase, it is finally broadcast to the full network.'
              : 'Proses ini dibagi menjadi dua fase: <em>fase stem</em> dan <em>fase fluff</em>. Di fase stem, transaksi berpindah secara diam-diam dari satu node ke node lainnya. Lalu pada fase fluff, transaksi akhirnya disiarkan ke seluruh jaringan.'
          "
        ></p>

        <p
          class="mb-4"
          v-html="
            isEnglish
              ? 'By using Dandelion, Monero helps protect users from attackers who try to <strong>trace transactions based on IP addresses</strong>. It adds another layer of anonymity, making it even harder to link a transaction to the original sender.'
              : 'Dengan menggunakan Dandelion, Monero membantu melindungi pengguna dari penyerang yang mencoba <strong>melacak transaksi berdasarkan alamat IP</strong>. Ini menambah lapisan anonimitas lain, yang membuat transaksi makin sulit dikaitkan dengan pengirim aslinya.'
          "
        ></p>

        <h2 class="text-2xl font-semibold mt-8 mb-3 text-gray-900">
          {{ isEnglish ? '🎯 Bulletproofs' : '🎯 Bulletproofs' }}
        </h2>

        <p
          class="mb-4"
          v-html="
            isEnglish
              ? 'Bulletproofs are a type of <strong>zero-knowledge proof</strong> used in Monero to make confidential transactions more efficient. They replace the older RingCT range proofs with <em>smaller and faster cryptographic proofs</em>, reducing the size of transactions significantly without compromising privacy.'
              : 'Bulletproofs adalah jenis <strong>zero-knowledge proof</strong> yang digunakan di Monero untuk membuat transaksi rahasia lebih efisien. Mereka menggantikan bukti rentang RingCT lama dengan <em>bukti kriptografi yang lebih kecil dan cepat</em>, sehingga ukuran transaksi berkurang secara signifikan tanpa mengorbankan privasi.'
          "
        ></p>

        <p
          class="mb-4"
          v-html="
            isEnglish
              ? 'In Monero, transaction amounts are hidden using RingCT. To prove that the hidden amount is valid (e.g., not negative or more than what the sender owns), Bulletproofs are used. They allow users to prove the correctness of the hidden amount <strong>without revealing it</strong>.'
              : 'Di Monero, jumlah transaksi disembunyikan menggunakan RingCT. Untuk membuktikan bahwa jumlah yang disembunyikan itu valid (misalnya tidak negatif atau melebihi saldo pengirim), digunakan Bulletproofs. Teknologi ini memungkinkan pengguna membuktikan bahwa jumlah tersebut sah <strong>tanpa mengungkapkan nilainya</strong>.'
          "
        ></p>

        <!-- Gambar ilustrasi Bulletproofs -->
        <!-- <img src="/images/blogs/monero/bulletproofs.png" alt="Bulletproofs Illustration" class="w-full h-full object-cover my-4 rounded-xl shadow-md" /> -->

        <p
          class="mb-4"
          v-html="
            isEnglish
              ? 'Thanks to Bulletproofs, Monero transaction sizes are up to <strong>80% smaller</strong> than before, which leads to <em>lower fees, faster verification</em>, and <strong>less blockchain bloat</strong>. This innovation improves scalability while keeping transactions fully private.'
              : 'Berkat Bulletproofs, ukuran transaksi Monero menjadi hingga <strong>80% lebih kecil</strong> dari sebelumnya, yang menghasilkan <em>biaya lebih rendah, verifikasi lebih cepat</em>, dan <strong>penggelembungan blockchain yang lebih kecil</strong>. Inovasi ini meningkatkan skalabilitas sambil menjaga privasi transaksi sepenuhnya.'
          "
        ></p>

        <h2 class="text-2xl font-semibold mt-8 mb-3 text-gray-900">
          {{ isEnglish ? '✅ Why Use Monero?' : '✅ Kenapa Harus Menggunakan Monero?' }}
        </h2>
        <ul class="list-disc list-inside mb-6 space-y-1">
          <li>{{ isEnglish ? 'Total privacy and anonymity' : 'Privasi dan anonimitas total' }}</li>
          <li>
            {{
              isEnglish
                ? 'Ideal for activists or whistleblowers'
                : 'Ideal untuk aktivis atau whistleblower'
            }}
          </li>
          <li>
            {{
              isEnglish
                ? 'Decentralized and censorship-resistant'
                : 'Desentralisasi dan tidak bisa disensor'
            }}
          </li>
        </ul>

        <h2 class="text-2xl font-semibold mt-8 mb-3 text-gray-900">
          {{ isEnglish ? '✉️ Final Thoughts' : '✉️ Penutup' }}
        </h2>
        <p
          class="mb-4"
          v-html="
            isEnglish
              ? 'Monero empowers users to take control of their financial privacy. In a world where surveillance is everywhere, <strong>Monero protects your freedom</strong>.'
              : 'Monero memberi kekuatan pada pengguna untuk mengendalikan privasi keuangannya. Di dunia yang penuh pengawasan, <strong>Monero melindungi kebebasan kamu</strong>.'
          "
        ></p>

        <p>
          {{
            isEnglish
              ? "Whether you're a tech-savvy user or just privacy-conscious — Monero is a great tool for secure, anonymous payments."
              : 'Baik kamu pengguna teknis atau hanya peduli pada privasi — Monero adalah alat hebat untuk pembayaran yang aman dan anonim'
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
