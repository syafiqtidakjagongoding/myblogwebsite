import db from '../utils/db'
import { comments } from '../db/schema'
import { eq } from 'drizzle-orm'

function parseDate(value: number | Date | string | null | undefined): Date | null {
  if (!value) return null
  if (value instanceof Date) return value
  const date = new Date(value)
  return isNaN(date.getTime()) ? null : date
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const articleId = Number(query.article_id)

  const result = await db.select().from(comments).where(eq(comments.articleId, articleId))
  
  return result.map(comment => ({
    ...comment,
    createdAt: parseDate(comment.createdAt)
  }))
})
