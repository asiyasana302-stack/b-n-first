import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import { Upload, FileText, Loader2, BookOpen } from 'lucide-react'

export const Route = createFileRoute('/notes')({
  component: NotesPage,
})

type FileEntry = { key: string; name: string }

function NotesPage() {
  const [files, setFiles] = useState<FileEntry[]>([])
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function loadFiles() {
    setLoading(true)
    try {
      const res = await fetch('/api/notes-files')
      const data = await res.json()
      if (data.files) setFiles(data.files)
    } catch {
      setError('Failed to load files')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFiles()
  }, [])

  async function handleUpload() {
    const file = fileInputRef.current?.files?.[0]
    if (!file) {
      setError('Please select a PDF file')
      return
    }
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed')
      return
    }

    setError(null)
    setUploading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/notes-upload', { method: 'POST', body: form })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Upload failed')
      setSuccessMsg(`"${file.name}" uploaded successfully!`)
      if (fileInputRef.current) fileInputRef.current.value = ''
      await loadFiles()
      setTimeout(() => setSuccessMsg(null), 4000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">JNTUH R25 Notes</h1>
          <p className="text-gray-500 mt-2">CSE &amp; AIML Study Materials</p>
        </div>

        {/* Upload Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5 text-blue-500" />
            Upload Notes
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              className="flex-1 block w-full text-sm text-gray-600
                file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
                file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100 cursor-pointer border border-gray-200
                rounded-lg px-2 py-1.5"
            />
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-blue-600
                text-white text-sm font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800
                disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading…
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Upload PDF
                </>
              )}
            </button>
          </div>
          {error && (
            <p className="mt-3 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
          )}
          {successMsg && (
            <p className="mt-3 text-sm text-green-700 bg-green-50 rounded-lg px-3 py-2">
              {successMsg}
            </p>
          )}
        </div>

        {/* File List */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-500" />
            Uploaded Files
          </h2>
          {loading ? (
            <div className="flex items-center justify-center py-10 text-gray-400 gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Loading files…</span>
            </div>
          ) : files.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <FileText className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p>No notes uploaded yet.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {files.map((f) => (
                <li key={f.key} className="flex items-center justify-between py-3 gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex-shrink-0 w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-red-500" />
                    </div>
                    <span className="text-sm text-gray-700 truncate">{f.name}</span>
                  </div>
                  <a
                    href={`/api/notes-file?key=${encodeURIComponent(f.key)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 text-sm font-medium text-blue-600 hover:text-blue-800
                      bg-blue-50 hover:bg-blue-100 rounded-lg px-3 py-1.5 transition-colors"
                  >
                    Open
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
