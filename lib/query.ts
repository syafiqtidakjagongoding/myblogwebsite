import type { BlogStat, Comments } from './types'

const _baseUrl = ''

export async function getDataForYou(): Promise<BlogStat[]> {
  return await $fetch('/api/dataforyou') as unknown as Promise<BlogStat[]>
}

export async function insertComments(article_id: number, name: string | null, content: string) {
  return await $fetch('/api/comments', {
    method: 'POST',
    body: { article_id, name, content }
  })
}

export async function getCommentByArticleCode(article_id: number): Promise<Comments[] | null> {
  return await $fetch('/api/comments', {
    query: { article_id }
  }) as unknown as Promise<Comments[] | null>
}

export async function getPopularBlog(): Promise<BlogStat[]> {
  return await $fetch('/api/popular') as unknown as Promise<BlogStat[]>
}

export async function getNewBlog(): Promise<BlogStat[]> {
  return await $fetch('/api/newblog') as unknown as Promise<BlogStat[]>
}

export async function getTotalArticle(): Promise<number> {
  return await $fetch('/api/totalarticle') as unknown as Promise<number>
}

export async function getTotalLike(): Promise<number> {
  return await $fetch('/api/totallike') as unknown as Promise<number>
}

export async function getTotalReader(): Promise<number> {
  return await $fetch('/api/totalreader') as unknown as Promise<number>
}

export async function getBlogByArticleCode(code: string): Promise<BlogStat | null> {
  return await $fetch('/api/blog', {
    query: { code }
  }) as unknown as Promise<BlogStat | null>
}

export async function getTechBlog(): Promise<BlogStat[]> {
  return await $fetch('/api/techblog') as unknown as Promise<BlogStat[]>
}

export async function getFinanceBlog(): Promise<BlogStat[]> {
  return await $fetch('/api/financeblog') as unknown as Promise<BlogStat[]>
}

export async function getRelatedBlogExcept(articleCode: string): Promise<BlogStat[]> {
  return await $fetch('/api/relatedblog', {
    query: { articleCode }
  }) as unknown as Promise<BlogStat[]>
}

export async function getPoliticBlog(): Promise<BlogStat[]> {
  return await $fetch('/api/politicblog') as unknown as Promise<BlogStat[]>
}

export async function getEducationBlog(): Promise<BlogStat[]> {
  return await $fetch('/api/educationblog') as unknown as Promise<BlogStat[]>
}

export async function incrementTotalReadById(id: number) {
  return await $fetch('/api/incrementread', {
    method: 'POST',
    body: { id }
  })
}

export async function incrementLikeByid(id: number) {
  return await $fetch('/api/incrementlike', {
    method: 'POST',
    body: { id }
  })
}

export async function decrementLikeByid(id: number) {
  return await $fetch('/api/decrementlike', {
    method: 'POST',
    body: { id }
  })
}

export async function getBlogByPath(path: string) {
  return await $fetch('/api/blogbypath', {
    query: { path }
  })
}

export async function incrementTotalReadByPath(path: string) {
  const article = await getBlogByPath(path)
  if (article) {
    await incrementTotalReadById(article.id)
  }
}
