// server.js
import { serve } from "bun";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "https://ewkxvbgbzikwwudriebh.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY || "your-key-here";
const supabase = createClient(supabaseUrl, supabaseKey);

const getAllKV = async () => {
  const { data, error } = await supabase.from("KV").select("*");
  if (error) {
    console.error("Supabase error:", error);
    return [];
  }
  return data;
};

serve({
  port: 8000,
  async fetch(req) {

    return new Response(JSON.stringify({ data: await getAllKV() }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
});

console.log("Server running at http://localhost:8000");


