import {useCallback} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {ReanimatedEvent} from 'react-native-reanimated';
import {UseScrollCommonProps} from './index.type';

export const useScrollVertical = ({
  inverted,
  scroll,
  scrollLock,
}: UseScrollCommonProps) => {
  const onScroll = useCallback(
    (e: ReanimatedEvent<NativeSyntheticEvent<NativeScrollEvent>>) => {
      'worklet';

      const {contentOffset, contentSize, layoutMeasurement} = e;

      if (scrollLock.value) return;

      const scrollable = contentSize.height > layoutMeasurement.height;
      if (!scrollable) return;

      const isAtTop = contentOffset.y <= 1;
      const isAtBottom =
        contentOffset.y + layoutMeasurement.height >= contentSize.height - 1;

      let value: 'top' | 'bottom' | 'middle';
      if (isAtTop) {
        value = !inverted ? 'top' : 'bottom';
      } else if (isAtBottom) {
        value = !inverted ? 'bottom' : 'top';
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
