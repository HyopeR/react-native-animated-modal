import {RefObject, useCallback} from 'react';
import {SharedValue} from 'react-native-reanimated';
import {Size} from '../../../types';

export type UseContentSizeChangeProps = {
  orientation: 'vertical' | 'horizontal';
  scrolling: SharedValue<string>;
  scrollingInitial: SharedValue<string>;
  scrollingLayout: RefObject<Size>;
};

export const useContentSizeChange = ({
  orientation,
  scrolling,
  scrollingInitial,
  scrollingLayout,
}: UseContentSizeChangeProps) => {
  const onContentSizeChange = useCallback(
    (width: number, height: number) => {
      if (orientation === 'vertical') {
        const value = height > scrollingLayout.current.height ? 'down' : 'none';
        scrollingInitial.value = value;
        scrolling.value = value;
      } else {
        const value = width > scrollingLayout.current.width ? 'right' : 'none';
        scrollingInitial.value = value;
        scrolling.value = value;
      }
    },
    [orientation, scrolling, scrollingInitial, scrollingLayout],
  );

  return {onContentSizeChange};
};
