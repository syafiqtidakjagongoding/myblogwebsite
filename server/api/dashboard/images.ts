import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, extname } from 'path'
import { db } from '~/server/db'
import { images, articles } from '~/server/db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === 'GET') {
    const query = getQuery(event)
    const articleId = query.articleId

    if (articleId) {
      const articleImages = await db.select().from(images).where(eq(images.articleId, Number(articleId)))
      return articleImages
    }

    const allImages = await db.select().from(images)
    return allImages
  }

  if (method === 'POST') {
    const body = await readMultipartFormData(event)
    
    if (!body) {
      throw createError({ statusCode: 400, message: 'No form data' })
    }

    const articleIdField = body.find((field) => field.name === 'articleId')
    const fileField = body.find((field) => field.name === 'file')

    if (!articleIdField || !fileField) {
      throw createError({ statusCode: 400, message: 'Missing articleId or file' })
    }

    const articleId = Number(articleIdField.data.toString())
    const fileName = fileField.filename
    const fileExt = extname(fileName || '.webp').toLowerCase()
    
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
    const newFileName = `${timestamp}${fileExt}`
    const filePath = join(uploadDir, newFileName)
    const publicPath = `/images/blogs/${articleCode}/${newFileName}`

    writeFileSync(filePath, fileField.data)

    const result = await db.insert(images).values({
      articleId,
      path: publicPath,
    }).returning()

    return result[0]
  }

  if (method === 'DELETE') {
    const body = await readBody(event)
    await db.delete(images).where(eq(images.id, body.id))
    return { success: true }
  }

  throw createError({ statusCode: 405, message: 'Method not allowed' })
})
