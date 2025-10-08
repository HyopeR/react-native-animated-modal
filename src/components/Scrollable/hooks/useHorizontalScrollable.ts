import {useCallback} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {SharedValue} from 'react-native-reanimated';

export const useHorizontalScrollable = (scrolling: SharedValue<number>) => {
  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const {
        contentOffset,
        contentSize,
        layoutMeasurement: layout,
        velocity,
      } = e.nativeEvent;

      if (velocity === undefined) return;

      const isMovingRight = velocity.x <= 0;
      const isAtLeft = contentOffset.x <= 0;
      if (isAtLeft && isMovingRight) {
        scrolling.value = 0;
        return;
      }

      const scrollable = contentSize.width > layout.width;
      const ended = contentOffset.x + layout.width >= contentSize.width - 1;
      const isMovingLeft = velocity.x >= 0;
      const isAtRight = scrollable && ended;
      if (isAtRight && isMovingLeft) {
        scrolling.value = 0;
        return;
      }
    },
    [scrolling],
  );

  return {onScroll};
};
