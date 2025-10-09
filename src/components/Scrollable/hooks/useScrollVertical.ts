import {useCallback} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {SharedValue} from 'react-native-reanimated';
import {Scroll} from '../../../types';

export const useScrollVertical = (
  scroll: SharedValue<Scroll>,
  scrollLock: SharedValue<boolean>,
) => {
  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const {contentOffset, contentSize, layoutMeasurement} = e.nativeEvent;

      if (scrollLock.value) return;

      const scrollable = contentSize.height > layoutMeasurement.height;
      if (!scrollable) return;

      const isAtTop = contentOffset.y <= 1;
      const isAtBottom =
        contentOffset.y + layoutMeasurement.height >= contentSize.height - 1;

      if (isAtTop) {
        if (scroll.value !== 'top') {
          scroll.value = 'top';
        }
        return;
      }

      if (isAtBottom) {
        if (scroll.value !== 'bottom') {
          scroll.value = 'bottom';
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
