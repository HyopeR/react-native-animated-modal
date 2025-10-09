import {useCallback} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {SharedValue} from 'react-native-reanimated';
import {Scroll} from '../../../types';

export const useScrollHorizontal = (
  scroll: SharedValue<Scroll>,
  scrollLock: SharedValue<boolean>,
) => {
  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const {contentOffset, contentSize, layoutMeasurement} = e.nativeEvent;

      if (scrollLock.value) return;

      const scrollable = contentSize.width > layoutMeasurement.width;
      if (!scrollable) return;

      const isAtLeft = contentOffset.x <= 0;
      const isAtRight =
        contentOffset.x + layoutMeasurement.width >= contentSize.width - 1;

      if (isAtLeft) {
        if (scroll.value !== 'left') {
          scroll.value = 'left';
        }
        return;
      }

      if (isAtRight) {
        if (scroll.value !== 'right') {
          scroll.value = 'right';
        }
        return;
      }

      if (scroll.value !== 'middle') {
        scroll.value = 'middle';
        return;
      }
    },
    [scroll, scrollLock],
  );
  return {onScroll};
};
