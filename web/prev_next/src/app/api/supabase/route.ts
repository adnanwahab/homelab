// supabase
// webgpu physics
// brwoserbase val.town 
// llama, nextjs, zig for hardware simulation

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || "https://ewkxvbgbzikwwudriebh.supabase.co"
const supabaseKey = process.env.SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3a3h2Ymdiemlrd3d1ZHJpZWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1MjYzMDEsImV4cCI6MjA0OTEwMjMwMX0.LjW3EYwo7bg4Za_fGjXKGXS92fPqcAGVJRrbr3Vgh0Y"
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('KV')
      .select('*')
      .limit(100)

    if (error) throw error

    return new Response(JSON.stringify(data, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      },
      status: 200
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      status: 500
    })
  }
}