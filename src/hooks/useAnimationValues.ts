import {useEffect, useMemo} from 'react';
import {Dimensions} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {SIZE} from '../constants';
import {Size, Offset} from '../types';

/**
 * @internal
 * Initializes and provides shared animation values.
 */
export const useAnimationValues = () => {
  // Animation management values.
  const size = useSharedValue<Size>(SIZE);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);

  // Children management values.
  const scrolling = useSharedValue('down');
  const scrollingLock = useSharedValue(false);
  const scrollingOffset = useSharedValue<Offset>({x: 0, y: 0});

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
      scrollingLock,
      scrollingOffset,
    };
  }, [
    opacity,
    scale,
    scrolling,
    scrollingLock,
    scrollingOffset,
    size,
    translateX,
    translateY,
  ]);
};
