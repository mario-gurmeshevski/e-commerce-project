import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const baseUrl = 'localhost:5173'
const routes = [
	'/',
	'/shop',
	'/contact',
	'/about',
	'/checkout',
	'/terms',
	'/privacy',
]

const generateSitemap = () => {
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
	.map(
		(route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
	)
	.join('')}
</urlset>`

	const outputPath = path.resolve(__dirname, '../public/sitemap.xml')
	fs.writeFileSync(outputPath, sitemap, 'utf8')
}

generateSitemap()
