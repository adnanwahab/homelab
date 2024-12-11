#!/usr/bin/env bash
set -e

# CONFIGURE THESE VARIABLES AS NEEDED
DOMAIN="jupyter.hashirama.blog"
JUPYTER_PORT=8888
UV_PORT=80

# Update system and install prerequisites
echo "Updating system and installing prerequisites..."
sudo apt-get update -y
sudo apt-get install -y python3 python3-pip nodejs npm

# Install JupyterLab
echo "Installing JupyterLab..."
pip3 install --upgrade pip
pip3 install jupyterlab

# Install uv globally
echo "Installing uv..."
sudo npm install -g @astral/uv

# Kill any previous instances that might be running
echo "Killing any previous Jupyter or uv instances..."
pkill -f "jupyter lab" || true
pkill -f "uv proxy" || true

# Run JupyterLab in the background without a token on port 8888
echo "Starting JupyterLab on port ${JUPYTER_PORT}..."
nohup jupyter lab --ip=0.0.0.0 --port=${JUPYTER_PORT} --no-browser --NotebookApp.token='' > jupyter.log 2>&1 &

# Wait a bit to ensure Jupyter starts up
sleep 5

# Run uv as a reverse proxy on port 80, routing DOMAIN to JUPYTER_PORT
echo "Starting uv proxy ${DOMAIN} -> localhost:${JUPYTER_PORT}"
nohup uv proxy --port ${UV_PORT} ${DOMAIN}=http://localhost:${JUPYTER_PORT} > uv.log 2>&1 &

echo "Setup complete! If your DNS is pointed correctly, http://$DOMAIN should now serve your JupyterLab instance."
