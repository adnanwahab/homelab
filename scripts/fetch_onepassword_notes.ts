import { env } from "bun";

const OP_TOKEN = env.OP_TOKEN;
const OP_CONNECT_HOST = env.OP_CONNECT_HOST || "http://localhost:8080";

async function fetchTaggedNotes(tags: string[]) {
  const headers = {
    'Authorization': `Bearer ${OP_TOKEN}`,
    'Content-Type': 'application/json'
  };

  // First get all items
  const response = await fetch(`${OP_CONNECT_HOST}/v1/vaults/default/items`, {
    headers
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch items: ${response.statusText}`);
  }

  const items = await response.json();

  // Filter items that are secure notes and have matching tags
  const matchingNotes = items.filter((item: any) => {
    const itemTags = item.tags || [];
    return item.category === "SECURE_NOTE" && 
           tags.some(tag => itemTags.includes(tag));
  });

  // Fetch full details for each matching note
  const noteDetails = await Promise.all(
    matchingNotes.map(async (note: any) => {
      const detailResponse = await fetch(`${OP_CONNECT_HOST}/v1/vaults/default/items/${note.id}`, {
        headers
      });
      return detailResponse.json();
    })
  );

  return noteDetails;
}

// Usage
const targetTags = ["agent_api", "creative_ai_tools", "twitch_robot"];

try {
  const notes = await fetchTaggedNotes(targetTags);
  console.log("Found notes:", notes);
} catch (error) {
  console.error("Error fetching notes:", error);
}


