import React from 'react';
import {StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import {BackdropPrivateStrictProps} from './index.type';

export const BackdropNone = (props: BackdropPrivateStrictProps) => {
  return <Animated.View style={styles.absolute} />;
};

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});
