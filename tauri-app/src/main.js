const { invoke } = window.__TAURI__.core;

let greetInputEl;
let greetMsgEl;

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  greetMsgEl.textContent = await invoke("greet", { name: greetInputEl.value });
}

window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");
  
  // Add iframe dynamically
  const iframeContainer = document.createElement('div');
  iframeContainer.innerHTML = `
    <iframe 
      src="https://www.dynabot.dev/articles/dynamicland/game" 
      title="Dynabot"
      width="800"
      height="600"
      sandbox="allow-scripts allow-same-origin"
    ></iframe>
  `;
  document.body.appendChild(iframeContainer);

  document.querySelector("#greet-form").addEventListener("submit", (e) => {
    e.preventDefault();
    greet();
  });
});
