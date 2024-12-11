import { registerGlobals } from '@livekit/react-native';

import { Text } from "react-native";
import * as React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ListRenderItem,
} from 'react-native';

registerGlobals();

//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import LiveKitDemo from "./LiveKitDemo";
import MusicGame from './MusicGame';

//const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View>
      <LiveKitDemo />
    </View>
  );
}
