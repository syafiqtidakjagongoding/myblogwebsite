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
const articleCode = 'is_file_extension_important'
const isEnglish = computed(() => lang.language === 'en')
useHead({
  title: 'Is File Extension Important ?',
  link: [
    {
      rel: 'canonical',
      href: `${import.meta.env.VITE_BASE_URL}/blog/tech/is-file-extension-important`,
    },
  ],
  meta: [
    {
      name: 'description',
      content:
        'Learn the importance of file extensions across systems — Windows, Linux, and macOS — and why formats like .exe, .bin, or .elf define how files run.',
    },
    {
      name: 'keywords',
      content: 'file,extension, filename, bin, exe, elf, out, linux,windows,macos',
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
          ? 'File Extensions Explained: Importance and Examples'
          : 'Ekstensi File: Penjelasan, Pentingnya, dan Contohnya'
      }}
    </h1>
   <p
  class="text-lg text-gray-600 mb-6 leading-relaxed"
  v-html="
    isEnglish
      ? 'File extensions like .php, .vue, and .tsx help systems identify and run files correctly. Learn why extensions matter in framework, interpreter, and compiler.'
      : 'Ekstensi file seperti .php, .vue, dan .tsx membantu sistem mengenali dan menjalankan file dengan benar. Pelajari mengapa ekstensi penting dalam framework, interpreter, dan compiler.'
  "
></p>


    <!-- Featured Image -->
    <div class="relative">
      <img
        src="/images/blogs/isfileextensionimportant/thumbnail.webp"
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
              ? 'Why File Extensions Matter in Programming and Everyday Use'
              : 'Mengapa Ekstensi File Penting dalam Pemrograman dan Penggunaan Sehari-hari'
          }}
        </h2>
        <p class="text-gray-700 leading-relaxed mb-4">
          {{
            isEnglish
              ? 'File extensions are not just for executables like .exe or .elf — they also define how we work with code and frameworks. Extensions such as .js, .ts, .vue, and .php tell developers, tools, and operating systems how to interpret the file. They make collaboration easier, ensure compatibility with compilers or runtime environments, and prevent confusion when managing projects.'
              : 'Ekstensi file tidak hanya untuk file eksekusi seperti .exe atau .elf — tetapi juga menentukan cara kita bekerja dengan kode dan framework. Ekstensi seperti .js, .ts, .vue, dan .php memberi tahu developer, tools, dan sistem operasi bagaimana sebuah file harus diperlakukan. Hal ini mempermudah kolaborasi, menjamin kompatibilitas dengan compiler atau runtime, serta mencegah kebingungan saat mengelola proyek.'
          }}
        </p>

        <h1 class="font-bold text-2xl mb-3">
          {{ isEnglish ? 'Here is a quick example : ' : 'Ini sedikit contohnya :' }}
        </h1>

        <h1 class="font-bold text-xl mb-3">
          {{
            isEnglish
              ? 'PHP code but filename extension is .cpp '
              : 'Kode PHP tapi nama ekstensi filenya .cpp'
          }}
        </h1>

        <img
          src="/images/blogs/isfileextensionimportant/phpbutcpp.webp"
          alt="Illustration of i code php but filename is cpp"
          class="w-full h-full max-h-140 object-top object-cover"
        />
        <p class="text-gray-700 leading-relaxed my-4">
          {{
            isEnglish
              ? 'This is my code written in PHP, but I saved the file with a .cpp extension. Surprisingly, it still runs, but in VS Code the PHP features like syntax highlighting and code formatter don’t work properly.'
              : 'Ini adalah kodeku yang ditulis dengan PHP, tetapi aku simpan filenya dengan ekstensi .cpp. Ternyata saat dijalankan masih bisa, namun di VS Code fitur PHP seperti syntax highlighting dan code formatter tidak berfungsi dengan semestinya.'
          }}
        </p>
<p
  class=" text-gray-600 mb-6 leading-relaxed"
  v-html="
    isEnglish
      ? 'The PHP interpreter does not care about file extensions. As long as the file contains PHP tags like &lt;?php ... ?&gt;, it will execute the code, even if the file is named main.cpp . The .php extension is just a convention so that servers, editors, and frameworks recognize the file as PHP.'
      : 'Interpreter PHP tidak peduli dengan ekstensi file. Selama file berisi tag PHP seperti &lt;?php ... ?&gt;, kode akan tetap dijalankan meskipun nama file adalah main.cpp . Ekstensi .php hanyalah konvensi agar server, editor, dan framework mengenali file tersebut sebagai PHP.'
  "
