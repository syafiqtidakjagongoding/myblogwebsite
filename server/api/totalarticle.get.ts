import db from '../utils/db'
import { articles } from '../db/schema'
import { sql } from 'drizzle-orm'

export default defineEventHandler(async () => {
  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(articles)
    .where(sql`is_ready = 1`)
  return result[0]?.count ?? 0
})
