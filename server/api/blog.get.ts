import db from '../utils/db'
import { articles } from '../db/schema'
import { eq } from 'drizzle-orm'

function parseDate(value: number | Date | string | null | undefined): Date | null {
  if (!value) return null
  if (value instanceof Date) return value
  const date = new Date(value)
  return isNaN(date.getTime()) ? null : date
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const code = query.code as string
  
  const result = await db.select().from(articles).where(eq(articles.articleCode, code)).limit(1)
  
  if (!result[0]) return null
  
  return {
    ...result[0],
    datePublished: parseDate(result[0].datePublished)
  }
})
