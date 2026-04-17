import { createFileRoute } from '@tanstack/react-router'
import { getStore } from '@netlify/blobs'

export const Route = createFileRoute('/api/notes-file')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url)
        const key = url.searchParams.get('key')

        if (!key || !key.startsWith('pdf/')) {
          return Response.json({ error: 'Invalid key' }, { status: 400 })
        }

        try {
          const store = getStore('jntuh-notes')
          const blob = await store.get(key, { type: 'blob' })

          if (!blob) {
            return Response.json({ error: 'File not found' }, { status: 404 })
          }

          const meta = await store.getMetadata(key)
          const name = meta?.metadata?.originalName ?? 'file.pdf'

          return new Response(blob, {
            headers: {
              'Content-Type': 'application/pdf',
              'Content-Disposition': `inline; filename="${name}"`,
            },
          })
        } catch (err) {
          console.error('Download error:', err)
          return Response.json({ error: 'Download failed' }, { status: 500 })
        }
      },
    },
  },
})
