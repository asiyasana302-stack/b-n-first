# JNTUH R25 Notes

A web application for sharing and accessing JNTUH R25 study materials (CSE & AIML). Students can upload PDF notes that are stored persistently and made available for others to view.

## Key Technologies

| Technology | Role |
|---|---|
| TanStack Start | Full-stack React framework |
| React 19 + TanStack Router | UI and file-based routing |
| Vite 7 + TypeScript | Build tooling, strict mode |
| Tailwind CSS 4 | Styling |
| Netlify Blobs | Serverless PDF storage |
| Content Collections | Type-safe blog/markdown content |
| Netlify | Deployment platform |

## Features

- **Upload PDFs** – Select any PDF file and upload it to persistent Netlify Blobs storage.
- **Browse files** – All uploaded notes are listed and accessible directly in the browser.
- **Blog** – A blog section with categorized posts built with Content Collections.

## Running Locally

Install dependencies and start the dev server via Netlify CLI (required for Blobs support):

```bash
npm install
netlify dev
```

The app will be available at [http://localhost:8888](http://localhost:8888).

> **Note:** Netlify Blobs requires at least one production deploy on Netlify before it works locally. Run `netlify link` to connect to your site, then `netlify dev` for full functionality.

## Environment Variables

No environment variables are required for the core functionality. If you add AI features, set:

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | For Claude-powered AI assistant |

## Project Structure

```
src/routes/
  notes.tsx              # JNTUH Notes upload/browse page
  api.notes-upload.ts    # POST /api/notes-upload – handles PDF upload
  api.notes-files.ts     # GET /api/notes-files – lists uploaded files
  api.notes-file.ts      # GET /api/notes-file?key=… – serves a PDF
  index.tsx              # Blog home
content/posts/           # Markdown blog posts
```
