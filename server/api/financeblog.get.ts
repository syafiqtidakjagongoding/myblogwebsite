import db from '../utils/db'
import { articles } from '../db/schema'
import { sql } from 'drizzle-orm'

function parseDate(value: number | Date | string | null | undefined): Date | null {
  if (!value) return null
  if (value instanceof Date) return value
  const date = new Date(value)
  return isNaN(date.getTime()) ? null : date
}

export default defineEventHandler(async () => {
  const result = await db
    .select()
    .from(articles)
    .where(sql`tags LIKE '%Finance%'`)
  
  return result.map(blog => ({
    ...blog,
    datePublished: parseDate(blog.datePublished)
  }))
})
