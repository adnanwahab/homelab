
//import { EmailTemplate } from '../../../components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const from = '_@llama-tools.com';
const to = 'adnan.f.wahab@gmail.com';
const subject = 'scheduled send via obs';
const html = '<p>scheduled send via obs</p>';

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: from,
      to: to,
      subject: subject,
      //react: EmailTemplate({ firstName: 'John' }),
      html: html,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
