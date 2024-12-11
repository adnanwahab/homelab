
const ws_url = "wss://omnissiah-university-kmuz0plz.livekit.cloud"
const api_key = "APItSbwXvSjh4cf"
const api_secret = "118jYtOPXJUYVeH7ZMSlQSoMKzPNve6sATZ149DfmfYC"



import { WebhookReceiver } from "livekit-server-sdk";

//const host = "localhost";
const port = 3333;

const secret = `118jYtOPXJUYVeH7ZMSlQSoMKzPNve6sATZ149DfmfYC`;
const key = `APItSbwXvSjh4cf`;

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY || key,
  process.env.LIVEKIT_API_SECRET || secret,
);

import Bun from "bun";

Bun.serve({
  //hostname: host,
  port: port,
  async fetch(req) {
    const url = new URL(req.url);
    console.log("hii");

    if (url.pathname === "/") return new Response("Home page!");

    if (url.pathname === "/webhook") {
      console.log(url);
      const event = await receiver.receive(req.body, req.get("Authorization"));
      console.log(event);
      return new Response("Home page!");
    }

    //return req.text().then((data) => {
    // const authHeader = req.headers.get("authorization");
    // const event = receiver.receive(data, authHeader);

    // console.log("received webhook event", event);

    // return new Response(null, { status: 200 });
    //});
  },
});

//console.log(`Webhook example running on http://${host}:${port}`);



function send_email () {
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

}