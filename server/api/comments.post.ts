import db from '../utils/db'
import { comments } from '../db/schema'
import nodemailer from 'nodemailer'

const config = useRuntimeConfig()

const transporter = nodemailer.createTransport({
  host: config.smtpHost,
  port: Number(config.smtpPort),
  secure: false,
  auth: {
    user: config.smtpUser,
    pass: config.smtpPass,
  },
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const articleId = Number(body.article_id)
  
  const _result = await db.insert(comments).values({
    articleId,
    name: body.name,
    content: body.content,
    createdAt: new Date(),
  })

  const mailOptions = {
    from: config.smtpUser,
    to: config.smtpTo,
    subject: `New Comment from ${body.name || 'Anonymous'}`,
    text: `You have a new comment on your blog syafiq-paradisam.my.id :\n\nName: ${body.name || 'Anonymous'}\nComment: ${body.content}`,
  }

  await transporter.sendMail(mailOptions)
  
  return { success: true }
})
