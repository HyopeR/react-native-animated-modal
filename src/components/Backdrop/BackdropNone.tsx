import React from 'react';
import {StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import {BackdropPrivateStrictProps} from './index.type';

export const BackdropNone = (props: BackdropPrivateStrictProps) => {
  return <Animated.View style={StyleSheet.absoluteFillObject} />;
};
