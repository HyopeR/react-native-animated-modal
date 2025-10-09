import {useCallback} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {SharedValue} from 'react-native-reanimated';
import {useScrollVertical} from './useScrollVertical';
import {useScrollHorizontal} from './useScrollHorizontal';
import {Scroll} from '../../../types';

export type UseScrollableProps = {
  orientation: 'vertical' | 'horizontal';
  scroll: SharedValue<Scroll>;
  scrollLock: SharedValue<boolean>;
};

export const useScroll = ({
  orientation,
  scroll,
  scrollLock,
}: UseScrollableProps) => {
  const {onScroll: onScrollVertical} = useScrollVertical(scroll, scrollLock);
  const {onScroll: onScrollHorizontal} = useScrollHorizontal(
    scroll,
    scrollLock,
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
