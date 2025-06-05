export interface Comment {
  id: string
  content: string
  created_at: string
  post_id: string
  user_name: string
  user_id?: string
}

export interface CommentFormData {
  content: string
  post_id: string
} 