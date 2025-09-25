import {useEffect, useMemo} from 'react';
import {Dimensions} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {SIZE} from '../constants';
import {ISize} from '../types';

export const useAnimationValues = () => {
  const size = useSharedValue<ISize>(SIZE);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);

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
    };
  }, [opacity, scale, size, translateX, translateY]);
};
