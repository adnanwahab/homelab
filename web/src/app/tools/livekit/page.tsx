'use client'
import MagicIframe from '@/components/MagicIframe';
import { useState } from 'react';
export default function Livekit() {
  const [isMouseOver, setIsMouseOver] = useState('publish_webcam');
  const handleMouseOver = (tool: string) => {
    setIsMouseOver(tool);
  }
  return (
    <div>
      <h1>Livekit</h1>
      <h2>complete</h2>
      <div >
      <div onMouseOver={() => handleMouseOver('publish_webcam') }> <a href="/tools/livekit/publish_webcam">publish_webcam</a></div>
      <div onMouseOver={() => handleMouseOver('screenshare') }><a href="/tools/livekit/screenshare">screenshare</a></div>
      <div onMouseOver={() => handleMouseOver('view_all') }><a href="/tools/livekit/view_all">viewall</a></div>
      </div>
    <h1>MagicIframe = {isMouseOver}</h1>
     <MagicIframe src={`/tools/livekit/${isMouseOver}`}/>

      <br></br>
      <h2>incomplete</h2>
      <br></br>

      <div><a href="/tools/livekit/2i">Zed-2i</a></div>
      <div><a href="/tools/livekit/2i">react-native</a></div>


      <div><a href="/tools/livekit/screenshare">screenshare</a></div>


      <div><a href="/tools/livekit/subscriber">subscriber</a></div>

      <div>1. replay_analyzer instead of rewind.ai / optimizley</div>
      <div>2. react-native</div>
      <div>3. Stereolabs 2i RTSP</div>
      <div>4. Environmental Cameras - Wheres my keys </div>

      <div>view list of rooms </div>
      <div>view list of people in room </div>



      <h3>storage</h3>
      
      <div>list-view of all egress data </div>
      <div>detail-view of single egress data </div>
    </div>
  );
}
