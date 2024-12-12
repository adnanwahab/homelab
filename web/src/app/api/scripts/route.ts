const scripts = [
    'resend',
    'gif_maker',
    'playwright_snapshot_https://musicgame2025.netlify.app',
]

export async function GET(request: Request) {
  const allowedOrigins = ['https://allowed-origin.com', 'https://another-origin.com'];
  const origin = request.headers.get('Origin') || '';

  let headers = {
    'Content-Type': 'application/json',
  };

  if (allowedOrigins.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }

  return Response.json({ message:scripts }, { headers });
}


export async function POST(request: Request) {
    const { script } = await request.json();
    return Response.json({ message:"hello" });
  }