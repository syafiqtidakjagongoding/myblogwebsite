<script setup lang="ts">
import { computed } from 'vue'
import BlogComponent from '@/components/BlogComponent.vue'
import CardBlog from '@/components/CardBlog.vue'
import { useLanguageStore } from '@/store/language'
const lang = useLanguageStore()
const isEnglish = computed(() => lang.language === 'en')
import { getBlogByArticleCode, getCommentByArticleCode, getRelatedBlogExcept } from '@/lib/query'
import type { BlogStat, Comments } from '@/lib/types'
import { ref, onMounted } from 'vue'
import { useHead } from '@vueuse/head'

useHead({
  title: 'Syafiq Blog | Stop Leaking Secrets, Use OpenPGP to Lock Down Your Data',
  link: [
    {
      rel: 'canonical',
      href: `${import.meta.env.VITE_BASE_URL}/blog/tech/what-is-openpgp-encryption`,
    },
  ],
  meta: [
    {
      name: 'description',
      content: 'Privacy isn’t a luxury — it’s a right. OpenPGP gives you the power to protect your messages from snoopers, hackers, and prying eyes. It’s the gold standard for secure communication, trusted by journalists, devs, and privacy advocates worldwide.',
    },
    {
      name: 'keywords',
      content: 'openpgp, encryption,cryptography',
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
const articleCode = 'openpgp_encryption'

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
  if (id.value == 0) {
    console.warn('id masih kosong, getComments dibatalkan')
    return
  }
  
  const res = await getCommentByArticleCode(id.value)
  console.log(res)
  comments.value = res
  console.log(comments)
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
    <!-- Article Title and Meta -->
    <h1 class="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
      {{ isEnglish ? 'Stop Leaking Secrets, Use OpenPGP to Lock Down Your Data' : 'Berhenti Bocorin Rahasia, Gunakan OpenPGP untuk Amankan Data Kamu' }}
    </h1>

    <p
      class="text-lg text-gray-600 mb-6 leading-relaxed"
      v-html="
        isEnglish
          ? 'In today\'s digital era, maintaining <strong>privacy and data security</strong> is crucial. One popular method to secure communication is <strong>OpenPGP encryption</strong>.'
          : 'Di era digital saat ini, menjaga <strong>privasi dan keamanan data</strong> menjadi hal yang sangat penting. Salah satu metode populer untuk melindungi komunikasi adalah dengan <strong>OpenPGP encryption</strong>.'
      "
    ></p>

    <!-- Featured Image -->
    <div class="relative">
      <img
        src="/images/blogs/pgpencryption/thumbnail.webp"
        alt="Illustration of OpenPGP encryption"
        class="w-full h-full max-h-120 object-cover"
      />
    </div>

    <!-- Article Content -->
    <div class="px-2 py-8">
      <div class="max-w-none">
        <p
          class="mb-4"
          v-html="
            isEnglish
              ? '<strong>OpenPGP (Pretty Good Privacy)</strong> is a <em>data encryption standard</em> based on public key cryptography. OpenPGP allows you to:'
              : '<strong>OpenPGP (Pretty Good Privacy)</strong> adalah <em>standar enkripsi data</em> berbasis kriptografi kunci publik. OpenPGP memungkinkan kamu untuk:'
          "
        ></p>

        <ul class="list-disc list-inside mb-6 space-y-1">
          <li>
            {{
              isEnglish
                ? 'Send encrypted messages (readable only by the intended recipient)'
                : 'Mengirim pesan terenkripsi(hanya bisa dibaca oleh penerima tertentu)'
            }}
          </li>
          <li>
            {{
              isEnglish
                ? 'Digitally sign messages (to verify authenticity)'
                : 'Menandatangani pesan secara digital (untuk memastikan keaslian)'
            }}
          </li>
        </ul>

        <h2 class="text-2xl font-semibold mt-8 mb-3 text-gray-900">
          {{ isEnglish ? '🔑 How Does It Work?' : '🔑 Bagaimana Cara Kerjanya?' }}
        </h2>

        <p class="mb-4">
          {{ isEnglish ? 'OpenPGP uses two keys:' : 'OpenPGP menggunakan dua kunci:' }}
        </p>

        <ol class="list-decimal list-inside mb-4 space-y-1">
          <li
            v-html="
              isEnglish
                ? '<strong>Public Key</strong> – shared with anyone'
                : '<strong>Public Key</strong> – dibagikan ke siapa saja'
            "
          ></li>

          <li
            v-html="
              isEnglish
                ? '<strong>Private Key</strong> – kept secret by the owner'
                : '<strong>Private Key</strong> – disimpan rahasia oleh pemilik'
            "
          ></li>
        </ol>

        <p
          class="mb-6"
          v-html="
            isEnglish
              ? '🔄 You encrypt a message using the recipient\'s <em>public key</em>, and they decrypt it with their <em>private key</em>.'
              : '🔄 Kamu mengenkripsi pesan dengan <em>public key</em> milik penerima, dan penerima mendekripsinya dengan <em>private key</em>-nya.'
          "
        ></p>

        <h2 class="text-2xl font-semibold mt-8 mb-3 text-gray-900">
          🧪 {{ isEnglish ? 'How to Use OpenPGP' : 'Cara Menggunakan OpenPGP' }}
        </h2>
        <p
          class="mb-4"
          v-html="
            isEnglish
              ? 'Here are general steps to start using OpenPGP:'
              : 'Berikut langkah-langkah umum untuk mulai menggunakan OpenPGP:'
          "
        ></p>

        <h3 class="text-xl font-medium mt-6 mb-2 text-gray-800">
          1. {{ isEnglish ? 'Install OpenPGP App' : 'Install Aplikasi OpenPGP' }}
        </h3>
        <ul class="list-disc list-inside mb-4 space-y-1">
          <li>
            <strong>GnuPG (GPG)</strong> –
            {{ isEnglish ? 'free command-line' : 'command-line gratis' }}
          </li>
          <li>
            <strong>Kleopatra</strong> –
            {{ isEnglish ? 'GUI for Windows or Linux' : 'GUI untuk Windows atau Linux' }}
          </li>
          <li><strong>Openkeychain</strong> – {{ isEnglish ? 'for Android' : 'untuk Android' }}</li>
          <li><strong>PGPro1</strong> – {{ isEnglish ? 'for iOS' : 'untuk iOS' }}</li>
          <li>
            <strong>ProtonMail</strong> –
            {{ isEnglish ? 'automatically encrypted email' : 'email terenkripsi otomatis' }}
          </li>
        </ul>

        <h3 class="text-xl font-medium mt-6 mb-2 text-gray-800">
          2. {{ isEnglish ? 'Create a Key Pair' : 'Buat Key Pair' }}
        </h3>
        <p
          class="mb-4"
          v-html="
            isEnglish
              ? 'Here I will demonstrate using Kleopatra on Linux'
              : 'Disini aku akan contohkan dengan Kleopatra di Linux'
          "
        ></p>
        <img
          src="/images/blogs/pgpencryption/createkey.webp"
          alt="createkey"
          class="w-full h-full object-cover"
        />

        <p class="mb-4">
          {{ isEnglish ? 'Click File > New OpenPGP Key Pair' : 'Klik File > New OpenPGP Key pair' }}
        </p>
        <p
          class="mb-4"
          v-html="
            isEnglish
              ? 'Enter your name and email (the email doesn\'t have to be personal, I just use a random one here)'
              : 'Isi nama keymu dan email (email tidak harus email pribadi, disini saya hanya sembarangan saja)'
          "
        ></p>

        <h3 class="text-xl font-medium mt-6 mb-2 text-gray-800">
          3.
          {{
            isEnglish
              ? 'Export your public key to the recipient'
              : 'Export publickeymu kepada orang yang akan kamu ajak komunikasi'
          }}
        </h3>
        <img
          src="/images/blogs/pgpencryption/findpubkey.webp"
          alt="findpubkey"
          class="w-full h-full object-cover"
        />

        <p class="mb-4">
          {{
            isEnglish
              ? 'Double click your own key until the left window appears'
              : 'Double tap ownkey hingga jendela di kiri tampil'
          }}
        </p>
        <p class="mb-4">Export</p>
        <img
          src="/images/blogs/pgpencryption/mypubkey.webp"
          alt="mypubkey"
          class="w-full h-full object-cover object-top"
        />

        <p class="mb-4">
          {{
            isEnglish
              ? 'This is my public key, then copy it to clipboard'
              : 'Ini adalah publickey ku, lalu copy ke clipboard'
          }}
        </p>

        <h3 class="text-xl font-medium mt-6 mb-2 text-gray-800">
          4.
          {{ isEnglish ? 'Chat Online' : 'Komunikasi di Online Chat' }}
        </h3>
        <img
          src="/images/blogs/pgpencryption/firstcomm.webp"
          alt="firstcomm"
          class="w-full h-full object-cover"
        />
        <img
          src="/images/blogs/pgpencryption/otherpubkey.webp"
          alt="otherpubkey"
          class="w-full h-full object-cover mt-2"
        />

        <p class="mb-4">
          {{
            isEnglish
              ? 'Here we receive their public key, copy it and create a file containing it'
              : 'Disini kita mendapatkan public key orang itu, copy lalu buat file yang isinya publickey itu'
          }}
        </p>

        <h3 class="text-xl font-medium mt-6 mb-2 text-gray-800">
          5.
          {{ isEnglish ? 'Import Their Public Key' : 'Import publickey orang tadi' }}
        </h3>
        <img
          src="/images/blogs/pgpencryption/importotherpubkey.webp"
          alt="importotherpubkey"
          class="w-full h-full object-cover"
        />

        <p class="mb-4">
          {{
            isEnglish
              ? 'Click File > Import > Select the file'
              : 'Klik File > Import > Pilih file yang isinya publickey orang tadi'
          }}
        </p>
        <img
          src="/images/blogs/pgpencryption/certifyotherkey.webp"
          alt="certifyotherkey"
          class="w-full mb-3 object-cover"
        />

        <p class="mb-4">Certify</p>
        <img
          src="/images/blogs/pgpencryption/verifyotherwithownkey.webp"
          alt="verifyotherwithownkey"
          class="w-full h-full object-cover"
        />

        <p class="mb-4">
          {{ isEnglish ? 'Certify with your own key' : 'Certify dengan key milikmu sendiri' }}
        </p>

        <h3 class="text-xl font-medium mt-6 mb-2 text-gray-800">
          6.
          {{ isEnglish ? 'Encrypt the Message' : 'Enkripsi  Pesan' }}
        </h3>
        <img
          src="/images/blogs/pgpencryption/beginsignkey.webp"
          alt="beginsignkey"
          class="w-full h-full object-cover"
        />

        <p class="mb-4">
          {{
            isEnglish
              ? 'Before that, copy the message you want to send to clipboard'
              : 'Sebelum itu kalian copy message yang akan dikirim ke clipboard'
          }}
        </p>
        <span
          v-html="
            isEnglish
              ? 'Here I will send the message: &quot;Do you really sell that things ?&quot;'
              : 'Disini saya akan mengirim pesan : &quot;Do you really sell that things ?&quot;'
          "
        ></span>
        <p class="mb-4">Click > Tools > Clipboard > Sign/Encrypt</p>
        <img
          src="/images/blogs/pgpencryption/choosereceiverkey.webp"
          alt="choosereceiverkey"
          class="w-full h-full object-cover"
        />

        <p
          class="mb-4"
          v-html="
            isEnglish
              ? 'Choose <strong>Encrypt for others</strong> > select their key > <strong>Sign / Encrypt</strong> > Finish'
              : 'Pilih <strong>Encrypt for others</strong> > pilih key orang tadi > <strong>Sign / Encrypt</strong> > Finish'
          "
        ></p>

        <h3 class="text-xl font-medium mt-6 mb-2 text-gray-800">
          7.
          {{ isEnglish ? 'Send the Encrypted Message' : 'Kirim Pesan Terenkripsi' }}
        </h3>
        <img
          src="/images/blogs/pgpencryption/firstreply.webp"
          alt="firstreply"
          class="w-full h-full object-cover"
        />
        <img
          src="/images/blogs/pgpencryption/firstreplyfromppl.webp"
          alt="firstreplyfromppl"
          class="w-full h-full mt-3 object-cover"
        />

        <p class="mb-4">
          {{
            isEnglish
              ? 'Now they also send a message using your public key that you sent earlier, just like you did'
              : 'Nah orang itu juga mengirim pesan menggunakan publickey kita yang kita kirim tadi, sama yang kita lakukan'
          }}
        </p>
        <p class="mb-4">
          {{
            isEnglish
              ? 'Copy the message > Create a file containing it'
              : 'Copy message > Buat file yang sinya message itu'
          }}
        </p>

        <h3 class="text-xl font-medium mt-6 mb-2 text-gray-800">
          8.
          {{ isEnglish ? 'Decrypt the Message' : 'Dekripsi  Pesan' }}
        </h3>
        <p class="mb-4">
          {{
            isEnglish
              ? 'Go back to Kleopatra > Decrypt / Verify'
              : 'Kembali ke Kleopatra > Decrypt / Verify'
          }}
        </p>
        <img
          src="/images/blogs/pgpencryption/decrypting.webp"
          alt="decrypting"
          class="w-full h-full object-cover"
        />
        <p class="mb-4">Click Save all</p>
        <p
          class="mb-4"
          v-html="
            isEnglish
              ? 'Then you will get the decrypted file named <code>answer.txt.out</code>'
              : 'Maka akan tercipta file hasil dekripsi yaitu <code>answer.txt.out</code>'
          "
        ></p>
        <img
          src="/images/blogs/pgpencryption/messagefromppl.webp"
          alt="messagefromppl"
          class="w-full h-full object-cover"
        />

        <p class="mb-4">
          {{ isEnglish ? 'The content of the message is:' : 'Isi message tersebut adalah' }}
        </p>
        <p
          class="mb-4"
          v-html="
            isEnglish
              ? '&quot;Yes, I sell it for 100$. Do u wanna buy ?&quot;'
              : '&quot;Yes, I sell it for 100$. Do u wanna buy ?&quot;'
          "
        ></p>

        <h3 class="text-xl font-medium mt-6 mb-2 text-gray-800">
          9. {{ isEnglish ? 'Repeat the Steps' : 'Ulangi Step' }}
        </h3>
        <p class="mb-4">
          {{
            isEnglish
              ? 'You can repeat steps 6 to 9 to encrypt and decrypt messages'
              : 'Setelah itu kalian bisa mengulangi langkah 6 sampai 9 untuk mengenkripsi dan mendekripsi message'
          }}
        </p>
        <p class="mb-4">
          {{
            isEnglish
              ? 'This way, the chat provider doesn’t know what you’re sending because it’s encrypted. Only the person with the private key can read it.'
              : 'Dengan cara ini pihak online chat tidak tahu menahu yang kamu kirim itu pesan apa, karena terenkripsi, yang tahu hanyalahorang yang punya private key'
          }}
        </p>

        <h2 class="text-2xl font-semibold mt-8 mb-3 text-gray-900">
          {{ isEnglish ? '💡 Security Tips' : '💡 Tips Keamanan' }}
        </h2>
        <ul class="list-disc list-inside mb-6 space-y-1">
          <li
            v-html="
              isEnglish
                ? 'Keep your <strong>private key</strong> secure'
                : 'Simpan <strong>private key</strong> dengan aman'
            "
          ></li>
          <li
            v-html="
              isEnglish
                ? 'Use a <strong>strong passphrase</strong>'
                : 'Gunakan <strong>passphrase yang kuat</strong>'
            "
          ></li>
          <li>{{ isEnglish ? 'Backup your key offline' : 'Backup kunci secara offline' }}</li>
        </ul>

        <h2 class="text-2xl font-semibold mt-8 mb-3 text-gray-900">
          {{
            isEnglish ? '✅ When Should You Use OpenPGP?' : '✅ Kapan Harus Menggunakan OpenPGP?'
          }}
        </h2>
        <ul class="list-disc list-inside mb-6 space-y-1">
          <li>
            {{ isEnglish ? 'When sending sensitive emails' : 'Saat mengirim email sensitif' }}
          </li>
          <li>
            {{
              isEnglish ? 'Sharing personal files via cloud' : 'Berbagi file pribadi melalui cloud'
            }}
          </li>
          <li>{{ isEnglish ? 'Signing digital documents' : 'Menandatangani dokumen digital' }}</li>
          <li>
            {{
              isEnglish
                ? 'Open source projects or internal team communication'
                : 'Proyek open source atau komunikasi internal tim'
            }}
          </li>
        </ul>

        <h2 class="text-2xl font-semibold mt-8 mb-3 text-gray-900">
          {{ isEnglish ? '✉️ Closing Thoughts' : '✉️ Penutup' }}
        </h2>
        <p class="mb-2">
          <span
            v-html="
              isEnglish
                ? 'With <strong>OpenPGP</strong>, you can keep digital communications secure and private. Even if it seems technical, modern tools like ProtonMail or GPG Suite make it easy to use.'
                : 'Dengan <strong>OpenPGP</strong>, kamu bisa menjaga komunikasi digital tetap aman dan pribadi. Meski terlihat teknis, tools modern seperti ProtonMail atau GPG Suite mempermudah penggunaannya.'
            "
          >
          </span>
        </p>
        <p>
          {{
            isEnglish
              ? 'From encrypting important files to sending confidential emails — OpenPGP can be a great choice to protect data from digital spies.'
              : 'Mulai dari mengenkripsi file penting, hingga mengirim email rahasia — OpenPGP bisa jadi pilihan tepat untuk menjaga data dari mata - mata digital.'
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
