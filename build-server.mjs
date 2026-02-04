#!/usr/bin/env node
import { build } from 'esbuild'

await build({
  entryPoints: ['src/server.ts'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  outfile: 'dist/server.js',
  external: ['express', 'dotenv', '../dist/server/entry-server.js'],
  format: 'esm',
  packages: 'external',
  logLevel: 'info',
}).catch(() => process.exit(1))

console.log('✓ Production server bundled: dist/server.js')
