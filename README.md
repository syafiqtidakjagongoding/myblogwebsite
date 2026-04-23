# My Personal Blog

Personal blogku yang dibangun dengan Nuxt.js, TailwindCSS, dan SQLite (better-sqlite3).

## Cara Menjalankan

Ada 3 cara untuk menjalankan blog ini:

### 1. Menggunakan Docker Build (Build sendiri)

```bash
# Build dan jalankan
docker-compose up -d

# Atau build ulang jika ada perubahan
docker-compose build
docker-compose up -d
```

Akses: http://localhost:3000

### 2. Menggunakan Docker Pull (Image dari ghcr.io)

Gunakan image langsung tanpa perlu build:

```bash
# Gunakan docker-compose.ghcr.yml
docker-compose -f docker-compose.ghcr.yml up -d
```

### 3. Install Nuxt.js Langsung (Tanpa Docker)

Prasyarat: Node.js 18+

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Akses: http://localhost:3000

er:




















```env
NUXT_PUBLIC_BASE_URL=http://localhost:3000

# Optional - untuk fitur email (contact form)
NUXT_SMTP_HOST=smtp.example.com
NUXT_SMTP_PORT=587
NUXT_SMTP_USER=your-email@example.com
NUXT_SMTP_PASS=your-password
NUXT_SMTP_TO=admin@example.com
```

## Build Production

```bash
npm run build
npm run preview
```

## Tech Stack

- Nuxt.js 4
- TailwindCSS
- SQLite (better-sqlite3)
- Drizzle ORM
- Pinia (State Management)
- FontAwesome Icons
