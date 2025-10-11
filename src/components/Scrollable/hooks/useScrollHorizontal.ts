import {useCallback} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {UseScrollCommonProps} from './types';

export const useScrollHorizontal = ({
  inverted,
  scroll,
  scrollLock,
}: UseScrollCommonProps) => {
  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const {contentOffset, contentSize, layoutMeasurement} = e.nativeEvent;

      if (scrollLock.value) return;

      const scrollable = contentSize.width > layoutMeasurement.width;
      if (!scrollable) return;

      const isAtLeft = contentOffset.x <= 1;
      const isAtRight =
        contentOffset.x + layoutMeasurement.width >= contentSize.width - 1;

      if (isAtLeft) {
        const boundary = !inverted ? 'left' : 'right';
        if (scroll.value !== boundary) {
          scroll.value = boundary;
        }
        return;
      }

      if (isAtRight) {
        const boundary = !inverted ? 'right' : 'left';
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
