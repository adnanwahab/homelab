// Import all route modules
import route404 from "./[...404].ts";
import api from "./api.ts";
import auto_gif from "./auto_gif.ts";
import baby_dynamicland from "./baby-dynamicland.ts";
import demo_annotator from "./demo-annotator.ts";
import deno_webgpu from "./deno-webgpu.ts";
import hardware_documentation_blog from "./hardware_documentation_blog.ts";
import install_sh from "./install.sh.ts";
import livekit_connect from "./livekit_connect.ts";
import livekit_share_tools from "./livekit_share_tools.ts";
import llama_tools from "./llama-tools.ts";
import llama_zed from "./llama_zed.ts";
import odyssey from "./odyssey.ts";
import pioneer from "./pioneer.ts";
import progress from "./progress.ts";
import share from "./share.ts";
import signup from "./signup.ts";
import lessons from "./lessons.ts";

import simulation_tools from "./simulation-tools.ts";

import view_all from "./view_all.ts";

// Add them to an object
const routes = {
    route404,
    api,
    auto_gif,
    baby_dynamicland,
    demo_annotator,
    deno_webgpu,
    hardware_documentation_blog,
    install_sh,
    livekit_connect,
    livekit_share_tools,
    llama_tools,
    llama_zed,
    odyssey,
    pioneer,
    progress,
    share,
    signup,
    simulation_tools,
    view_all,
    lessons,
};

import fs from "fs";

const ls = fs.readdirSync("./");

console.log("compile time check ----", Object.keys(routes) === ls);

// Export the object
export default routes;
