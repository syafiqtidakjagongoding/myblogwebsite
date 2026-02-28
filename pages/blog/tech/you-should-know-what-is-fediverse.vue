<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import BlogComponent from '@/components/BlogComponent.vue'
import { useLanguageStore } from '@/store/language'

import { getBlogByArticleCode, getCommentByArticleCode } from '@/lib/query'
import type { Comments } from '@/lib/types'

const config = useRuntimeConfig()

const lang = useLanguageStore()
const articleCode = 'you-should-know-what-is-fediverse'
const isEnglish = computed(() => lang.language === 'en')
useHead({
  title: 'What is fediverse ?',
  link: [
    {
      rel: 'canonical',
      href: `${config.public.baseUrl}/blog/tech/you-should-know-what-is-fediverse`,
    },
  ],
  meta: [
    {
      name: 'description',
      content:
        'The Fediverse (short for federated universe) is a network of independently hosted social platforms that can communicate with each other using open standards such as ActivityPub.',
    },
    {
      name: 'keywords',
      content: 'fediverse,social,social media,tech,decentralized,activitypub,mastodon,akkoma',
    },
  ],
})

const tags = ref<string[]>([])
const totalLike = ref<number>(0)
const id = ref<number>(0)
const comments = ref<Comments[] | null>([])
const reader = ref<number>(0)
const datePublished = ref<string | Date | null>(null)
async function getBlog() {
  const data = await getBlogByArticleCode(articleCode)
  if (!data) return
  tags.value = data.tags
  id.value = data.id
  reader.value = data.totalRead
  totalLike.value = data.like
  datePublished.value = data.datePublished
}
async function getComments() {
  const res = await getCommentByArticleCode(id.value)
  comments.value = res
}

