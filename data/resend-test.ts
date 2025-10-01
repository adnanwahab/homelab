import http from "http";
import fs from "fs";
import path from "path";
import { parse } from "url";

const PORT = 3000;

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Email Digest</title>
  </head>
  <body>
    <h1>Email Digest</h1>
    <form method="POST" action="/refresh">
      <button type="submit">Refresh Digest</button>
    </form>
    <div id="digest"></div>
  </body>
</html>
`;

function renderDigest(emails) {
  if (!Array.isArray(emails) || emails.length === 0) {
    return "<p>No emails found.</p>";
  }
  return `
    <table border="1" cellpadding="5" cellspacing="0">
      <thead>
        <tr>
          <th>From</th>
          <th>To</th>
          <th>Subject</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        ${emails
          .map(
            (email) => `
          <tr>
            <td>${email.from || ""}</td>
            <td>${email.to || ""}</td>
            <td>${email.subject || ""}</td>
            <td>${email.date || ""}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function getEmailsJson() {
  const emailsPath = path.join(process.cwd(), "emails.json");
  if (!fs.existsSync(emailsPath)) return [];
  try {
    const data = fs.readFileSync(emailsPath, "utf8");
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

const server = http.createServer((req, res) => {
  const url = parse(req.url, true);

  if (req.method === "GET" && url.pathname === "/") {
    const emails = getEmailsJson();
    const digestHtml = renderDigest(emails);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(
      html.replace(
        '<div id="digest"></div>',
        `<h2>Digest:</h2>${digestHtml}`
      )
    );
  } else if (req.method === "POST" && url.pathname === "/refresh") {
    // Here you could trigger a refresh of emails.json if needed
    // For now, just reload and render
    const emails = getEmailsJson();
    const digestHtml = renderDigest(emails);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(
      html.replace(
        '<div id="digest"></div>',
        `<h2>Digest:</h2>${digestHtml}`
      )
    );
  } else if (req.method === "GET" && url.pathname === "/emails.json") {
    // Serve the raw emails.json file
    const emailsPath = path.join(process.cwd(), "emails.json");
    if (fs.existsSync(emailsPath)) {
      res.writeHead(200, { "Content-Type": "application/json" });
      fs.createReadStream(emailsPath).pipe(res);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "emails.json not found" }));
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
