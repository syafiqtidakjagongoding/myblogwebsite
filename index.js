import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

export default {
  async fetch(request, env, ctx) {
    try {
      // Coba ambil asset yang ada
      return await getAssetFromKV(
        { request, waitUntil: ctx.waitUntil.bind(ctx) },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: JSON.parse(env.__STATIC_CONTENT_MANIFEST),
        },
      )
    } catch (e) {
      const urls = [
        '/',
        '/blog/tech/what-is-openpgp-encryption',
        '/blog/tech/what-is-monero',
        '/blog/education/frugal-living-tips',
        '/blog/politic/donald-trump-pro-crypto',
        '/blog/tech',
        '/blog/education',
        '/blog/finance',
        '/blog/politic',
      ]

      const url = new URL(request.url)
      if (urls.includes(url.pathname)) {
        const notFoundHtml = await env.ASSETS.fetch(new Request(`${env.VITE_BASE_URL}/index.html`))
        return new Response(await notFoundHtml.text(), {
          status: 200,
          headers: { 'Content-Type': 'text/html; charset=UTF-8' },
        })
      }

      const notFoundHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>404 Not Found</title>
  <meta http-equiv="refresh" content="3;url=/">
</head>
<body>
  <h1>404 - Page Not Found</h1>
  <p>You will be redirected to the home page in 3 seconds...</p>
</body>
</html>
`

      return new Response(notFoundHtml, {
        status: 404,
        headers: { 'Content-Type': 'text/html; charset=UTF-8' },
      })
    }
  },
}
