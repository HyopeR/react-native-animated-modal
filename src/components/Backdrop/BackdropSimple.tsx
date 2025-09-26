import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import {useModalContext} from '../../context';
import {BackdropPrivateStrictProps} from './index.type';

export const BackdropSimple = (props: BackdropPrivateStrictProps) => {
  const {style: touchStyle, ...touchProps} = props?.touch || {};

  const {
    size,
    animation,
    backdrop,
    translateX: x,
    translateY: y,
    opacity: o,
    scale: s,
  } = useModalContext();

  const {type} = animation;
  const {opacity, backgroundColor} = backdrop;

  const opacityDerived = useDerivedValue(() => {
    switch (type) {
      case 'fade':
        return interpolate(o.value, [0, 1], [0, opacity]);
      case 'slide':
        const distance = Math.sqrt(x.value ** 2 + y.value ** 2);
        const distanceMax =
          Math.sqrt(size.value.width ** 2 + size.value.height ** 2) * 0.6;
        return opacity - distance / distanceMax;
      case 'scale':
        return interpolate(s.value, [0, 1], [0, opacity]);
    }
  }, [type, opacity]);

  const touchSx = StyleSheet.flatten([styles.root, touchStyle]);
  const containerSx = StyleSheet.flatten([styles.absolute, {backgroundColor}]);
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
