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

const html = `
<html>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
`;


function display_supabase_data() {
  return new Response(JSON.stringify({ data: await getAllKV() }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

serve({
  port: 8000,
  async fetch(req) {

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
});

console.log("Server running at http://localhost:8000");


