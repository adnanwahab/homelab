

const scripts = [
    'resend',
    'gif_maker',
    'playwright_snapshot_https://musicgame2025.netlify.app',
]

export async function GET() {
  return Response.json({ message:"hello" });
}


export async function POST(request: Request) {
    const { script } = await request.json();
    return Response.json({ message:"hello" });
  }