import db from '../utils/db'
import { articles } from '../db/schema'

export default defineEventHandler(async () => {
  const result = await db
    .select()
    .from(articles)
  return result
})
