#!/bin/bash
# LiveKit Steam Streaming Script

# --- Configuration Variables ---
# LiveKit server details
LIVEKIT_URL="${LIVEKIT_URL:-wss://your-livekit-instance.example.com}"
LIVEKIT_API_KEY="${LIVEKIT_API_KEY:-your-api-key}"
LIVEKIT_API_SECRET="${LIVEKIT_API_SECRET:-your-api-secret}"
ROOM_NAME="${ROOM_NAME:-steam-stream}"
IDENTITY="${IDENTITY:-steam-broadcaster}"

# Steam launch options
STEAM_APP_ID="${STEAM_APP_ID:-}"  # Set this to your game's App ID
STEAM_USERNAME="${STEAM_USERNAME:-}"
STEAM_PASSWORD="${STEAM_PASSWORD:-}"

# FFmpeg capture settings
DISPLAY="${DISPLAY:-:0}"
AUDIO_DEVICE="${AUDIO_DEVICE:-default}"
FRAMERATE="${FRAMERATE:-30}"
RESOLUTION="${RESOLUTION:-1920x1080}"
VIDEO_BITRATE="${VIDEO_BITRATE:-3000k}"
AUDIO_BITRATE="${AUDIO_BITRATE:-128k}"

# --- Dependencies Check ---
check_dependencies() {
  command -v livekit-cli >/dev/null 2>&1 || { echo "LiveKit CLI not found. Please install it."; exit 1; }
  command -v ffmpeg >/dev/null 2>&1 || { echo "FFmpeg not found. Please install it."; exit 1; }
  command -v steam >/dev/null 2>&1 || { echo "Steam not found. Please install it."; exit 1; }
  command -v xdpyinfo >/dev/null 2>&1 || { echo "xdpyinfo not found. Please install x11-utils."; exit 1; }
}

# --- LiveKit Token Generation ---
generate_token() {
  echo "Generating LiveKit token..."
  TOKEN=$(livekit-cli create-join-token \
    --api-key="$LIVEKIT_API_KEY" \
    --api-secret="$LIVEKIT_API_SECRET" \
    --room="$ROOM_NAME" \
    --identity="$IDENTITY" \
    --valid-for=24h)
  
  if [ -z "$TOKEN" ]; then
    echo "Failed to generate LiveKit token. Check your API credentials."
    exit 1
  fi
  
  echo "Token successfully generated."
}

# --- Steam Launch ---
start_steam() {
  echo "Starting Steam and launching app ${STEAM_APP_ID}..."
  
  if [ -n "$STEAM_USERNAME" ] && [ -n "$STEAM_PASSWORD" ]; then
    steam -login "$STEAM_USERNAME" "$STEAM_PASSWORD" -applaunch "$STEAM_APP_ID" &
  else
    steam -applaunch "$STEAM_APP_ID" &
  fi
  
  STEAM_PID=$!
  echo "Steam started with PID: $STEAM_PID"
  
  # Wait for Steam to initialize
  echo "Waiting for Steam to initialize..."
  sleep 10
}

# --- Stream to LiveKit ---
start_streaming() {
  echo "Starting FFmpeg capture and streaming to LiveKit..."
  
  ffmpeg -f x11grab -framerate "$FRAMERATE" -video_size "$RESOLUTION" -i "$DISPLAY" \
    -f pulse -i "$AUDIO_DEVICE" \
    -c:v libx264 -preset ultrafast -tune zerolatency -b:v "$VIDEO_BITRATE" -pix_fmt yuv420p \
    -c:a aac -b:a "$AUDIO_BITRATE" -ar 44100 \
    -f rtp_mpegts rtp://127.0.0.1:5000 &
    
  FFMPEG_PID=$!
  echo "FFmpeg started with PID: $FFMPEG_PID"
  
  # Start the LiveKit WebRTC broadcaster
  echo "Connecting to LiveKit..."
  livekit-cli join-room \
    --url="$LIVEKIT_URL" \
    --token="$TOKEN" \
    --publish="video=rtp://127.0.0.1:5000" &
    
  LIVEKIT_PID=$!
  echo "LiveKit broadcaster started with PID: $LIVEKIT_PID"
}

# --- Cleanup Function ---
cleanup() {
  echo "Stopping stream and cleaning up..."
  
  # Kill processes
  [ -n "$FFMPEG_PID" ] && kill $FFMPEG_PID
  [ -n "$LIVEKIT_PID" ] && kill $LIVEKIT_PID
  [ -n "$STEAM_PID" ] && kill $STEAM_PID
  
  echo "Cleanup complete."
  exit 0
}

# Set up cleanup on script exit
trap cleanup EXIT INT TERM

# --- Main Script ---
main() {
  echo "===== LiveKit Steam Streaming Script ====="
  
  # Check for required dependencies
  check_dependencies
  
  # Validate required environment variables
  if [ -z "$STEAM_APP_ID" ]; then
    echo "Error: STEAM_APP_ID is required. Please set it before running the script."
    exit 1
  fi
  
  # Generate LiveKit token
  generate_token
  
  # Start Steam and launch the game
  start_steam
  
  # Start streaming to LiveKit
  start_streaming
  
  echo "Streaming active. Press Ctrl+C to stop."
  
  # Keep the script running
  while true; do
    sleep 1
  done
}

# Run the main function
main