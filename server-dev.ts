import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express, { Request, Response, NextFunction } from 'express'
import { createServer as createViteServer, ViteDevServer } from 'vite'
import dotenv from 'dotenv'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

async function createServer(): Promise<void> {
  const vite: ViteDevServer = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  })

  app.use(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (req.method !== 'GET') return next()
    if (/\.\w+$/.test(req.path)) return next()

    if (req.path.startsWith('/@')) return next()
    if (req.path.startsWith('/node_modules/.vite')) return next()
    if (req.path.includes(':')) return next()

    try {
      const url = req.originalUrl

      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
      template = await vite.transformIndexHtml(url, template)

      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx') as { render: (url: string) => Promise<{ html: string; state: unknown }> }
      const { html, state } = await render(url)

      const safeJsonStringify = (obj: unknown): string => {
        return JSON.stringify(obj)
          .replace(/</g, '\\u003c')
          .replace(/>/g, '\\u003e')
          .replace(/&/g, '\\u0026')
      }

      const finalHtml = template
        .replace('<!--app-html-->', html)
        .replace('<!--app-state-->', `<script>window.__REACT_QUERY_STATE__=${safeJsonStringify(state)}</script>`)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml)
    } catch (e: unknown) {
      const error = e as Error
      vite.ssrFixStacktrace(error)
      res.status(500).end(error.stack)
    }
  })

  app.use(vite.middlewares)

  const port = process.env.PORT || 5173
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}/`)
  })
}

createServer()
