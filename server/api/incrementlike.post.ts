import db from '../utils/db'
import { articles } from '../db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const id = Number(body.id)
  
  const currentRow = await db.select().from(articles).where(eq(articles.id, id)).limit(1)
  
  if (!currentRow[0]) {
    throw createError({ statusCode: 404, message: 'Data not found' })
  }

  const newTotal = currentRow[0].like + 1

  const result = await db
    .update(articles)
    .set({ like: newTotal })
    .where(eq(articles.id, id))
    .returning()

  return result[0]
})
