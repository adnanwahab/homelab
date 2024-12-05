export async function GET(request: Request) {
  return "shit in my asshole";
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return new Response("URL parameter is required", { status: 400 });
  }

  try {
    const response = await fetch(targetUrl);

    if (!response.ok) {
      return new Response("Failed to fetch the URL", { status: 500 });
    }

    const text = await response.text();

    return new Response(text, {
      status: 200,
      headers: {
        "Content-Type": response.headers.get("content-type") || "text/plain",
      },
    });
  } catch (error) {
    return new Response("Error fetching the URL", { status: 500 });
  }
}
