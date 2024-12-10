//import { EmailTemplate } from '../../../components/EmailTemplate';
import { Resend } from 'resend';
const resendApiKey = process.env.RESEND_API_KEY;

const resend = new Resend(resendApiKey);

const from = '_@llama-tools.com';
const to = 'adnan.f.wahab@gmail.com';
const subject = 'scheduled send via obs';
const html = '<p>scheduled send via obs</p>';

// Add GET method to test if route is accessible
export async function GET() {
  const { data, error } = await sendEmail();

  if (error) {
    return Response.json({ error }, { status: 500 });
  }

  return Response.json(data);
}

export async function POST() {
  return Response.json({ message: "Post test 123" });
}

async function sendEmail() {
  console.log('Received POST request to /api/resend');
  console.log('resendApiKey exists:', !!resendApiKey); // Safe way to check if key exists


    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    return { data, error };
}
