// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 'https://ewkxvbgbzikwwudriebh.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY
// const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  return NextResponse.json({ message: 'Hello, World!' });
}
    