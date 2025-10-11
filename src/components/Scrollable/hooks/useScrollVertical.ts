import {useCallback} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {UseScrollCommonProps} from './types';

export const useScrollVertical = ({
  inverted,
  scroll,
  scrollLock,
}: UseScrollCommonProps) => {
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
        const boundary = !inverted ? 'top' : 'bottom';
        if (scroll.value !== boundary) {
          scroll.value = boundary;
        }
        return;
      }

      if (isAtBottom) {
        const boundary = !inverted ? 'bottom' : 'top';
        if (scroll.value !== boundary) {
          scroll.value = boundary;
        }
        return;
      }

      if (scroll.value !== 'middle') {
        scroll.value = 'middle';
        return;
      }
    },
    [inverted, scroll, scrollLock],
  );
  return {onScroll};
};
