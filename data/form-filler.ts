// fetchJobs.ts
import fetch from "node-fetch";

export async function getJobLinks(limit = 10): Promise<string[]> {
  const res = await fetch("https://hacker-news.firebaseio.com/v0/jobstories.json");
  const ids: number[] = await res.json();

  const links: string[] = [];
  for (const id of ids.slice(0, limit)) {
    const item = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    const data = await item.json();
    if (data.url) links.push(data.url);
    else links.push(`https://news.ycombinator.com/item?id=${id}`);
  }
  return links;
}

if (import.meta.main) {
  const urls = await getJobLinks();
  console.log(urls.join("\n"));
}
