<html>
<head>
  <title>JNTUH R25 Notes</title>
</head>
<body>
<head>
  <meta name="google-site-verification" content="N-TqnvNFVMi0_7dQ" />
  <title>JNTUH R25 Notes</title>
</head>
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import netlify from '@netlify/vite-plugin-tanstack-start'
import contentCollections from '@content-collections/vite'

const config = defineConfig({
  plugins: [
    contentCollections(),
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    netlify(),
    tanstackStart(),
    viteReact(),
  ],
})

export default config
