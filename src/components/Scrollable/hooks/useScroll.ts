import {useCallback} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {SharedValue} from 'react-native-reanimated';
import {useScrollVertical} from './useScrollVertical';
import {useScrollHorizontal} from './useScrollHorizontal';

export type UseScrollableProps = {
  orientation: 'vertical' | 'horizontal';
  scrolling: SharedValue<string>;
};

export const useScroll = ({orientation, scrolling}: UseScrollableProps) => {
  const {onScroll: onScrollVertical} = useScrollVertical(scrolling);
  const {onScroll: onScrollHorizontal} = useScrollHorizontal(scrolling);

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
