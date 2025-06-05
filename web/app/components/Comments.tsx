'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Comment } from './types'
import CommentForm from './CommentForm'

interface CommentsProps {
  postId: string
}

export default function Comments({ postId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchComments()
  }, [postId])

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: false })

      if (error) throw error
      setComments(data || [])
    } catch (error) {
      console.error('Error fetching comments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleNewComment = async (newComment: Comment) => {
    setComments((prev) => [newComment, ...prev])
  }

  if (loading) {
    return <div className="text-center py-4">Loading comments...</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Comments</h2>
      <CommentForm postId={postId} onNewComment={handleNewComment} />
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-semibold">{comment.user_name || 'Anonymous'}</span>
              <span className="text-gray-500 text-sm">
                {new Date(comment.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-gray-500 text-center">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  )
} 