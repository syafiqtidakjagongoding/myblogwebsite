import { db } from '~/server/db'
import { articles, content } from '~/server/db/schema'
import { eq, desc } from 'drizzle-orm'

interface ArticleBody {
  id?: number
  title?: string
  description?: string
  picturePath?: string
  path?: string
  tags?: string[]
  articleCode?: string
  category?: string
  contentIDN?: string
  contentEN?: string
}

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === 'GET') {
    const allArticles = await db.select().from(articles).orderBy(desc(articles.id))
    return allArticles
  }

  if (method === 'POST') {
    const body = await readBody(event) as ArticleBody
    const result = await db.insert(articles).values({
      articleCode: body.articleCode || `article-${Date.now()}`,
      title: body.title || '',
      description: body.description || '',
      picturePath: body.picturePath || '/images/placeholder.jpg',
      path: body.path || `/blog/${body.category}/${body.articleCode || Date.now()}`,
      tags: body.tags || [],
    }).returning()
    
    if (body.contentIDN || body.contentEN) {
      const inserted = result[0]
      if (inserted) {
        await db.insert(content).values({
          articleId: inserted.id,
          contentIDN: body.contentIDN || '',
          contentEN: body.contentEN || '',
        })
      }
    }
    
    return result[0]
  }

  if (method === 'PUT') {
    const body = await readBody(event) as ArticleBody
    
    if (body.title || body.description || body.picturePath || body.path || body.tags || body.articleCode) {
      const updateData: Partial<ArticleBody> = {}
      if (body.title) updateData.title = body.title
      if (body.description !== undefined) updateData.description = body.description
      if (body.picturePath) updateData.picturePath = body.picturePath
      if (body.path) updateData.path = body.path
      if (body.tags) updateData.tags = body.tags
      if (body.articleCode) updateData.articleCode = body.articleCode

      await db.update(articles).set(updateData).where(eq(articles.id, body.id!))
    }

    if (body.contentIDN !== undefined || body.contentEN !== undefined) {
      const existingContent = await db.select().from(content).where(eq(content.articleId, body.id!))
      
      if (existingContent.length > 0) {
        const contentUpdate: { contentIDN?: string; contentEN?: string } = {}
        if (body.contentIDN !== undefined) contentUpdate.contentIDN = body.contentIDN
        if (body.contentEN !== undefined) contentUpdate.contentEN = body.contentEN
        await db.update(content).set(contentUpdate).where(eq(content.articleId, body.id!))
      } else {
        await db.insert(content).values({
          articleId: body.id!,
          contentIDN: body.contentIDN || '',
          contentEN: body.contentEN || '',
        })
      }
    }

    return { success: true }
  }

  if (method === 'DELETE') {
    const body = await readBody(event)
    await db.delete(content).where(eq(content.articleId, body.id))
    await db.delete(articles).where(eq(articles.id, body.id))
    return { success: true }
  }

  throw createError({ statusCode: 405, message: 'Method not allowed' })
})
