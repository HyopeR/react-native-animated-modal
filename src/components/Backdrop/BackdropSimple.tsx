import React, {useEffect, useMemo} from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import Animated, {
  AnimatedStyle,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useModalContext} from '../../context';
import {BackdropPrivateStrictProps} from './index.type';

export const BackdropSimple = (props: BackdropPrivateStrictProps) => {
  const {opacity, backgroundColor, touch} = props;

  const {style: touchStyle, ...touchProps} = touch || {};

  const {size, animation, translateX: x, translateY: y} = useModalContext();
  const config = useMemo(
    () => ({duration: animation.duration}),
    [animation.duration],
  );

  const opacityMount = useSharedValue(false);
  const opacityShared = useSharedValue(0);

  const touchSx = useMemo<StyleProp<ViewStyle>>(() => {
    const assign = StyleSheet.flatten;
    return assign([{flex: 1}, touchStyle]);
  }, [touchStyle]);

  const containerSx = useMemo<AnimatedStyle<ViewStyle>>(() => {
    const assign = StyleSheet.flatten;
    return assign([StyleSheet.absoluteFillObject, {backgroundColor}]);
  }, [backgroundColor]);

  const containerSxAnimated = useAnimatedStyle(
    () => ({opacity: opacityShared.value}),
    [],
  );

  useAnimatedReaction(
    () => {
      const w = size.value.width;
      const h = size.value.height;
      const distance = Math.sqrt(x.value * x.value + y.value * y.value);
      const distanceMax = Math.sqrt(w * w + h * h) * 0.5;
      return {distance, distanceMax};
    },
    ({distance, distanceMax}) => {
      if (opacityMount.value) {
        opacityShared.value = opacity - distance / distanceMax;
      }
    },
    [opacity],
  );

  useEffect(() => {
    opacityShared.value = withTiming(opacity, config, () => {
      opacityMount.value = true;
    });
    return () => {
      opacityMount.value = false;
      opacityShared.value = withTiming(0, config);
    };
  }, [config, opacity, opacityMount, opacityShared]);

  return (
    <Animated.View style={[containerSx, containerSxAnimated]}>
      <TouchableOpacity activeOpacity={1} style={touchSx} {...touchProps} />
    </Animated.View>
  );
};
