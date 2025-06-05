'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Comment, CommentFormData } from './types'

interface CommentFormProps {
  postId: string
  onNewComment: (comment: Comment) => void
}

export default function CommentForm({ postId, onNewComment }: CommentFormProps) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsSubmitting(true)
    setError(null)

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert({
          content: content.trim(),
          post_id: postId,
          user_name: 'Anonymous'
        })
        .select('*')
        .single()

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      setContent('')
      onNewComment(data)
    } catch (err) {
      console.error('Error details:', err)
      setError(err instanceof Error ? err.message : 'Failed to post comment')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-6">
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your comment..."
          className="w-full p-3 border border-neutral-700 bg-neutral-800 text-neutral-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition min-h-[90px] resize-none shadow-sm"
          rows={4}
          disabled={isSubmitting}
        />
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={isSubmitting || !content.trim()}
        className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow"
      >
        {isSubmitting ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  )
} 