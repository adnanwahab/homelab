function _1(md){return(
md`# 183 games / llama tools / periodic table elements`
)}

function _hi()
{
  return "shit";
}


function _4(md){return(
md`# Chapter 11 Agents
Imagine yourself as a manager at a robotics company.
You can have up to 20 one-on-ones.

This is because short-term memory is about 7 items.
And long-term memory has about 20 slots.

very-long-term-context = 150-250 slots

150 elements = kerpow


jerff.jp
three.js - organize atoms`
)}

function _listView(){return(
(collection) => {
  return null;
}
)}

function _Livekit_Fly_io()
{
  //business model = Give as much free shit away to 1000 people as possible.
  //sell for $5 --- 700 / 5 = 140 === 140 to buy a used GPU and store in https://x.com/oxidecomputer
  return "1000 users concurrent" === 25000;
}


function _deno_webgpu()
{
}


function _jupyter_notebooks()
{
}


function _threejs_next_repl()
{
}


function _observable_playwright_editor_scheduler()
{
}


function _notion_api()
{
}


function _favorite_tools(Livekit_Fly_io,deno_webgpu,jupyter_notebooks,threejs_next_repl,observable_playwright_editor_scheduler,notion_api){return(
[
  Livekit_Fly_io,
  deno_webgpu,
  jupyter_notebooks,
  threejs_next_repl,
  observable_playwright_editor_scheduler,
  notion_api
]
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("hi")).define("hi", _hi);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("listView")).define("listView", _listView);
  main.variable(observer("Livekit_Fly_io")).define("Livekit_Fly_io", _Livekit_Fly_io);
  main.variable(observer("deno_webgpu")).define("deno_webgpu", _deno_webgpu);
  main.variable(observer("jupyter_notebooks")).define("jupyter_notebooks", _jupyter_notebooks);
  main.variable(observer("threejs_next_repl")).define("threejs_next_repl", _threejs_next_repl);
  main.variable(observer("observable_playwright_editor_scheduler")).define("observable_playwright_editor_scheduler", _observable_playwright_editor_scheduler);
  main.variable(observer("notion_api")).define("notion_api", _notion_api);
  main.variable(observer("favorite_tools")).define("favorite_tools", ["Livekit_Fly_io","deno_webgpu","jupyter_notebooks","threejs_next_repl","observable_playwright_editor_scheduler","notion_api"], _favorite_tools);
  return main;
}
