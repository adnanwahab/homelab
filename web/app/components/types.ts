export interface Comment {
  id: string
  content: string
  created_at: string
  user_id: string
  post_id: string
  user_name?: string
}

export interface CommentFormData {
  content: string
  post_id: string
} 