import sharp from 'sharp'
import { db } from '~/server/db'
import { images, articles } from '~/server/db/schema'
import { eq } from 'drizzle-orm'
import { uploadToMinio, deleteFromMinio, MINIO_BUCKET } from '~/server/utils/minio'

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
    
    const articleList = await db.select().from(articles).where(eq(articles.id, articleId))
    const article = articleList[0]
    
    if (!article) {
      throw createError({ statusCode: 404, message: 'Article not found' })
    }

    const articleCode = article.articleCode || `article-${articleId}`
    const timestamp = Date.now()
    const fileName = fileField.filename || 'file'
    
    const ext = fileName.includes('.') ? fileName.split('.').pop()?.toLowerCase() : ''
    const imageExts = ['jpg', 'jpeg', 'png', 'webp', 'gif']
    const isImage = ext && imageExts.includes(ext)
    
    let publicPath: string
    
    if (isImage) {
      const newFileName = `${timestamp}.webp`
      const objectName = `blogs/${articleCode}/${newFileName}`
      const buffer = await sharp(fileField.data).webp({ quality: 80 }).toBuffer()
      publicPath = await uploadToMinio(buffer, objectName, 'image/webp')
    } else {
      const newFileName = `${timestamp}-${fileName}`
      const objectName = `blogs/${articleCode}/${newFileName}`
      const contentType = `application/octet-stream`
      publicPath = await uploadToMinio(Buffer.from(fileField.data), objectName, contentType)
    }

    const result = await db.insert(images).values({
      articleId,
      path: publicPath,
    }).returning()

    return result[0]
  }

  if (method === 'DELETE') {
    const body = await readBody(event)
    const imageId = body.id
    
    const existingImage = await db.select().from(images).where(eq(images.id, imageId))
    if (existingImage.length > 0 && existingImage[0] && existingImage[0].path) {
      const imagePath = existingImage[0].path as string
      if (imagePath.includes(MINIO_BUCKET)) {
        const objectName = imagePath.split(`/${MINIO_BUCKET}/`)[1]
        if (objectName) {
          await deleteFromMinio(objectName)
        }
      }
    }
    
    await db.delete(images).where(eq(images.id, imageId))
    return { success: true }
  }

  throw createError({ statusCode: 405, message: 'Method not allowed' })
})