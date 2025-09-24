import React, {useMemo} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import Animated, {
  AnimatedStyle,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useModalContext} from '../../context';
import {getSafeProps} from '../../utils';
import {
  ContentProps,
  ContentPrivateProps,
  ContentPrivateStrictProps,
  ContentRequiredProps,
} from './index.type';

export type {ContentProps, ContentPrivateProps};

const ContentDefaultProps: ContentRequiredProps = {};

export const Content = (props: ContentPrivateProps) => {
  const safeProps = getSafeProps(
    props,
    ContentDefaultProps,
  ) as ContentPrivateStrictProps;

  const {style, children} = safeProps;

  const {opacity, translateX, translateY, scale} = useModalContext();

  const containerSx = useMemo<AnimatedStyle<ViewStyle>>(() => {
    return StyleSheet.flatten([style, {flex: 1, justifyContent: 'center'}]);
  }, [style]);

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
