import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {useShareContext} from '../../context';
import {
  ContentProps,
  ContentPrivateProps,
  ContentPrivateStrictProps,
} from './index.type';

export type {ContentProps, ContentPrivateProps};

export const Content = (props: ContentPrivateStrictProps) => {
  const {style, children} = props;

  const {opacity, translateX, translateY, scale} = useShareContext();

  const containerSx = StyleSheet.flatten([styles.root, style]);
  const containerSxAnimated = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
        {scale: scale.value},
      ],
    };
  }, []);

  return (
    <Animated.View
      pointerEvents={'box-none'}
      style={[containerSx, containerSxAnimated]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
