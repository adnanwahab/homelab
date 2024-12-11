import fs from "fs";
import { OpenAI } from "openai";
import { spawn } from "child_process";

const magicCommand = "op item get 'open_ai_test' --format json | jq -r '.fields[0].value'";

// Execute command synchronously in Bun
const opResult = Bun.spawnSync(["op", "item", "get", "open_ai_test", "--format", "json"], {
  shell: true,
  stdout: "pipe",
}).stdout;

const jqResult = Bun.spawnSync(["jq", "-r", ".fields[0].value"], {
  shell: true,
  stdin: opResult,
  stdout: "pipe",
}).stdout;

const apiKey = jqResult.toString().trim();
console.log(apiKey);

const client = new OpenAI({
  apiKey: apiKey,
});

const votedByPeople = false;

// Type definition for game object
interface Game {
  title: string;
  genre: string;
  publisher: string;
  date: string;
}

const miniGameList = JSON.parse(fs.readFileSync("../data/Games_collection.json", "utf8"));

async function createGame(game: Game) {
  const response = await client.chat.completions.create({
    model: "o1-preview",
    messages: [{
      role: "user",
      content: `Create a mini-game as a react.js component with three.js and canvas useref: ${JSON.stringify(game)}`
    }],
  });
  return response;
}

async function main() {
  for (let i = 100; i < miniGameList.length; i++) {
    const response = await createGame(miniGameList[i]);
    
    // Create directory if it doesn't exist
    const dir = `/Users/shelbernstein/homelab/web/src/app/music_game/183_levels/level_${i + 1}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Get the actual content from the response
    const content = response.choices[0].message.content;
    if (!content) {
      console.error(`No content received for game ${i + 1}`);
      continue;
    }
    
    // Write response to file
    await Bun.write(`${dir}/page.tsx`, content);
    
    console.log(`Game ${i + 1} saved to ${dir}/page.tsx`);
  }
}

// Run the main function
main().catch(console.error);