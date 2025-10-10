import {useEffect, useMemo} from 'react';
import {Dimensions} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {SIZE} from '../constants';
import {Size, Offset, ScrollOrientation, Scroll, Status} from '../types';

/**
 * @internal
 * Initializes and provides shared animation values.
 */
export const useAnimationValues = () => {
  // Animation management values.
  const status = useSharedValue<Status>('idle');
  const size = useSharedValue<Size>(SIZE);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);

  // Children management values.
  const scroll = useSharedValue<Scroll>('none');
  const scrollLock = useSharedValue(false);
  const scrollOffset = useSharedValue<Offset>({x: 0, y: 0});
  const scrollOrientation = useSharedValue<ScrollOrientation>('none');

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
      status,
      translateX,
      translateY,
      opacity,
      scale,
      scroll,
      scrollLock,
      scrollOffset,
      scrollOrientation,
    };
  }, [
    opacity,
    scale,
    scroll,
    scrollLock,
    scrollOffset,
    scrollOrientation,
    size,
    status,
    translateX,
    translateY,
  ]);
};