></p>

        <h1 class="font-bold text-xl mb-3">
          {{
            isEnglish
              ? 'Vuejs code but filename extension is .tsx '
              : 'Kode vuejs tapi nama ekstensi filenya .tsx'
          }}
        </h1>
        <img
          src="/images/blogs/isfileextensionimportant/tsxbutvue.webp"
          alt="Illustration of i code vue but filename is .tsx"
          class="w-full h-full max-h-140 object-top object-cover"
        />

        <p class="text-gray-700 leading-relaxed my-4">
          {{
            isEnglish
              ? "Here I wrote Vue code but saved it with a .tsx extension. The result? Errors everywhere, Interpreter error, etc. VS Code treats it as TypeScript React (TSX), so Vue-specific syntax like <template>, v-if, v-for, :class, @click, defineProps, and v-model are not recognized. The editor highlights almost every line in red because TSX expects JSX/React syntax, not Vue’s template system."
              : "Di sini aku menulis kode Vue tetapi disimpan dengan ekstensi .tsx. Hasilnya? Error di mana-mana interpreter error, dll. VS Code menganggapnya sebagai TypeScript React (TSX), sehingga sintaks khusus Vue seperti <template>, v-if, v-for, :class, @click, defineProps, dan v-model tidak dikenali. Editor menandai hampir setiap baris dengan merah karena TSX mengharapkan sintaks JSX/React, bukan template milik Vue."
          }}
        </p>
  <p
  class=" text-gray-600 mb-6 leading-relaxed"
  v-html="
    isEnglish
      ? 'Vue.js uses <code>.vue</code> files with a structure of &amp;lt;template&amp;gt;, &amp;lt;script&amp;gt;, and &amp;lt;style&amp;gt;. The Vue compiler only understands this format. The <code>.tsx</code> extension is for TypeScript + JSX (React). Writing Vue code in .tsx causes errors because Vue syntax like <code>v-if</code> or &amp;lt;template&amp;gt; is invalid in TSX.'
      : 'Vue.js menggunakan file <code>.vue</code> dengan struktur &amp;lt;template&amp;gt;, &amp;lt;script&amp;gt;, dan &amp;lt;style&amp;gt;. Compiler Vue hanya mengenali format ini. Ekstensi <code>.tsx</code> dibuat untuk TypeScript + JSX (umumnya React). Menulis kode Vue di .tsx akan error karena sintaks Vue seperti <code>v-if</code> atau &amp;lt;template&amp;gt; tidak valid di TSX.'
  "
></p>



<h2 class="text-2xl font-semibold mb-3 text-gray-900">
  {{
    isEnglish
      ? "Conclusion: Why File Extensions Truly Matter"
      : "Kesimpulan: Kenapa Ekstensi File Sangat Penting"
  }}
</h2>
<p class="text-gray-700 leading-relaxed mb-4">
  {{
    isEnglish
      ? "From the examples, saving PHP code as .cpp still works because the PHP interpreter executes the content regardless of the extension. This flexibility shows that some languages only care about the runtime environment, not the filename. However, writing Vue code in a .tsx file fails completely, since editors, compilers, and developer tools rely on file extensions to decide how to parse and validate syntax. In this case, .tsx means React’s TypeScript JSX, so Vue-specific features such as <template>, v-if, v-for, and v-model are treated as errors."
      : "Dari contoh tadi, menulis PHP di file .cpp tetap bisa dijalankan karena interpreter PHP mengeksekusi isi file tanpa peduli ekstensinya. Fleksibilitas ini menunjukkan bahwa ada bahasa pemrograman yang hanya peduli pada environment runtime, bukan pada nama file. Namun, menulis Vue di file .tsx langsung gagal total, karena editor, compiler, dan tools developer bergantung pada ekstensi file untuk memutuskan bagaimana sebuah kode diparse dan divalidasi. Dalam kasus ini, .tsx artinya React dengan TypeScript JSX, sehingga fitur khas Vue seperti <template>, v-if, v-for, dan v-model dianggap error."
  }}
</p>
<p class="text-gray-700 leading-relaxed mb-4">
  {{
    isEnglish
      ? "This contrast highlights an important lesson: file extensions are not just decorative labels at the end of a filename. They influence how operating systems, compilers, editors, and even team members interpret the content. A wrong extension might not always stop a program from running, but it can break code highlighting, disable formatters, cause build errors, or create confusion in collaboration. In modern development, where multiple tools and frameworks interact, consistency in file extensions directly impacts productivity and code quality."
      : "Kontras ini menegaskan satu pelajaran penting: ekstensi file bukan sekadar label hiasan di akhir nama file. Ekstensi memengaruhi bagaimana sistem operasi, compiler, editor, bahkan rekan satu tim menginterpretasikan isi file. Ekstensi yang salah memang tidak selalu menghentikan program untuk berjalan, tetapi bisa merusak code highlighting, menonaktifkan formatter, menyebabkan error saat build, atau menimbulkan kebingungan saat berkolaborasi. Dalam pengembangan modern, di mana banyak tools dan framework saling terhubung, konsistensi dalam penggunaan ekstensi file berpengaruh langsung pada produktivitas dan kualitas kode."
  }}
</p>
<p class="text-gray-700 leading-relaxed mb-4">
  {{
    isEnglish
      ? "So next time you save a file, remember: the extension is more than just decoration. It is a bridge between your code, the tools you use, and the people you collaborate with. Using the correct extension ensures that everything — from syntax highlighting to compilation — works smoothly, making your development workflow faster, clearer, and less error-prone."
      : "Jadi, lain kali saat menyimpan file, ingatlah: ekstensi bukan sekadar hiasan. Ekstensi adalah jembatan antara kode yang kamu tulis, tools yang kamu gunakan, dan orang-orang yang bekerja sama denganmu. Menggunakan ekstensi yang benar memastikan segalanya — mulai dari syntax highlighting hingga proses kompilasi — berjalan dengan lancar, sehingga alur kerja pengembanganmu menjadi lebih cepat, jelas, dan minim error."
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
