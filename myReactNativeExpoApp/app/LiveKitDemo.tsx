

import {
  StyleSheet,
  View,
  FlatList,
  ListRenderItem,
  Text
} from 'react-native';

// import {
//   StyleSheet,

//   FlatList,
//   ListRenderItem,
// } from 'react-native';
// import { useEffect } from 'react';
// import {
//   AudioSession,
//   LiveKitRoom,
//   useTracks,
//   TrackReferenceOrPlaceholder,
//   VideoTrack,
//   isTrackReference,
//   registerGlobals,
//   View,
//   Text
// } from '@livekit/react-native';
// import { Track } from 'livekit-client';

// const wsURL = "wss://omnissiah-university-kmuz0plz.livekit.cloud"


// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzM4MTU0NzUsImlzcyI6IkFQSXRTYndYdlNqaDRjZiIsIm5hbWUiOiJhZG5hbiIsIm5iZiI6MTczMzgxNTE3NSwic3ViIjoiYWRuYW4iLCJ2aWRlbyI6eyJjYW5VcGRhdGVPd25NZXRhZGF0YSI6dHJ1ZSwicm9vbSI6InNoaXQiLCJyb29tQWRtaW4iOnRydWUsInJvb21DcmVhdGUiOnRydWUsInJvb21Kb2luIjp0cnVlLCJyb29tTGlzdCI6dHJ1ZSwicm9vbVJlY29yZCI6dHJ1ZX19.lpIOPpgUVPz41Q-PGYsHKNfHuCHLy0yAwUo4tIAo-0Y"


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'stretch',
//     justifyContent: 'center',
//   },
//   participantView: {
//     height: 300,
//   },
// });


// function LiveKitDemo() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Adjust your settings here.</Text>
//     </View>
//   );
// }



// function LiveKit_Demo() {
//   useEffect(() => {
//     let start = async () => {
//       await AudioSession.startAudioSession();
//     };

//     start();
//     return () => {
//       AudioSession.stopAudioSession();
//     };
//   }, []);

//   return (
//     <View
//     style={{
//       flex: 1,
//       justifyContent: "center",
//       alignItems: "center",
//     }}
//   >
 
//     <LiveKitRoom
//       serverUrl={wsURL}
//       token={token}
//       connect={true}
//       options={{
//         // Use screen pixel density to handle screens with differing densities.
//         adaptiveStream: { pixelDensity: 'screen' },
//       }}
//       audio={true}
//       video={true}
//     >
//       <RoomView />
//     </LiveKitRoom>
//     <Text>Add Livekit</Text>
//     <Text>Add Navigation for Iframe + admin logs</Text>

//   </View>
//   );
// };


// const RoomView = () => {
//   // Get all camera tracks.
//   // The useTracks hook grabs the tracks from LiveKitRoom component
//   // providing the context for the Room object.
//   const tracks = useTracks([Track.Source.Camera]);

//   const renderTrack: ListRenderItem<TrackReferenceOrPlaceholder> = ({item}) => {
//     // Render using the VideoTrack component.
//     if(isTrackReference(item)) {
//       return (<VideoTrack trackRef={item} style={styles.participantView} />)
//     } else {
//       return (<View style={styles.participantView} />)
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={tracks}
//         renderItem={renderTrack}
//       />
//     </View>
//   );
// };


// export default LiveKitDemo;





const LiveKitDemo = () => {
  // Your component logic here
  return (
    <View>
      <Text>LiveKit Demo</Text>
    </View>
  );
};

export default LiveKitDemo; // Add this default export