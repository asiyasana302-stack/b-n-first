import { createFileRoute } from '@tanstack/react-router'
import { getStore } from '@netlify/blobs'

export const Route = createFileRoute('/api/notes-files')({
  server: {
    handlers: {
      GET: async () => {
        try {
          const store = getStore('jntuh-notes')
          const { blobs } = await store.list({ prefix: 'pdf/' })

          const files = await Promise.all(
            blobs.map(async (blob) => {
              const meta = await store.getMetadata(blob.key)
              return {
                key: blob.key,
                name: meta?.metadata?.originalName ?? blob.key.replace(/^pdf\/\d+-/, ''),
              }
            })
          )

          return Response.json({ files })
        } catch (err) {
          console.error('List error:', err)
          return Response.json({ error: 'Failed to list files' }, { status: 500 })
        }
      },
    },
  },
})
