#!/usr/bin/env bash

# Exit on errors
set -e

# Change these to match your setup:
OP_ITEM_NAME="My LiveKit Credentials"
PROJECT_ENV="production"  # or 'preview'/'development' as needed

# Retrieve secrets from 1Password
LIVEKIT_API_KEY=$(op item get "$OP_ITEM_NAME" --field LIVEKIT_API_KEY)
LIVEKIT_API_SECRET=$(op item get "$OP_ITEM_NAME" --field LIVEKIT_API_SECRET)
LIVEKIT_HOST=$(op item get "$OP_ITEM_NAME" --field LIVEKIT_HOST)

# Set environment variables in Vercel
# vercel env add <name> <environment>
# vercel env add prompts for the value via stdin, so we echo the value and pipe it in.

echo "$LIVEKIT_API_KEY" | vercel env add LIVEKIT_API_KEY $PROJECT_ENV
echo "$LIVEKIT_API_SECRET" | vercel env add LIVEKIT_API_SECRET $PROJECT_ENV
echo "$LIVEKIT_HOST" | vercel env add LIVEKIT_HOST $PROJECT_ENV

echo "Environment variables have been set in Vercel."