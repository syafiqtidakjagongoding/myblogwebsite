import { supabase } from '../lib/SupabaseClient'
import type { Comments } from './types'

const isReady = true
const table = import.meta.env.VITE_ENVIRONMENT == 'develop' ? 'articles_dev' : 'articles'
const commentTables = import.meta.env.VITE_ENVIRONMENT == 'develop' ? 'comments_dev' : 'comments'

export async function getDataForYou() {
  const { data } = await supabase.from(table).select().eq('is_ready', isReady)
  return data
}

export async function insertComments(article_id: number, name: string | null, content: string) {
  const { error } = await supabase.from(commentTables).insert({ article_id, name, content })

  if (error) {
    console.error('Gagal mengirim komentar:', error.message)
    throw error
  }

  return true
}

export async function getCommentByArticleCode(article_id: number): Promise<Comments[] | null> {
  const { data } = await supabase.from(commentTables).select().eq('article_id', article_id).eq('approved', true)
  return data
}

export async function getPopularBlog() {
  const { data } = await supabase
    .from(table)
    .select()
    .eq('is_ready', isReady)
    .order('like', { ascending: false })
  return data
}

export async function getNewBlog() {
  const { data } = await supabase
    .from(table)
    .select()
    .eq('is_ready', isReady)
    .order('date_published', { ascending: false })
  return data
}

export async function getTotalArticle() {
  const { count } = await supabase
    .from(table)
    .select('*', { count: 'exact', head: true })
    .eq('is_ready', isReady) // head: true untuk ambil count saja, tanpa data

  return count
}

export async function getTotalLike() {
  const { data, error } = await supabase
    .from(table)
    .select('like', { count: 'exact' })
    .eq('is_ready', isReady)

  if (error) {
    console.error(error)
    return null
  }
  const total = data.reduce((sum, item) => sum + (item.like || 0), 0)
  return total
}

export async function getTotalReader() {
  const { data, error } = await supabase
    .from(table)
    .select('total_read', { count: 'exact' })
    .eq('is_ready', isReady)

  if (error) {
    console.error(error)
    return null
  }
  const total = data.reduce((sum, item) => sum + (item.total_read || 0), 0)
  return total
}

export async function getBlogByArticleCode(code: string) {
  const { data } = await supabase.from(table).select().eq('article_code', code).single()
  return await data
}

export async function getTechBlog() {
  const { data } = await supabase
    .from(table)
    .select()
    .contains('tags', ['Tech'])
    .eq('is_ready', isReady)
  return await data
}

export async function getFinanceBlog() {
  const { data } = await supabase
    .from(table)
    .select()
    .contains('tags', ['Finance'])
    .eq('is_ready', isReady)
  return await data
}

export async function getRelatedBlogExcept(articleCode: string) {
  const { data } = await supabase
    .from(table)
    .select()
    .not('article_code', 'eq', articleCode)
    .eq('is_ready', isReady)
    .limit(6)
  return await data
}

export async function getPoliticBlog() {
  const { data } = await supabase
    .from(table)
    .select()
    .contains('tags', ['Politic'])
    .eq('is_ready', isReady)
  return await data
}

export async function getEducationBlog() {
  const { data } = await supabase
    .from(table)
    .select()
    .contains('tags', ['Education'])
    .eq('is_ready', isReady)
  return await data
}

export async function incrementTotalReadById(id: number) {
  // Ambil current total_read
  const { data: currentRow, error: selectError } = await supabase
    .from(table)
    .select('total_read')
    .eq('id', id)
    .eq('is_ready', isReady)
    .single()

  if (selectError || !currentRow) {
    throw selectError ?? new Error('Data not found')
  }

  const newTotal = currentRow.total_read + 1

  const { data, error } = await supabase
    .from(table)
    .update({ total_read: newTotal })
    .eq('id', id)
    .eq('is_ready', isReady)
    .select()
    .single()

  if (error) throw error

  return data
}

export async function incrementLikeByid(id: number) {
  // Ambil current total_read
  const { data: currentRow, error: selectError } = await supabase
    .from(table)
    .select('like')
    .eq('id', id)
    .eq('is_ready', isReady)
    .single()

  if (selectError || !currentRow) {
    throw selectError ?? new Error('Data not found')
  }

  const newTotal = currentRow.like + 1

  const { data, error } = await supabase
    .from(table)
    .update({ like: newTotal })
    .eq('id', id)
    .eq('is_ready', isReady)
    .select()
    .single()

  if (error) throw error

  return data
}

export async function decrementLikeByid(id: number) {
  // Ambil current total_read
  const { data: currentRow, error: selectError } = await supabase
    .from(table)
    .select('like')
    .eq('id', id)
    .eq('is_ready', isReady)
    .single()

  if (selectError || !currentRow) {
    throw selectError ?? new Error('Data not found')
  }

  const newTotal = currentRow.like - 1

  const { data, error } = await supabase
    .from(table)
    .update({ like: newTotal })
    .eq('id', id)
    .eq('is_ready', isReady)
    .select()
    .single()

  if (error) throw error

  return data
}
