import {useCallback} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {SharedValue} from 'react-native-reanimated';

export const useScrollHorizontal = (scrolling: SharedValue<string>) => {
  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const {contentOffset, contentSize, layoutMeasurement} = e.nativeEvent;

      const scrollable = contentSize.width > layoutMeasurement.width;
      if (!scrollable) return;

      const isAtLeft = contentOffset.x <= 0;
      const isAtRight =
        contentOffset.x + layoutMeasurement.width >= contentSize.width - 1;

      if (isAtLeft) {
        scrolling.value = 'right';
        return;
      }

      if (isAtRight) {
        scrolling.value = 'left';
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
