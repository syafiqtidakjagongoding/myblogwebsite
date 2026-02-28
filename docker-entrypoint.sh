#!/bin/sh
set -e

DB_FILE="/app/blog.db"

# 1. Buat file SQLite jika benar-benar belum ada (atau jika masih berupa folder kesalahan Docker)
if [ ! -f "$DB_FILE" ] || [ -d "$DB_FILE" ]; then
    if [ -d "$DB_FILE" ]; then
        rm -rf "$DB_FILE"
    fi
    echo "Creating new SQLite database file..."
    sqlite3 "$DB_FILE" "VACUUM;"
fi

# 2. Cek apakah database sudah memiliki tabel (Misal: cek tabel 'users' atau 'posts')
# Ganti 'posts' dengan nama salah satu tabel utama di aplikasi Nuxt kamu
TABLE_COUNT=$(sqlite3 "$DB_FILE" "SELECT count(name) FROM sqlite_master WHERE type='table' AND name='articles' AND name='comments';")

if [ "$TABLE_COUNT" -eq "0" ]; then
    echo "Database exists but tables are missing. Initializing schema..."
    npx tsx /app/scripts/init-db.ts
else
    echo "Database and tables already exist. Skipping initialization."
fi

