import db from '../utils/db'
import { articles } from '../db/schema'
import { desc } from 'drizzle-orm'

export default defineEventHandler(async () => {
  const result = await db
    .select()
    .from(articles)
    .orderBy(desc(articles.like))
  return result
})
