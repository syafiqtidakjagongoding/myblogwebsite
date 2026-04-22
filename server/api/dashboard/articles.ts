import { mkdirSync, existsSync } from 'fs'
import { join } from 'path'
import sharp from 'sharp'
import { db } from '~/server/db'
import { articles, content, images, comments } from '~/server/db/schema'
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
    const contentType = event.headers.get('content-type') || ''
    
    if (contentType.includes('multipart/form-data')) {
      const body = await readMultipartFormData(event)
      const fileField = body?.find((f) => f.name === 'file')
      const articleCodeField = body?.find((f) => f.name === 'articleCode')
      
      if (fileField && articleCodeField) {
        const articleCode = articleCodeField.data.toString()
        
        const uploadDir = join(process.cwd(), 'public', 'images', 'blogs', articleCode)
        if (!existsSync(uploadDir)) {
          mkdirSync(uploadDir, { recursive: true })
        }
        
        const timestamp = Date.now()
        const newFileName = `cover-${timestamp}.webp`
        const filePath = join(uploadDir, newFileName)
        const publicPath = `/images/blogs/${articleCode}/${newFileName}`
        
        await sharp(fileField.data)
          .webp({ quality: 80 })
          .toFile(filePath)
        
        return { picturePath: publicPath }
      }
    }
    
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
    const query = getQuery(event)
    const id = Number(query.id)
    
    await db.delete(content).where(eq(content.articleId, id))
    await db.delete(images).where(eq(images.articleId, id))
    await db.delete(comments).where(eq(comments.articleId, id))
    await db.delete(articles).where(eq(articles.id, id))
    return { success: true }
  }

  if (method === 'PATCH') {
    const body = await readMultipartFormData(event)
    
    if (!body) {
      throw createError({ statusCode: 400, message: 'No form data' })
    }

    const idField = body.find((field) => field.name === 'id')
    const fileField = body.find((field) => field.name === 'file')

    if (!idField || !fileField) {
      throw createError({ statusCode: 400, message: 'Missing id or file' })
    }

    const articleId = Number(idField.data.toString())
    
    const articleList = await db.select().from(articles).where(eq(articles.id, articleId))
    const article = articleList[0]
    
    if (!article) {
      throw createError({ statusCode: 404, message: 'Article not found' })
    }

    const articleCode = article.articleCode || `article-${articleId}`
    const uploadDir = join(process.cwd(), 'public', 'images', 'blogs', articleCode)
    
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true })
    }

    const timestamp = Date.now()
    const newFileName = `cover-${timestamp}.webp`
    const filePath = join(uploadDir, newFileName)
    const publicPath = `/images/blogs/${articleCode}/${newFileName}`

    await sharp(fileField.data)
      .webp({ quality: 80 })
      .toFile(filePath)

    await db.update(articles).set({ picturePath: publicPath }).where(eq(articles.id, articleId))

    return { picturePath: publicPath }
  }

  throw createError({ statusCode: 405, message: 'Method not allowed' })
})
