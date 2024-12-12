function MagicIframe() {
  return <iframe 
  className="position-absolute top-0 right-0 border-1 border-green-500"
  src="/tools/livekit/screenshare" width="500px" height="500px"></iframe>
}

export default function Livekit() {
  return (
    <div>
      <h1>Livekit</h1>
      <h2>complete</h2>
      <div><a href="/tools/livekit/publish_webcam">publish_webcam</a></div>
      <div><a href="/tools/livekit/screenshare">screenshare</a></div>
     {/* <MagicIframe /> */}

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
