from twilio.rest import Client
from dotenv import load_dotenv
import os

load_dotenv()  # Load environment variables from .env file

account_sid = os.getenv('TWILIO_ACCOUNT_SID')
auth_token = os.getenv('TWILIO_AUTH_TOKEN')
messaging_service_sid = os.getenv('TWILIO_MESSAGING_SERVICE_SID')

client = Client(account_sid, auth_token)
message = client.messages.create(
    messaging_service_sid=messaging_service_sid,
    body='Ahoy 👋',
    to='+17136773669'
)
print(message.sid)
