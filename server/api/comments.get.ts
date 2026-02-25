import db from '../utils/db'
import { comments } from '../db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const articleId = Number(query.article_id)

  const result = await db.select().from(comments).where(eq(comments.articleId, articleId))
  return result
})
