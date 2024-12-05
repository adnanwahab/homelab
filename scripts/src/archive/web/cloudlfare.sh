#!/bin/bash

# User-defined variables
CF_API_TOKEN="your-cloudflare-api-token"
ACCOUNT_ID="your-cloudflare-account-id"
ZONE_NAME="example.com"
PROJECT_NAME="your-project-name"
CUSTOM_DOMAIN="www.example.com"

# Add domain to Cloudflare (if not already added)
echo "Adding domain to Cloudflare..."
curl -X POST "https://api.cloudflare.com/client/v4/zones" \
     -H "Authorization: Bearer $CF_API_TOKEN" \
     -H "Content-Type: application/json" \
     --data '{"name":"'"$ZONE_NAME"'","jump_start":true}'

# Get Zone ID
echo "Fetching Zone ID..."
ZONE_ID=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones?name=$ZONE_NAME" \
     -H "Authorization: Bearer $CF_API_TOKEN" \
     -H "Content-Type: application/json" | jq -r '.result[0].id')

# Update DNS records
echo "Updating DNS records..."
curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
     -H "Authorization: Bearer $CF_API_TOKEN" \
     -H "Content-Type: application/json" \
     --data '{
       "type":"CNAME",
       "name":"'"$CUSTOM_DOMAIN"'",
       "content":"'"$PROJECT_NAME"'.pages.dev",
       "ttl":3600,
       "proxied":true
     }'

# Add custom domain to Pages project
echo "Adding custom domain to Pages project..."
curl -X POST "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/$PROJECT_NAME/domains" \
     -H "Authorization: Bearer $CF_API_TOKEN" \
     -H "Content-Type: application/json" \
     --data '{"name":"'"$CUSTOM_DOMAIN"'"}'

echo "Setup complete. Please wait for DNS propagation."
