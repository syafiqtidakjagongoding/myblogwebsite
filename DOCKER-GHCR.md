# Cara Menjalankan dengan Docker Compose (Dari Image ghcr.io)

Image: `ghcr.io/syafiqtidakjagongoding/myblogwebsite:latest`

## Menggunakan Image Langsung (Tanpa Build)

Gunakan `docker-compose.yml` yang sudah dimodifikasi untuk menggunakan image dari ghcr.io:

```bash
docker-compose -f docker-compose.ghcr.yml up -d
```

Atau dengan versi spesifik:

```bash
docker-compose -f docker-compose.ghcr.yml up -d --pull=always
```

## Catatan Penting

- Pastikan volume `blog.db` sudah ada di host jika ingin mempertahankan data
- Environment variables bisa dikonfigurasi di file `.env` atau langsung di docker-compose

## Environment Variables yang Diperlukan

```env
NUXT_PUBLIC_BASE_URL=http://localhost:3000
# Optional - untuk fitur email
NUXT_SMTP_HOST=smtp.example.com
NUXT_SMTP_PORT=587
NUXT_SMTP_USER=your-email@example.com
NUXT_SMTP_PASS=your-password
NUXT_SMTP_TO=admin@example.com
```
