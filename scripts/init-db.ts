import Database from "better-sqlite3";
import { mkdirSync, existsSync } from "fs";
import { dirname } from "path";

const dbPath = "blog.db";
const dbDir = dirname(dbPath);

if (!existsSync(dbDir)) {
  mkdirSync(dbDir, { recursive: true });
}

const sqlite = new Database(dbPath);

// Schema definitions kept for reference
// const _articles = sqliteTable("articles", {
//   id: integer("id").primaryKey({ autoIncrement: true }),
//   articleCode: text("article_code").notNull().unique(),
//   title: text("title").notNull(),
//   description: text("description").notNull(),
//   picturePath: text("picture_path").notNull(),
//   path: text("path").notNull(),
//   tags: text("tags").notNull(),
//   datePublished: integer("date_published").notNull(),
//   isReady: integer("is_ready").notNull().default(0),
//   totalRead: integer("total_read").notNull().default(0),
//   like: integer("like").notNull().default(0),
// });

// const _comments = sqliteTable("comments", {
//   id: integer("id").primaryKey({ autoIncrement: true }),
//   articleId: integer("article_id").notNull(),
//   name: text("name"),
//   content: text("content").notNull(),
//   createdAt: integer("created_at").notNull(),
//   approved: integer("approved").notNull().default(0),
// });

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    article_code TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    picture_path TEXT NOT NULL,
    path TEXT NOT NULL,
    tags TEXT NOT NULL,
    date_published INTEGER NOT NULL,
    is_ready INTEGER NOT NULL DEFAULT 0,
    total_read INTEGER NOT NULL DEFAULT 0,
    like INTEGER NOT NULL DEFAULT 0
  )
`);

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    article_id INTEGER NOT NULL,
    name TEXT,
    content TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    approved INTEGER NOT NULL DEFAULT 0
  )
`);

console.log("Database initialized successfully!");
