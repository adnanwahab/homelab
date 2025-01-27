// gmailApiDownload.ts

import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

const credentials = {"web":{"client_id":"194688153568-t6hpkgkbrrip08ng5e1eh13brc388r1i.apps.googleusercontent.com","project_id":"waymo2025","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"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","redirect_uris":["https://cooperative-robotics.com","https://cgi-tools.dev","https://adnanwahab.com"],"javascript_origins":["https://cooperative-robotics.com","https://cgi-tools.dev","https://simulation-tools.app"]}}

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_PATH = path.join(__dirname, 'token.json');
const CREDENTIALS_PATH = path.join('/home/adnan/homelab/scripts/credentials.json');

// Load client secrets from a local file.
function loadCredentials() {
  const content = fs.readFileSync(CREDENTIALS_PATH, 'utf-8');
  return JSON.parse(content);
}

// Save the token to disk for later program executions
function saveToken(token: any) {
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to', TOKEN_PATH);
}

// Get and store new token after prompting for user authorization
function getAccessToken(oAuth2Client: any, callback: (auth: any) => void) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code: string) => {
    rl.close();
    oAuth2Client.getToken(code, (err: any, token: any) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      saveToken(token);
      callback(oAuth2Client);
    });
  });
}

// Authorize a client with credentials, then call the Gmail API.
function authorize(credentials: any, callback: any) {
  // Handle both web and installed application credentials
  const { client_secret, client_id, redirect_uris } = credentials.web || credentials.installed || credentials;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
    oAuth2Client.setCredentials(token);
    callback(oAuth2Client);
  } else {
    getAccessToken(oAuth2Client, callback);
  }
}

// List and download emails
function listEmails(auth: any) {
  const gmail = google.gmail({ version: 'v1', auth });
  gmail.users.messages.list(
    {
      userId: 'me',
      maxResults: 100, // Adjust as needed
    },
    (err: any, res: any) => {
      if (err) return console.log('The API returned an error: ' + err);
      const messages = res.data.messages;
      if (!messages || messages.length === 0) {
        console.log('No messages found.');
        return;
      }

      const emailData: any[] = [];

      messages.forEach((message: any) => {
        gmail.users.messages.get(
          {
            userId: 'me',
            id: message.id,
            format: 'metadata',
            metadataHeaders: ['From', 'Subject', 'Date'],
          },
          (err: any, res: any) => {
            if (err) return console.log('Error fetching message:', err);
            const headers = res.data.payload.headers;
            const email: any = {};
            headers.forEach((header: any) => {
              if (header.name === 'From') email.sender = header.value;
              if (header.name === 'Subject') email.subject = header.value;
              if (header.name === 'Date') email.date = header.value;
            });
            emailData.push(email);

            // After fetching all emails, save to JSON
            if (emailData.length === messages.length) {
              fs.writeFileSync('gmail_emails.json', JSON.stringify(emailData, null, 2));
              console.log('Emails have been saved to gmail_emails.json');
            }
          }
        );
      });
    }
  );
}

authorize(loadCredentials(), listEmails);
