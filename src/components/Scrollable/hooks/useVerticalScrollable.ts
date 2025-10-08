import {useCallback} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {SharedValue} from 'react-native-reanimated';

export const useVerticalScrollable = (scrolling: SharedValue<number>) => {
  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const {
        contentOffset,
        contentSize,
        layoutMeasurement: layout,
        velocity,
      } = e.nativeEvent;

      if (velocity === undefined) return;

      const isMovingDown = velocity.y <= 0;
      const isAtTop = contentOffset.y <= 0;
      if (isAtTop && isMovingDown) {
        scrolling.value = 0;
        return;
      }

      const scrollable = contentSize.height > layout.height;
      const ended = contentOffset.y + layout.height >= contentSize.height - 1;
      const isMovingUp = velocity.y >= 0;
      const isAtBottom = scrollable && ended;
      if (isAtBottom && isMovingUp) {
        scrolling.value = 0;
        return;
      }
    },
    [scrolling],
  );

  return {onScroll};
};
