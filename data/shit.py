import os.path
import base64
import json
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from google.auth.transport.requests import Request

# Scope: read-only Gmail access
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

def get_service():
    creds = None
    token_path = '/Users/shelbernstein/Downloads/token.json'
    credentials_path = '/home/adnan/homelab/data/credentials.json'
    
    # Load existing token
    if os.path.exists(token_path):
        creds = Credentials.from_authorized_user_file(token_path, SCOPES)
    
    # If there are no valid credentials available, request authorization
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            # Refresh expired token
            creds.refresh(Request())
        else:
            # Start new OAuth flow
            flow = InstalledAppFlow.from_client_secrets_file(credentials_path, SCOPES)
            print('Starting OAuth flow...')
            # Use port=0 to let the system choose an available port
            creds = flow.run_local_server(port=8080)
        
        # Save the credentials for next run
        with open(token_path, 'w') as token:
            token.write(creds.to_json())
    
    return build('gmail', 'v1', credentials=creds)

def fetch_emails(service, max_results=50):
    try:
        results = service.users().messages().list(userId='me', maxResults=max_results).execute()
        messages = results.get('messages', [])
        emails = []
        
        for msg in messages:
            msg_data = service.users().messages().get(userId='me', id=msg['id'], format='full').execute()
            snippet = msg_data.get('snippet', '')
            payload = msg_data.get('payload', {})
            headers = {h['name']: h['value'] for h in payload.get('headers', [])}
            
            email = {
                'id': msg['id'],
                'snippet': snippet,
                'subject': headers.get('Subject'),
                'from': headers.get('From'),
                'to': headers.get('To'),
                'date': headers.get('Date')
            }
            emails.append(email)
        
        return emails
    except Exception as error:
        print(f'An error occurred: {error}')
        return []

if __name__ == '__main__':
    service = get_service()
    emails = fetch_emails(service)
    
    with open('emails.json', 'w') as f:
        json.dump(emails, f, indent=2)
    
    print(f"Saved {len(emails)} emails to emails.json")