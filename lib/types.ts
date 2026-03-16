export type BlogStat = {
  articleCode: string
  title: string
  description: string
  picturePath: string
  id: number
  tags: string[]
  path: string
  datePublished: string | Date
  totalRead: number
  like: number
}

export type Comments = {
  id: number
  articleId: number
  name: string | null
  content: string
  createdAt: Date
}
