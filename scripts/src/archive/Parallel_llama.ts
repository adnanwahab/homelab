import { readFileSync, writeFileSync } from "fs";
// import { Ollama } from "ollama";

const fileContent = readFileSync('../web/src/pages/abstraction/index.html', 'utf8');
const chunks = fileContent.match(/[\s\S]{1,20}/g);
//const ollama = new Ollama();

let transformedContent = '';



import ollama from 'ollama'

// for (let i = 0; i < chunks.length; i++) {
async function call_llama(chunk) {
  const response = await ollama.chat({
    model: 'llama3.2',
    messages: [{ role: 'user', content: 'Change capitalization for data-attr from "data-attr"="shitass timeindex" to "data-attrib="shitAss timeIndex" in this chunk + ' + chunk }],
  })
  
  console.log(response.message.content)

  transformedContent += response.message.content
} 

// for (let i = 0; i < chunks.length; i++) {
//     const chunk = chunks[i];
//     const transformedChunk = ollama.chat(chunk, { prompt: 'Change capitalization for data-attr' });
//     transformedContent += transformedChunk;
// }

console.log(transformedContent)
//writeFileSync('../web/src/pages/abstraction/index.html', transformedContent);

for (let i = 0; i < chunks.length; i++) {
  await call_llama(chunks[i])
}
