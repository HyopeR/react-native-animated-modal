import React, {useMemo} from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import Animated, {
  AnimatedStyle,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import {useModalContext} from '../../context';
import {BackdropPrivateStrictProps} from './index.type';

export const BackdropSimple = (props: BackdropPrivateStrictProps) => {
  const {opacity, backgroundColor, touch} = props;

  const {style: touchStyle, ...touchProps} = touch || {};

  const {
    size,
    animation,
    translateX: x,
    translateY: y,
    opacity: o,
    scale: s,
  } = useModalContext();

  const {type} = animation;

  const opacityDerived = useDerivedValue(() => {
    switch (type) {
      case 'fade':
        return interpolate(o.value, [0, 1], [0, opacity]);
      case 'slide':
        const w = size.value.width;
        const h = size.value.height;
        const distance = Math.sqrt(x.value * x.value + y.value * y.value);
        const distanceMax = Math.sqrt(w * w + h * h) * 0.5;
        return opacity - distance / distanceMax;
      case 'scale':
        return interpolate(s.value, [0, 1], [0, opacity]);
    }
  }, [type, x, y, o, s, opacity]);

  const touchSx = useMemo<StyleProp<ViewStyle>>(() => {
    const assign = StyleSheet.flatten;
    return assign([styles.root, touchStyle]);
  }, [touchStyle]);

  const containerSx = useMemo<AnimatedStyle<ViewStyle>>(() => {
    const assign = StyleSheet.flatten;
    return assign([styles.absolute, {backgroundColor}]);
  }, [backgroundColor]);

  const containerSxAnimated = useAnimatedStyle(
    () => ({opacity: opacityDerived.value}),
    [],
  );

  return (
    <Animated.View style={[containerSx, containerSxAnimated]}>
      <TouchableOpacity activeOpacity={1} style={touchSx} {...touchProps} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  absolute: StyleSheet.absoluteFillObject,
  root: {
    flex: 1,
  },
});
