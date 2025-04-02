#!/usr/bin/env bash

# 1. ObservableHQ with Docker
docker run -d \
  -p 3333:3333 \
  --name observablehq_app \
  your-observable-image:latest

# 2. FastAPI
uvicorn main:app --port 8080 --host 0.0.0.0 &

# 3. Bun script
bun run server --port 8000 &

# 4. Vite dev
(cd simulation_editor && npm run dev -- --port 5173) &

# 5. Next.js
(cd web && npm run dev -- --port 3000) &

# 6. Jupyter
uv run jupyter lab --port=8888 --no-browser --allow-root &
