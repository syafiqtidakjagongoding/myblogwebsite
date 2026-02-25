import db from '../utils/db'
import { articles } from '../db/schema'
import { sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const articleCode = query.articleCode as string
  
  const result = await db
    .select()
    .from(articles)
    .where(sql`is_ready = 1 AND article_code != ${articleCode}`)
    .limit(6)
  return result
})
