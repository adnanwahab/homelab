// server.js
import { serve } from "bun";

let latestData = {};
 
// setInterval(async () => {
//   const response = await fetch("https://example.com/data");
//   latestData = await response.json();
// }, 60_000);

import fs from "fs";


serve({
  port: 8000,
  async fetch(req) {



    const files = fs.readdirSync("/Users/shelbernstein/homelab/web/public/thumbnails/games");
    return new Response(JSON.stringify({ files }), {
      headers: { "Content-Type": "application/json" },
    });
  } 
})

//   return new Response("Not found", { status: 404 });
// }










//     let data = Object.assign(latestData, await getAllKV());
//     return new Response(JSON.stringify(latestData), {
//       headers: { "Content-Type": "application/json" },
//     });
//   },
// });

//console.log("hi");

import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.SUPABASE_URL || "https://ewkxvbgbzikwwudriebh.supabase.co";
const supabaseKey =
  process.env.SUPABASE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3a3h2Ymdiemlrd3d1ZHJpZWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1MjYzMDEsImV4cCI6MjA0OTEwMjMwMX0.LjW3EYwo7bg4Za_fGjXKGXS92fPqcAGVJRrbr3Vgh0Y";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getAllKV() {
  const { data, error } = await supabase.from("KV").select("*");

  return data;
}
