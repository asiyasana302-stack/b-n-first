import { createFileRoute, Link } from '@tanstack/react-router'
import { allPosts } from 'content-collections'
import BlogPosts from '@/components/blog-posts'
import { BookOpen } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div>
      <div className="bg-blue-600 text-white px-4 py-2 text-sm text-center">
        <Link to="/notes" className="inline-flex items-center gap-1.5 font-medium hover:underline">
          <BookOpen className="w-4 h-4" />
          JNTUH R25 Notes – Access CSE &amp; AIML study materials
        </Link>
      </div>
      <BlogPosts title="Your Blog" posts={allPosts} />
    </div>
  )
}
