import db from '../utils/db'
import { articles } from '../db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const path = query.path as string
  
  const result = await db.select().from(articles).where(eq(articles.path, path)).limit(1)
  return result[0] ?? null
})
