import {useCallback, useMemo} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {useScrollVertical} from './useScrollVertical';
import {useScrollHorizontal} from './useScrollHorizontal';
import {UseScrollProps, UseScrollCommonProps} from './types';

export const useScroll = ({
  orientation,
  inverted,
  scroll,
  scrollLock,
}: UseScrollProps) => {
  const commonProps = useMemo<UseScrollCommonProps>(() => {
    return {inverted, scroll, scrollLock};
  }, [inverted, scroll, scrollLock]);

  const {onScroll: onScrollVertical} = useScrollVertical(commonProps);
  const {onScroll: onScrollHorizontal} = useScrollHorizontal(commonProps);

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