onMounted(async () => {
  await getBlog()
  await Promise.all([getComments()])
})
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <div>
    <BlogComponent
      :id="id"
      :tags="tags"
      :total-like="totalLike"
      :date-published="datePublished"
      :reader="reader"
      :comments="comments"
    >
      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
        {{ isEnglish ? 'Ditch Big Tech: A Beginner\'s Guide to Fediverse' : 'Fediverse: Revolusi Media Sosial yang Perlu Kamu Ketahui' }}
      </h1>
      <p class="text-lg text-gray-600 mb-6 leading-relaxed">
        {{
          isEnglish
            ? 'The Fediverse (short for federated universe) is a network of independently hosted social platforms that can communicate with each other using open standards such as ActivityPub.'
            : 'Fediverse (singkat dari federated universe) adalah jaringan platform media sosial yang di-host secara independen dan dapat berkomunikasi satu sama lain menggunakan standar terbuka seperti ActivityPub.'
        }}
      </p>
      <!-- Featured Image -->
      <div class="relative">
        <img
          src="/images/blogs/fediverseexplained/fedimap.webp"
          alt="Illustration of Fediverse Social Network"
          class="w-full h-full max-h-120 object-cover"
        />
      </div>
      <div class="px-2 py-8">
        <div class="max-w-none">
          <!-- Section 1: The Problem with Traditional Social Media -->
          <h2 class="text-2xl font-semibold mt-8 mb-3 text-gray-900">
            {{ isEnglish ? '🤔 The Problem with Traditional Social Media' : '🤔 Masalah dengan Media Sosial Tradisional' }}
          </h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? "If you use social media like Twitter (X), Threads, Instagram, or Facebook, you've probably noticed something: these platforms are centralized. That means one company controls everything—what you see, what gets deleted, and even if your account can exist at all."
                : 'Jika kamu menggunakan media sosial seperti Twitter (X), Threads, Instagram, atau Facebook, mungkin kamu sudah menyadari sesuatu: platform-platform ini terpusat. Itu berarti satu perusahaan mengontrol segalanya—apa yang kamu lihat, apa yang dihapus, dan bahkan apakah akunmu boleh ada atau tidak.'
            }}
          </p>
          <p class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? "Here's the thing: these companies own your data, control the algorithm that decides what you see, and can ban or restrict your account whenever they want. Your posts might get shadowbanned, your reach gets limited, or worse—your entire account can disappear overnight without any clear reason."
                : 'Ini yang perlu kamu tahu: perusahaan-perusahaan ini memiliki datamu, mengontrol algoritma yang memutuskan apa yang kamu lihat, dan bisa membatasi atau menghapus akunmu kapan saja. Postinganmu bisa dibatasi (shadowbanned), jangkauannya bisa diperkecil, atau lebih buruk—akunmu bisa hilang dalam semalam tanpa alasan yang jelas.'
            }}
          </p>

          <!-- Section 2: What is Fediverse - Simple Explanation -->
          <h2 class="text-2xl font-semibold mt-8 mb-3 text-gray-900">
            {{ isEnglish ? '💡 So, What Exactly is Fediverse?' : '💡 Jadi, Apa Sih Fediverse Itu?' }}
          </h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? "Imagine if Gmail users could directly message Yahoo users, or if Instagram posts could be viewed from Twitter without needing a separate account. That's essentially what Fediverse is—a giant network where different social media platforms can talk to each other."
                : 'Bayangkan jika pengguna Gmail bisa langsung mengirim pesan ke pengguna Yahoo, atau jika postingan Instagram bisa dilihat dari Twitter tanpa perlu akun terpisah. Pada dasarnya itulah Fediverse—jaringan raksasa di mana platform media sosial yang berbeda bisa berkomunikasi satu sama lain.'
            }}
          </p>
          <p class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? "The word 'Fediverse' comes from 'federated universe.' 'Federated' means a group of independent things working together, and 'universe' means... well, everything! It's like email, but for social media. Just like how you can send an email from Gmail to Outlook, you can now follow someone on Mastodon from your Threads account—or vice versa."
                : 'Kata "Fediverse" berasal dari "federated universe." "Federated" berarti kelompok hal-hal independen yang bekerja sama, dan "universe" berarti... segalanya! Ini seperti email, tapi untuk media sosial. Seperti saat kamu bisa mengirim email dari Gmail ke Outlook, sekarang kamu bisa mengikuti seseorang di Mastodon dari akun Threadsmu—atau sebaliknya.'
            }}
          </p>

          <!-- Section 3: How it Works -->
          <h2 class="text-2xl font-semibold mt-8 mb-3 text-gray-900">
            {{ isEnglish ? '🔧 How Does It Work?' : '🔧 Bagaimana Cara Kerjanya?' }}
          </h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? "Fediverse platforms use a special protocol called ActivityPub—think of it as a universal language that all these different apps understand. This is the same technology that powers Mastodon, PeerTube, Friendica, and now even Meta's Threads!"
                : 'Platform Fediverse menggunakan protokol khusus bernama ActivityPub—pikirkan ini sebagai bahasa universal yang dipahami semua aplikasi berbeda. Ini adalah teknologi yang sama yang menjalankan Mastodon, PeerTube, Friendica, dan sekarang bahkan Threads dari Meta!'
            }}
          </p>
          <p class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? "Unlike traditional social media where one company owns everything, Fediverse is decentralized. This means anyone can set up their own server (called an 'instance') with their own rules. You can join an instance that matches your interests, and still interact with people on other instances."
                : 'Berbeda dengan media sosial tradisional di mana satu perusahaan memiliki segalanya, Fediverse terdesentralisasi. Ini berarti siapa pun bisa membuat server mereka sendiri (disebut "instance") dengan aturan mereka sendiri. Kamu bisa bergabung dengan instance yang sesuai dengan minatmu, dan tetap bisa berinteraksi dengan orang-orang di instance lain.'
            }}
          </p>

          <!-- Section 4: Popular Fediverse Platforms -->
          <h2 class="text-2xl font-semibold mt-8 mb-3 text-gray-900">
            {{ isEnglish ? '🚀 Popular Fediverse Platforms' : '🚀 Platform Fediverse Populer' }}
          </h2>

          <!-- Mastodon -->
          <h3 class="text-xl font-medium mt-6 mb-2 text-gray-800">
            {{ isEnglish ? '🐘 Mastodon (Microblogging)' : '🐘 Mastodon (Microblogging)' }}
          </h3>
          <div class="relative mb-4">
            <img
              src="/images/blogs/fediverseexplained/mastodon.webp"
              alt="Mastodon logo"
              class="w-full w-full object-contain"
            />
          </div>
          <p class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? "Mastodon is probably the most well-known Fediverse platform. It's a lot like Twitter/X—users post short messages (called 'toots'), follow others, and engage in conversations. The big difference? There's no algorithm manipulating what you see, no ads, and no single company that can shut it down."
                : 'Mastodon mungkin adalah platform Fediverse yang paling terkenal. Mirip dengan Twitter/X—pengguna memposting pesan pendek (disebut "toots"), mengikuti orang lain, dan berinteraksi dalam percakapan. Bedanya? Tidak ada algoritma yang memanipulasi apa yang kamu lihat, tidak ada iklan, dan tidak ada satu perusahaan pun yang bisa menutupnya.'
            }}
          </p>
         <!-- PeerTube -->
          <h3 class="text-xl font-medium mt-6 mb-2 text-gray-800">
            {{ isEnglish ? '📺 PeerTube (Video)' : '📺 PeerTube (Video)' }}
          </h3>
          <div class="relative mb-4">
            <img
              src="/images/blogs/fediverseexplained/peertube.webp"
              alt="PeerTube logo"
              class="w-full h-full object-contain"
            />
          </div>
          <p class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? "PeerTube is a decentralized video hosting platform—think of it as a YouTube alternative. Videos are distributed across multiple servers, so no single company controls all the content. It's also much lighter on data and doesn't bombard you with ads."
                : 'PeerTube adalah platform hosting video terdesentralisasi—pikirkan ini sebagai alternatif YouTube. Video tersebar di beberapa server, jadi tidak ada satu perusahaan yang mengontrol semua konten. Ini juga lebih hemat data dan tidak memuatmu dengan iklan.'
            }}
          </p>
         <!-- Lemmy -->
          <h3 class="text-xl font-medium mt-6 mb-2 text-gray-800">
            {{ isEnglish ? '🐧 Lemmy (Forums/Reddit Alternative)' : '🐧 Lemmy (Forum/Alternatif Reddit)' }}
          </h3>
          <div class="relative mb-4">
            <img
              src="/images/blogs/fediverseexplained/lemmy.webp"
              alt="Lemmy logo"
              class="w-full h-full object-contain"
            />
          </div>
          <p class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? "Lemmy is a community-driven platform similar to Reddit. Users create communities (called 'instances') around specific topics, upvote or downvote posts, and have discussions. It's perfect if you miss the old Reddit experience without the newer controversial changes."
                : 'Lemmy adalah platform yang digerakkan oleh komunitas, mirip dengan Reddit. Pengguna membuat komunitas (disebut "instance") untuk topik tertentu, upvote atau downvote postingan, dan berdiskusi. Sempurna jika kamu merindukan pengalaman Reddit lama tanpa perubahan kontroversial yang lebih baru.'
            }}
          </p>
         <!-- Sharkey/Misskey -->
          <h3 class="text-xl font-medium mt-6 mb-2 text-gray-800">
            {{ isEnglish ? '🐦 Sharkey & 🐱 Misskey (Twitter Alternative)' : '🐦 Sharkey & 🐱 Misskey (Alternatif Twitter)' }}
          </h3>
          <div class="relative mb-4">
            <img
              src="/images/blogs/fediverseexplained/sharkey.webp"
              alt="Sharkey logo"
              class="w-full h-full object-contain"
            />
          </div>
          <div class="relative mb-4">
            <img
              src="/images/blogs/fediverseexplained/misskey.webp"
              alt="Misskey logo"
              class="w-full h-full object-contain"
            />
          </div>
          <p class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? "Sharkey and Misskey are Twitter/X alternatives that originated in Japan. They offer a unique interface with advanced features like custom emoji, powerful search, and fun animations. Sharkey is a fork of Misskey with additional features. If you want something different from Mastodon, these are great alternatives."
                : 'Sharkey dan Misskey adalah alternatif Twitter/X yang berasal dari Jepang. Mereka menawarkan antarmuka unik dengan fitur lanjutan seperti emoji kustom, pencarian powerful, dan animasi yang menyenangkan. Sharkey adalah fork dari Misskey dengan fitur tambahan. Jika kamu ingin sesuatu yang berbeda dari Mastodon, ini adalah alternatif yang bagus.'
            }}
          </p>
          <!-- Pleroma/Akkoma -->
          <h3 class="text-xl font-medium mt-6 mb-2 text-gray-800">
            {{ isEnglish ? '🔥 Pleroma & Akkoma (Lightweight Social)' : '🔥 Pleroma & Akkoma (Sosial Ringan)' }}
          </h3>
          <div class="relative mb-4">
            <img
              src="/images/blogs/fediverseexplained/pleroma.webp"
              alt="Pleroma logo"
              class="w-full h-full object-contain"
            />
          </div>
          <div class="relative mb-4">
            <img
              src="/images/blogs/fediverseexplained/akkoma.webp"
              alt="Akkoma logo"
              class="w-full h-full object-contain"
            />
          </div>
          <p class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? "Pleroma and Akkoma are lightweight alternatives to Mastodon. They run faster, use less resources, and offer more customization options. Akkoma often introduces new features through FEPs (Fediverse Enhancement Proposals) — these are like experimental features that can eventually become part of the Fediverse standard."
                : 'Pleroma dan Akkoma adalah alternatif ringan dari Mastodon. Mereka berjalan lebih cepat, menggunakan lebih sedikit sumber daya, dan menawarkan lebih banyak opsi kustomisasi. Akkoma sering memperkenalkan fitur baru melalui FEP (Fediverse Enhancement Proposals) — ini seperti fitur eksperimental yang akhirnya bisa menjadi standar di Fediverse.'
            }}
          </p>
         <!-- GoToSocial -->
          <h3 class="text-xl font-medium mt-6 mb-2 text-gray-800">
            {{ isEnglish ? '🦦 GoToSocial (Minimalist Microblogging)' : '🦦 GoToSocial (Microblogging Minimalis)' }}
          </h3>
          <div class="relative mb-4">
            <img
              src="/images/blogs/fediverseexplained/gotosocial.webp"
              alt="GoToSocial logo"
              class="w-full h-full object-contain"
            />
          </div>
          <p class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? "GoToSocial is designed for those who want a simple, lightweight social network. It's perfect for small communities or self-hosting on low-power devices like Raspberry Pi. Despite being minimal, it's fully compatible with Mastodon and other Fediverse apps."
                : 'GoToSocial dirancang untuk mereka yang menginginkan jaringan sosial yang sederhana dan ringan. Sempurna untuk komunitas kecil atau hosting mandiri di perangkat berdaya rendah seperti Raspberry Pi. Meskipun minimalis, ini sepenuhnya kompatibel dengan Mastodon dan aplikasi Fediverse lainnya.'
            }}
          </p>
         <!-- Section 5: Benefits -->
          <h2 class="text-2xl font-semibold mt-8 mb-3 text-gray-900">
            {{ isEnglish ? '✨ Why Should You Try ?' : '✨ Mengapa Harus Kamu Coba ?' }}
          </h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? "Here's the real question: Why should you leave the comfortable world of big tech social media for something that might seem complicated? The answer is simple: control and freedom."
                : 'Ini pertanyaan sesungguhnya: Mengapa kamu harus meninggalkan dunia nyaman media sosial big tech untuk sesuatu yang mungkin terlihat rumit? Jawabannya sederhana: kontrol dan kebebasan.'
            }}
          </p>
          <ul class="list-disc list-inside mb-6 space-y-2 text-gray-700">
            <li v-html='isEnglish ? "<strong>No Algorithm Manipulation</strong> — You see posts chronologically, not what the algorithm thinks you want to see." : "<strong>Tidak Ada Manipulasi Algoritma</strong> — Kamu melihat postingan secara kronologis, bukan apa yang algoritma pikirkan yang ingin kamu lihat."'></li>
            <li v-html='isEnglish ? "<strong>No Data Harvesting</strong> — Your data is not sold to advertisers because there are no advertisers." : "<strong>Tidak Ada Pengumpulan Data</strong> — Datamu tidak dijual ke pengiklan karena tidak ada pengiklan."'></li>
            <li v-html='isEnglish ? "<strong>No Shadowbanning</strong> — Your content will not be secretly suppressed because the server owner does not have reason to hide it." : "<strong>Tidak Ada Shadowbanning</strong> — Kontenmu tidak akan disembunyikan secara diam-diam karena pemilik server tidak punya alasan untuk menyembunyikannya."'></li>
            <li v-html='isEnglish ? "<strong>You Control Your Data</strong> — You can migrate to another server or even export all your data anytime." : "<strong>Kamu Mengontrol Data Mu</strong> — Kamu bisa berpindah ke server lain atau mengekspor semua datamu kapan saja."'></li>
            <li v-html='isEnglish ? "<strong>Censorship-Resistant</strong> — No single company can delete your account or block the entire platform." : "<strong>Tahan Sensor</strong> — Tidak ada satu perusahaan pun yang bisa menghapus akunmu atau memblokir seluruh platform."'></li>
          </ul>

                 <!-- Section 6b: Host Your Own Instance -->
       <h2 class="text-2xl font-semibold mt-8 mb-3 text-gray-900">
  {{ isEnglish ? '🏠 Want to Host Your Own Instance?' : '🏠 Ingin Hosting Instance Mu Sendiri?' }}
