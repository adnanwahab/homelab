import { Resend } from 'resend';


const resend = new Resend("re_VisebMXb_GgPww5wnbMNGUdibTYx8HtcX");
const headers = {
  'Access-Control-Allow-Origin': '*', // Be more restrictive in production
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};



export async function POST(request: Request) {


  const body = await request.json();


  const { data, error } = await resend.emails.send({
      from: 'daily_reminder_2025@michael-pollan.app',
      to: body.to,
      subject: body.subject, 
      html: body.html,
    });


    return Response.json({ data }, { headers });

}


const domains = [
  "human-advancement-institute.org",
  "llama-tools.com",
  "hashirama.blog",
  "hashirama.art",
  "roboticsuniversity.dev",
  "leafstudio.design",
  "taiyongrobotics.com",
  "michael-pollan.app",
  "hashirama.bio",
]


export async function GET(request: Request) {
  try {
    // Handle OPTIONS request (preflight)
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    const choice = Math.floor(Math.random() * domains.length);
    // Get query parameters from URL
    const url = new URL(request.url);
    const subject = url.searchParams.get('subject') || "Test"
    const html = url.searchParams.get('html') || "<p>Hello World</p>"

    // Use specific audience ID
    const { data: audienceData, error: audienceError } = await resend.audiences.get("9034f78f-59a1-413c-8691-97ba687292bd");
    
    if (audienceError) {
      return Response.json({ error: audienceError }, { status: 500, headers });
    }

    // Validate required parameters
    if (!subject || !html) {
      return Response.json(
        { error: 'Missing required parameters' },
        { status: 400, headers }
      );
    }

    const { data, error } = await resend.emails.send({
      from: `daily_reminder@${domains[choice]}`,
      to: ["mail@adnanwahab.com", "renafkaufman@gmail.com"],
      subject,
      html,
    });

    if (error) {
      return Response.json({ error }, { status: 500, headers });
    }

    return Response.json({ data }, { headers });
  } catch (error) {
    return Response.json({ error }, { status: 500, headers });
  }
}


