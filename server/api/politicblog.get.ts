import db from '../utils/db'
import { articles } from '../db/schema'
import { sql } from 'drizzle-orm'

export default defineEventHandler(async () => {
  const result = await db
    .select()
    .from(articles)
    .where(sql`is_ready = 1 AND tags LIKE '%Politic%'`)
  return result
})
