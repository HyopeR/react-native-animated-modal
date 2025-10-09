import {useCallback} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {SharedValue} from 'react-native-reanimated';
import {useScrollVertical} from './useScrollVertical';
import {useScrollHorizontal} from './useScrollHorizontal';

export type UseScrollableProps = {
  orientation: 'vertical' | 'horizontal';
  scrolling: SharedValue<string>;
  scrollingLock: SharedValue<boolean>;
};

export const useScroll = ({
  orientation,
  scrolling,
  scrollingLock,
}: UseScrollableProps) => {
  const {onScroll: onScrollVertical} = useScrollVertical(
    scrolling,
    scrollingLock,
  );
  const {onScroll: onScrollHorizontal} = useScrollHorizontal(
    scrolling,
    scrollingLock,
  );

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (orientation === 'vertical') {
        onScrollVertical(e);
      } else {
        onScrollHorizontal(e);
      }
    },
    [onScrollHorizontal, onScrollVertical, orientation],
  );

  return {onScroll};
};
