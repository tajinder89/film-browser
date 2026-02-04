import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express, { type Request, type Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

/**
 * Production server bundled for direct Node.js execution
 * Run with: node dist/server.js
 */
async function startServer(): Promise<void> {
  try {
    const htmlPath = path.resolve(__dirname, './client/index.html')
    const template = fs.readFileSync(htmlPath, 'utf-8')

    const renderPage = async (req: Request, res: Response): Promise<void> => {
      try {
        const url = req.originalUrl

        const ssrModulePath = `./server/entry-server.js?t=${Date.now()}`
        const { render } = await import(ssrModulePath)

        const { html, state } = await render(url)

        const safeState = JSON.stringify(state).replace(/</g, '\\u003c')
        const finalHtml = template
          .replace('<!--app-html-->', html)
          .replace(
            '<!--app-state-->',
            `<script>window.__REACT_QUERY_STATE__=${safeState}</script>`,
          )

        res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml)
      } catch (error: unknown) {
        res.status(500).end('Internal Server Error')
      }
    }

    app.get('/', renderPage)
    app.get('/movie/:id', renderPage)

    const maxAge = process.env.VITE_STATIC_ASSET_MAX_AGE || '1h'
    app.use(express.static(path.resolve(__dirname, './client'), { maxAge }))

    // Catch-all route for undefined URLs (404 page)
    app.use(renderPage)

    const port = process.env.PORT || 3000
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}/`)
    })
  } catch (error: unknown) {
    const err = error as Error
    console.error('Failed to start server:', err.message)
    process.exit(1)
  }
}

startServer()
