import {useCallback} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {SharedValue} from 'react-native-reanimated';
import {useVerticalScrollable} from './useVerticalScrollable';
import {useHorizontalScrollable} from './useHorizontalScrollable';

export type UseScrollableProps = {
  orientation: 'vertical' | 'horizontal';
  scrolling: SharedValue<number>;
};

export const useScrollable = ({orientation, scrolling}: UseScrollableProps) => {
  const {onScroll: onScrollVertical} = useVerticalScrollable(scrolling);
  const {onScroll: onScrollHorizontal} = useHorizontalScrollable(scrolling);

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
