import { db } from '~/server/db'
import { content } from '~/server/db/schema'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === 'GET') {
    const allContent = await db.select().from(content)
    return allContent
  }

  throw createError({ statusCode: 405, message: 'Method not allowed' })
})
