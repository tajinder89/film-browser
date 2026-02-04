import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express, { Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

/**
 * Production server that loads SSR modules directly without bundling
 * This avoids React Router context issues that occur with bundled code
 */
async function startServer(): Promise<void> {
  try {
    const htmlPath = path.resolve(__dirname, 'dist/client/index.html')
    const template = fs.readFileSync(htmlPath, 'utf-8')

    const renderPage = async (req: Request, res: Response): Promise<void> => {
      try {
        const url = req.originalUrl

        const { render } = await import('./dist/server/entry-server.js') as { render: (url: string) => Promise<{ html: string; state: unknown }> }

        const { html, state } = await render(url)

        const safeJsonStringify = (obj: unknown): string => {
          return JSON.stringify(obj)
            .replace(/</g, '\\u003c')
            .replace(/>/g, '\\u003e')
            .replace(/&/g, '\\u0026')
        }

        const finalHtml = template
          .replace('<!--app-html-->', html)
          .replace('<!--app-state-->', `<script>window.__REACT_QUERY_STATE__=${safeJsonStringify(state)}</script>`);

        res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml)
      } catch (error: unknown) {
        res.status(500).end('Internal Server Error')
      }
    }

    app.get('/', renderPage)
    app.get('/movie/:id', renderPage)

    app.use(express.static(path.resolve(__dirname, 'dist/client'), { maxAge: '1h' }))

    const port = process.env.PORT || 3000
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}/`)
    })
  } catch (error: unknown) {
    const err = error as Error
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

startServer()
