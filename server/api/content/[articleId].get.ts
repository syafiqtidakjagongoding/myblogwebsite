import { db } from "~/server/db";
import { content } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const articleId = query.articleId as string;
  console.log(query)

  if (!articleId) {
    throw createError({ statusCode: 400, message: "articleId is required" });
  }
  const contentList = await db
    .select()
    .from(content)
    .where(eq(content.articleId, Number(articleId)));

  if (contentList.length === 0) {
    return null;
  }

  return contentList[0];
});
