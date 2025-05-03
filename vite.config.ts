import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 5173,
		proxy: {
			'/api': {
				target: 'https://makmela-api-production.up.railway.app/',
				changeOrigin: true,
				configure: (proxy, _options) => {
					proxy.on('proxyRes', (proxyRes, _req, res) => {
						if (proxyRes.statusCode === 404) {
							res.writeHead(302, { Location: '/not-found' })
							res.end()
						}
					})
				},
			},
			'/uploads': {
				target: 'https://makmela-api-production.up.railway.app/',
				changeOrigin: true,
			},
		},
	},
})
