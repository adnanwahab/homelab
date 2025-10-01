let key = `re_27zUQDD8_MUpAeYo9KxyusLvUHnQChwXf`;

import { Resend } from "resend";
const resend = new Resend(key);

const response = await resend.emails.send({
  from: "adnan@llama-tools.com",
  to: "eggnog.waberstein@gmail.com",
  subject: "hello world",
  html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
});

console.log(response);