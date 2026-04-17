import { createFileRoute } from '@tanstack/react-router'
import { getStore } from '@netlify/blobs'

export const Route = createFileRoute('/api/notes-upload')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const formData = await request.formData()
          const file = formData.get('file') as File | null

          if (!file) {
            return Response.json({ error: 'No file provided' }, { status: 400 })
          }

          if (file.type !== 'application/pdf') {
            return Response.json({ error: 'Only PDF files are allowed' }, { status: 400 })
          }

          const store = getStore('jntuh-notes')
          const buffer = await file.arrayBuffer()
          const key = `pdf/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`

          await store.set(key, buffer, {
            metadata: { originalName: file.name, contentType: 'application/pdf' },
          })

          return Response.json({ success: true, key, name: file.name })
        } catch (err) {
          console.error('Upload error:', err)
          return Response.json({ error: 'Upload failed' }, { status: 500 })
        }
      },
    },
  },
})