</h2>
<p class="text-gray-700 leading-relaxed mb-4">
  {{
    isEnglish
      ? "Here's the cool part: if you use GoToSocial, Akkoma, or other Fediverse software, you can actually host your own instance! This means you have complete control over your data and your server."
      : "Ini bagian yang menarik: jika kamu menggunakan GoToSocial, Akkoma, atau software Fediverse lainnya, kamu bisa hosting instance sendiri! Ini berarti kamu punya kontrol penuh atas data dan servermu."
  }}
</p>

<p class="text-gray-700 leading-relaxed mb-4" v-html='isEnglish ? "For example, i runs their own GoToSocial instance. Their username is <strong>me@h.syafiq-paradisam.my.id</strong> we can moots right now" : "Contohnya, saya ini menjalankan instance GoToSocial sendiri. Usernameku adalah <strong>me@h.syafiq-paradisam.my.id</strong> kita bisa saling follow ya"'></p>

<p class="text-gray-700 leading-relaxed mb-4">
  {{
    isEnglish
      ? "The amazing thing is: even though they host their own server..."
      : "Hal yang menakjubkan adalah: meskipun aku hosting server sendiri..."
  }}
</p>  <p class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? "I don't need a powerful computer either — something as simple as a Raspberry Pi or a cheap VPS can handle a personal Fediverse instance. The software is free and open source!"
                : 'Aku tidak butuh komputer yang kuat — sesuatu yang sederhana seperti Raspberry Pi atau VPS murah bisa menangani instance Fediverse personal. Softwarenya gratis dan open source!'
            }}
          </p>

          <!-- Section 7: The Future -->
          <h2 class="text-2xl font-semibold mt-8 mb-3 text-gray-900">
            {{ isEnglish ? '🔮 The Future of Fediverse' : '🔮 Masa Depan Fediverse' }}
          </h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? "The Fediverse is growing faster than ever. With Meta's Threads joining the network, we're seeing mainstream adoption of decentralized social media. More platforms are expected to join, making the network even larger and more interconnected."
                : 'Fediverse berkembang lebih cepat dari sebelumnya. Dengan Threads dari Meta yang bergabung dengan jaringan, kita melihat adopsi media sosial terdesentralisasi yang lebih luas. Diharapkan lebih banyak platform yang akan bergabung, membuat jaringan semakin besar dan saling terhubung.'
            }}
          </p>
          <p class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? "While it's not perfect—learning curve, smaller user base compared to big tech, and navigating different instances can be confusing—the Fediverse represents a fundamental shift in how we think about social media. It's proof that we don't have to rely on corporations to connect with each other."
                : 'Meskipun tidak sempurna—kurva belajar, basis pengguna yang lebih kecil dibandingkan big tech, dan menavigasi instance yang berbeda bisa membingungkan—Fediverse mewakili pergeseran fundamental dalam cara kita berpikir tentang media sosial. Ini bukti bahwa kita tidak harus bergantung pada korporasi untuk saling terhubung.'
            }}
          </p>

          <!-- Conclusion -->
          <h2 class="text-2xl font-semibold mt-8 mb-3 text-gray-900">
            {{ isEnglish ? '📝 Conclusion' : '📝 Kesimpulan' }}
          </h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? "The Fediverse isn't just a tech experiment—it's a movement toward a more open, user-controlled internet. Whether you're a privacy enthusiast, someone tired of algorithmic manipulation, or just curious about alternatives, there's a place for you in the Fediverse."
                : 'Fediverse bukan hanya eksperimen teknologi—ini adalah gerakan menuju internet yang lebih terbuka dan dikontrol pengguna. Apakah kamu entusiasta privasi, seseorang yang lelah dengan manipulasi algoritma, atau hanya penasaran dengan alternatif, ada tempat untukmu di Fediverse.'
            }}
          </p>
          <p class="text-gray-700 leading-relaxed mb-4">
            {{
              isEnglish
                ? "So why not give it a try? Your social media life doesn't have to be controlled by billion-dollar companies."
                : 'Jadi, mengapa tidak mencobanya? Kehidupan media sosialmu tidak harus dikendalikan oleh perusahaan dengan nilai milyaran dollar.'
            }}
          </p>
        </div>
      </div>
    </BlogComponent>
    <RelatedArticles articleCode="you-should-know-what-is-fediverse" />
  </div>
</template>
