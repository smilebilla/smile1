import React from 'react';
import { Platform, StatusBar as RNStatusBar, View } from 'react-native';

type Props = {
  backgroundColor?: string;
  height?: number;
};

const StatusBarBackground: React.FC<Props> = ({
  backgroundColor = '#22223b',
  height,
}) => (
  <View
    style={{
      height: height ?? (Platform.OS === 'ios' ? 44 : RNStatusBar.currentHeight),
      backgroundColor,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
    }}
  />
);

export default StatusBarBackground; 