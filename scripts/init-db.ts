import Database from "better-sqlite3";
import { mkdirSync, existsSync } from "fs";
import { dirname } from "path";

const dbPath = "blog.db";
const dbDir = dirname(dbPath);

if (!existsSync(dbDir)) {
  mkdirSync(dbDir, { recursive: true });
}

const sqlite = new Database(dbPath);

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
