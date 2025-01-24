import { expect, test } from "bun:test";

test("2 + 2", () => {
  expect(2 + 2).toBe(4);
});


// test("Anthropic Claude API client can be imported", async () => {
//     const { Claude } = await import('@anthropic-ai/sdk');
//     expect(Claude).toBeDefined();
    
//     // Create client instance (without making actual API calls)
//     const client = new Claude({ apiKey: 'dummy-key' });
//     expect(client).toBeInstanceOf(Claude);
//   });

console.log('process.env', process.env);