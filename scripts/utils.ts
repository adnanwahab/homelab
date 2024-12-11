
//mechE 

//magic llama
//magic iframe
//litefs + idk


//opw
//claude
//rustkit

import { createClient } from '@supabase/supabase-js';
const get_supbase =  `op item get "supabase" --format json`

async function storeLinks(links: string[]) {
 // Execute the 1Password CLI command and parse the result
 const result = await Bun.$`op item get "supabase" --format json`;
 const credentials = JSON.parse(result.stdout.toString());
 

const urls = ["https://hnhiring.com/december-2024"];
const url = credentials.fields.find(f => f.label === "URL").value;
  const anon = credentials.fields.find(f => f.label === "anon").value;

const supabase = createClient(
  url,
  anon
);
    const { data: jsonData, error: jsonError } = await supabase
      .from('KV')
      .insert([
        { 
          key: "links",
          value: JSON.stringify(links)
        }
      ])
  
      console.log(jsonData, jsonError)
      console.log('complete!')
  }
  
  