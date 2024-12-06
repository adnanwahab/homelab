'use server'

import { generateText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'

export async function iterateSteps(currentSteps: string[]) {
  const prompt = `
    Here are the current steps:
    ${currentSteps.map((step, index) => `${index + 1}. ${step}`).join('\n')}

    Please iterate on these steps to improve them. Provide a new list of steps that builds upon the current ones, making them more detailed, efficient, or effective. Return only the numbered list of new steps, without any additional explanation.
  `

  const { text } = await generateText({
    model: anthropic('claude-3-sonnet-20240229'),
    prompt,
    temperature: 0.7,
    max_tokens: 500,
  })

  // Parse the response to extract only the numbered steps
  const newSteps = text
    .split('\n')
    .filter(line => /^\d+\./.test(line.trim()))
    .map(line => line.replace(/^\d+\.\s*/, '').trim())

  return newSteps
}