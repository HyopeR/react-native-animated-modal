import {useCallback} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {SharedValue} from 'react-native-reanimated';

export const useScrollVertical = (scrolling: SharedValue<string>) => {
  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const {contentOffset, contentSize, layoutMeasurement} = e.nativeEvent;

      const scrollable = contentSize.height > layoutMeasurement.height;
      if (!scrollable) return;

      const isAtTop = contentOffset.y <= 1;
      const isAtBottom =
        contentOffset.y + layoutMeasurement.height >= contentSize.height - 1;

      if (isAtTop) {
        scrolling.value = 'down';
        return;
      }

      if (isAtBottom) {
        scrolling.value = 'up';
        return;
      }

      if (scrolling.value !== 'idle') {
        scrolling.value = 'idle';
        return;
      }
    },
    [scrolling],
  );
  return {onScroll};
};
