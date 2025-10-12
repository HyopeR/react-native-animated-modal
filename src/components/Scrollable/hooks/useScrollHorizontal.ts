import {useCallback} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {ReanimatedEvent} from 'react-native-reanimated';
import {UseScrollCommonProps} from './index.type';

export const useScrollHorizontal = ({
  inverted,
  scroll,
  scrollLock,
}: UseScrollCommonProps) => {
  const onScroll = useCallback(
    (e: ReanimatedEvent<NativeSyntheticEvent<NativeScrollEvent>>) => {
      'worklet';

      const {contentOffset, contentSize, layoutMeasurement} = e;

      if (scrollLock.value) return;

      const scrollable = contentSize.width > layoutMeasurement.width;
      if (!scrollable) return;

      const isAtLeft = contentOffset.x <= 1;
      const isAtRight =
        contentOffset.x + layoutMeasurement.width >= contentSize.width - 1;

      let value: 'left' | 'right' | 'middle';
      if (isAtLeft) {
        value = !inverted ? 'left' : 'right';
      } else if (isAtRight) {
        value = !inverted ? 'right' : 'left';
      } else {
        value = 'middle';
      }

      if (scroll.value !== value) {
        scroll.value = value;
      }
    },
    [inverted, scroll, scrollLock],
  );

  return {onScroll};
};
