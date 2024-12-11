import { $ } from 'bun'


const result = await $`gst-launch-1.0 \
    zedsrc stream-type=2 ! queue ! \
    zeddemux is-depth=false name=demux \
    demux.src_left ! queue ! autovideoconvert ! fpsdisplaysink \
    demux.src_aux ! queue ! autovideoconvert ! fpsdisplaysink`


    
//const LIVEKIT_PUBLISH_TOKEN= await $`lk --api-key ${LIVEKIT_API_KEY} --api-secret ${LIVEKIT_API_SECRET} --identity ${LIVEKIT_IDENTITY} --valid-for 1000000`

const LIVEKIT_PUBLISH_TOKEN= await $`lk token create --identity shit --room zed --valid-for 1000000 --grant '{"create": true}'`


const start_livekit_publisher = await $`gstreamer-publisher --token ${LIVEKIT_PUBLISH_TOKEN} \
    -- \
    videotestsrc is-live=true ! \
        video/x-raw,width=1280,height=720 ! \
        clockoverlay ! \
        videoconvert ! \
        x264enc tune=zerolatency key-int-max=60 bitrate=2000 \
    audiotestsrc is-live=true ! \
        audioresample ! \
        audioconvert ! \
        opusenc bitrate=64000`




//egress 

//     const start_livekit_publisher = await $`gstreamer-publisher --token ${LIVEKIT_PUBLISH_TOKEN} \
//   -- \
//     filesrc location="/path/to/file" ! \
//     decodebin3 name=decoder \
//     decoder. ! queue ! \
//         videoconvert ! \
//         videoscale ! \
//         video/x-raw,width=1280,height=720 ! \
//         vp9enc deadline=1 cpu-used=-6 row-mt=1 tile-columns=3 tile-rows=1 target-bitrate=2000000 keyframe-max-dist=60 \
//     decoder. ! queue ! \
//         audioconvert ! \
//         audioresample ! \
//         opusenc bitrate=64000`



///bun run scripts/docker-run.js
//shfs as docker container
import { spawn } from "bun";
import os from "os";
// Function to run the ZED SDK container
async function runZED() {
  const result = await spawn([
    "docker", "run", "-it", "--rm", "--runtime", "nvidia",
    "--gpus", "all",
    "-v", "/dev/video0:/dev/video0",
    "stereolabs/zed:latest"
  ]);

  console.log(result.stdout)
}

//Function to run the Segment Anything container
async function runSegmentAnything() {
  const result = await spawn([
    "docker", "run", "-it", "--rm", "--runtime", "nvidia",
    "--gpus", "all",
    "-v", `${homeDirectory}/homelab/data/images:/data`,
    "-v", `${homeDirectory}/homelab/data/masks:/output`,
    "segment-anything"
  ]);

  result.stdout?.pipe(process.stdout);
  result.stderr?.pipe(process.stderr);
}

// Example: Run both containers
runZED();
// runSegmentAnything();

const homeDirectory = os.homedir();
console.log(`Home directory: ${homeDirectory}`);




