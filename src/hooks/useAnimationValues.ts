import {useEffect, useMemo} from 'react';
import {Dimensions} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {SIZE} from '../constants';
import {ISize} from '../types';

/**
 * @internal
 * Initializes and provides shared animation values.
 */
export const useAnimationValues = () => {
  // animation management.
  const size = useSharedValue<ISize>(SIZE);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);

  // children management.
  const scrolling = useSharedValue(1);

  useEffect(() => {
    const sub = Dimensions.addEventListener('change', ({window}) => {
      const {width, height} = window;
      size.value = {width: width, height: height};
    });

    return () => sub.remove();
  }, [size]);

  return useMemo(() => {
    return {
      size,
      translateX,
      translateY,
      opacity,
      scale,
      scrolling,
    };
  }, [opacity, scale, scrolling, size, translateX, translateY]);
};
