export default async function handler(req, res) {
  res.status(200).json({ message: 'Hello, world!' });
}


// import { Configuration, OpenAIApi } from 'openai';

// export default async function handler(req, res) {
//   // Only allow POST requests
//   if (req.method !== 'POST') {
//     res.status(405).json({ error: 'Only POST requests allowed' });
//     return;
//   }

//   const { prompt } = req.body;

//   // Check if the prompt is provided
//   if (!prompt) {
//     res.status(400).json({ error: 'Prompt is required' });
//     return;
//   }

//   // Set up OpenAI API configuration
//   const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY, // Make sure to set your OpenAI API key in your environment variables
//   });

//   const openai = new OpenAIApi(configuration);

//   try {
//     // Generate the code using OpenAI's API
//     const response = await openai.createCompletion({
//       model: 'o1-preview', // Use the appropriate model available to you
//       prompt: prompt,
//       //max_tokens: 2000, // Adjust as needed, keeping in mind the token limit
//       //temperature: 0.7, // Creativity level
//       //n: 1,
//       //stop: null,
//     });

//     const generatedCode = response.data.choices[0].text;

//     // Return the generated code
//     res.status(200).json({ code: generatedCode });
//   } catch (error) {
//     console.error('Error generating code:', error);
//     res.status(500).json({ error: 'Error generating code' });
//   }
// }
