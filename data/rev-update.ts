import fs from "fs";
import path from "path";
import { authenticate } from "@google-cloud/local-auth";
import { google } from "googleapis";

// Scope: read-only Gmail access
const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];

// File paths
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

async function loadSavedCredentialsIfExist() {
    try {
        const content = fs.readFileSync(TOKEN_PATH, "utf8");
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}
async function saveCredentials(client) {
    const content = fs.readFileSync(CREDENTIALS_PATH, "utf8");
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: "authorized_user",
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    fs.writeFileSync(TOKEN_PATH, payload);
}

async function getService() {
    let client = await loadSavedCredentialsIfExist();
    if (!client) {
        client = await authenticate({
            scopes: SCOPES,
            keyfilePath: CREDENTIALS_PATH,
        });
        if (client && client.credentials) {
            await saveCredentials(client);
        }
    }
    return google.gmail({ version: "v1", auth: client });
}

async function fetchEmails(service, maxResults = 50) {
    try {
        // Use the explicit email address for userId
        const userId = "eggnogwaberstein@gmail.com";
        const res = await service.users.messages.list({
            userId,
            maxResults: maxResults,
        });

        const messages = res.data.messages || [];
        const emails = [];

        for (const msg of messages) {
            const msgData = await service.users.messages.get({
                userId,
                id: msg.id,
                format: "full",
            });

            const snippet = msgData.data.snippet || "";
            const headers = {};
            (msgData.data.payload.headers || []).forEach((h) => {
                headers[h.name] = h.value;
            });

            emails.push({
                id: msg.id,
                snippet,
                subject: headers["Subject"],
                from: headers["From"],
                to: headers["To"],
                date: headers["Date"],
            });
        }

        return emails;
    } catch (err) {
        console.error("An error occurred:", err);
        return [];
    }
}

(async () => {
    console.log("Fetching emails for eggnogwaberstein@gmail.com...");
    const service = await getService();
    const emails = await fetchEmails(service);

    fs.writeFileSync("emails.json", JSON.stringify(emails, null, 2));
    console.log(`Saved ${emails.length} emails to emails.json`);
})();
// server.js
import { serve } from "bun";

const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Button Example</title>
</head>
<body>
    <button onclick="fetchData()">Click Me</button>
    <div id="response"></div>

    <script>
        async function fetchData() {
            const response = await fetch('/button');
            const data = await response.text();
            document.getElementById('response').innerHTML = data;
        }
    </script>
</body>
</html>
`;


function fetchData() {

}


serve({
    port: 8000,
    fetch(req) {
        const url = new URL(req.url);

        if (url.pathname === "/button") {
            return new Response("Button was clicked!");
        }

        return new Response(html, {
            headers: {
                "Content-Type": "text/html",
            },
        });
    },
});

console.log("🚀 Bun server running at http://localhost:8000");
