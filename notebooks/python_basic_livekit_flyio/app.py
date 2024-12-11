from flask import Flask, jsonify
from livekit import RoomServiceClient, AccessToken
import os

app = Flask(__name__)

# These environment variables should be set by you (e.g., via fly secrets)
LIVEKIT_API_KEY = os.environ.get("LIVEKIT_API_KEY")
LIVEKIT_API_SECRET = os.environ.get("LIVEKIT_API_SECRET")
LIVEKIT_HOST = os.environ.get("LIVEKIT_HOST", "https://your-livekit-server:7880")

# Initialize the LiveKit RoomServiceClient
room_service = RoomServiceClient(LIVEKIT_HOST, LIVEKIT_API_KEY, LIVEKIT_API_SECRET)

@app.route("/create_room", methods=["POST"])
def create_room():
    # Example endpoint to create a new room using LiveKit
    new_room = room_service.create_room(name="my_new_room")
    return jsonify({"room_name": new_room.name})

@app.route("/join_token", methods=["GET"])
def join_token():
    # Generate a participant token to join the room
    # AccessToken and Grant classes from LiveKit SDK allow token creation
    room_name = "my_new_room"
    identity = "participant1"
    at = AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, identity=identity)
    at.add_grant(
        room_join=True,
        room=room_name,
    )
    token = at.to_jwt()
    return jsonify({"token": token})

if __name__ == "__main__":
    # Run in development mode
    app.run(host="0.0.0.0", port=8080)