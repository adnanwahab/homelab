import * as React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ListRenderItem,
} from 'react-native';
import { useEffect } from 'react';
import {
  AudioSession,
  LiveKitRoom,
  useTracks,
  TrackReferenceOrPlaceholder,
  VideoTrack,
  isTrackReference,
  registerGlobals,
} from '@livekit/react-native';
import { Track } from 'livekit-client';

// registerGlobals must be called prior to using LiveKit.
registerGlobals();

// Fill in these values with your own url and token.
const wsURL = "wss://omnissiah-university-kmuz0plz.livekit.cloud"

export default function App() {
  const [token, setToken] = React.useState<string | null>(null);

  // Start the audio session and fetch the token.
  React.useEffect(() => {
    const start = async () => {
      await AudioSession.startAudioSession();

      // Fetch the token
      const response = await fetch('https://dynabot.dev/api/livekit/get-token');
      const data = await response.json();
      setToken(data.token);
    };

    start();

    return () => {
      AudioSession.stopAudioSession();
    };
  }, []);

  if (!token) {
    // You can show a loading indicator here
    return null;
  }

  return (
    <LiveKitRoom
      serverUrl={wsURL}
      token={token}
      connect={true}
      options={{
        // Use screen pixel density to handle screens with differing densities.
        adaptiveStream: { pixelDensity: 'screen' },
      }}
      audio={true}
      video={true}
    >
      <RoomView />
    </LiveKitRoom>
  );
};

const RoomView = () => {
  // Get all camera tracks.
  const tracks = useTracks([Track.Source.Camera]);

  const renderTrack: ListRenderItem<TrackReferenceOrPlaceholder> = ({item}) => {
    // Render using the VideoTrack component.
    if(isTrackReference(item)) {
      return (<VideoTrack trackRef={item} style={styles.participantView} />)
    } else {
      return (<View style={styles.participantView} />)
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tracks}
        renderItem={renderTrack}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  participantView: {
    height: 300,
  },
});