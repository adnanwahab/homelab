import course_content from '../course_content/observablehq.config.js'

course_content.pages.forEach((page) => {
  page.pages.forEach((subpage) => {
    




    gen_shit(subpage.path)
  })
})
import fs from "fs";
import { OpenAI } from "openai";


function gen_shit(path) {
    console.log('Generating ' + path)
const api_key = process.env.OPENAI_API_KEY 

  const client = new OpenAI({
    apiKey: api_key,
  });

  const prompt = `
  
  
  Create a markdown file with an Observable Framework demo titled "${path}". The content should include an interactive visualization demonstrating the concepts related to "${path}". Use Three.js,  D3.js or Observable Plot for the visualizations.
  

Create an interactive visual explanation in the style of redblobgames.com or Bret Victor's explorable explanations.

Input text: ${text}
Number of related images: ${len(images)}

Please generate JavaScript code that creates an interactive visualization with these requirements:
1. Use D3.js or Observable Plot for dynamic, interactive visualizations
2. Include clear, step-by-step explanations that reveal concepts gradually
3. Add interactive elements that let users:
   - Manipulate parameters
   - See immediate visual feedback
   - Explore edge cases
4. Break down complex concepts into smaller, digestible pieces
5. Use concrete, visual examples from the input text
6. Include smooth transitions and animations to show relationships

Here are captions of the images: {', '.join(captions)}

  Also add 5 applicable research papers and any blogs to a "references" section.



  `;

  

  client.chat.completions.create({
    model: 'o1-mini',
    messages: [
      { role: 'user', content: prompt },
    ],
  }).then(response => {
    const markdownContent = response.choices[0].message.content;
    const outputPath = `../course_content/src/${path}.md`;
    fs.appendFileSync(outputPath, markdownContent);
    console.log('Generated ' + outputPath)
  }).catch(error => {
    console.error('Error generating markdown:', error);
  });
}