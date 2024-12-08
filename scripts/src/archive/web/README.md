# Web Ui Readme 


To install dependencies:
```sh
bun install
```

To run:
```sh
bun run dev
```

open http://localhost:3000




bun + htmx 

{
  "scripts": {
    "style": "npx tailwindcss -i ./assets/index.css -o ./assets/output.css --watch",
    "format": "npx prettier observable_templates.html --write",
    "format-js": "standard 'views/*/*.{js,jsx}' --fix",
    "format-js-gpt": "python paralel_LLM.py",
    "beautify": "bunx js-beautify static/3_3_journey/https:/threejs-journey.com/bundles/public/HeroExperience-367a3eca.js > static/3_3_journey/https:/threejs-journey.com/bundles/public/HeroExperience-367a3eca.js-2.js",
    "cog": "bun run js/cognition_engine_parser.js",
    "dev": "bun run vite",
    "build": "bun run vite build",
    "pprof": "go tool trace trace.out",
    "hardware_helper": "bun run js/hardware/hardware-company-helper.js",
    "tailscale_server": "sudo tailscale serve 3000",
    "download_notebooks": "python infra/scripts/download_notebooks.py",
    "flow_helper": "bun run js/helpers/flow-helper.tsx",
    "course_gen": "bash infra/scripts/course_gen.sh",
    "ffmpeg_frames": "ffmpeg -i input_video.mp4 -vf \"fps=1\" output_frame_%04d.png",
    "tmp_build": "vite build && wrangler pages deploy dist/",
    "course": "bash infra/scripts/course_gen.sh",
    "obs": "cd course_content && bun run dev",
    "docs:dev": "vitepress dev",
    "docs:build": "vitepress build",
    "docs:preview": "vitepress preview",
    "auto-correct-last-command": "bun run js/helpers/auto_correct_last_command.ts",
    "refactor": "bun run js/helpers/Rich_hickey_helper_simple_made_easy_refactor.ts",
    "proxy_server": "deno run --access-all js/proxy_server.ts",
    "ssr": "bun run --hot js/bun_main_server.tsx",
    "tdd": "web-ui/js/helpers/Kent_Beck_robusteness.js",
    "main": "bun run --main js/bun_main_server.tsx",
    "render_dist": "bun run my-app/src/utils.ts render_dist"
  },
  "devDependencies": {
    "@egoist/tailwindcss-icons": "^1.7.4",
    "@iconify-json/mdi": "^1.1.66",
    "@tailwindcss/forms": "^0.5.9",
    "@vitejs/plugin-react": "^4.3.2",
    "@vue/compiler-sfc": "^3.5.12",
    "daisyui": "4.6.1",
    "eslint-config-prettier": "^9.1.0",
    "postcss": "^8.4.47",
    "prettier": "^3.3.3",
    "standard": "^17.1.2",
    "tailwindcss": "^3.4.13",
    "tailwindcss-3d": "^1.0.7",
    "vite": "^5.4.8",
    "vitepress": "^1.4.1",
    "@types/bun": "latest"

  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.29.0",
    "@ffmpeg-installer/ffmpeg": "^1.1.0",
    "@headlessui/react": "^2.1.10",
    "@heroicons/react": "^2.1.4",
    "@livekit/rtc-node": "latest",
    "@observablehq/runtime": "5",
    "@octokit/rest": "^21.0.2",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "autoprefixer": "^10.4.20",
    "clsx": "^2.1.1",
    "d3": "^7.9.0",
    "dotenv": "^16.4.5",
    "express": "^4.21.1",
    "ffmpeg-static": "^5.2.0",
    "fluent-ffmpeg": "^2.1.3",
    "gmath": "^0.0.6",
    "hono": "^4.6.5",
    "http-proxy-middleware": "^3.0.3",
    "livekit-client": "^2.5.9",
    "livekit-server-sdk": "^2.7.0",
    "marked": "^14.1.3",
    "octokit": "^4.0.2",
    "ollama": "^0.5.9",
    "openai": "^4.67.3",
    "playwright": "^1.48.1",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-router-dom": "^6.27.0",
    "replicate": "^1.0.0",
    "sqlite3": "^5.1.7",
    "three": "^0.169.0",
    "turndown": "^7.2.0",
    "underscore": "^1.13.7"
  }
}