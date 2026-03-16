import { db } from '~/server/db'
import { comments, articles } from '~/server/db/schema'
import { eq, desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === 'GET') {
    const allComments = await db.select({
      id: comments.id,
      name: comments.name,
      content: comments.content,
      createdAt: comments.createdAt,
      articleId: comments.articleId,
      articleTitle: articles.title,
    })
      .from(comments)
      .leftJoin(articles, eq(comments.articleId, articles.id))
      .orderBy(desc(comments.id))
    
    return allComments
  }

  if (method === 'DELETE') {
    const body = await readBody(event)
    await db.delete(comments).where(eq(comments.id, body.id))
    return { success: true }
  }

  throw createError({ statusCode: 405, message: 'Method not allowed' })
})
