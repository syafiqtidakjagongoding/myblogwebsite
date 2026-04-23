import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const articles = sqliteTable("articles", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  articleCode: text("article_code").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  picturePath: text("picture_path").notNull(),
  path: text("path").notNull(),
  tags: text("tags", { mode: "json" }).$type<string[]>().notNull(),
  datePublished: integer("date_published", { mode: "timestamp" })
    .notNull()
    .default(sql`strftime('%s', 'now')`),
  totalRead: integer("total_read").notNull().default(0),
  like: integer("like").notNull().default(0),
});

export const comments = sqliteTable("comments", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  articleId: integer("article_id")
    .notNull()
    .references(() => articles.id, { onDelete: "cascade" }),
  name: text("name"),
  content: text("content").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`strftime('%s', 'now')`),
});

export const content = sqliteTable("content", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  articleId: integer("article_id")
    .references(() => articles.id)
    .notNull(),
  contentIDN: text("contentIDN"),
  contentEN: text("contentEN"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`strftime('%s', 'now')`),
});

export const images = sqliteTable("images", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  articleId: integer("article_id")
    .references(() => articles.id)
    .notNull(),
  path: text("path").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`strftime('%s', 'now')`),
});
