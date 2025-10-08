import {RefObject, useCallback} from 'react';
import {SharedValue} from 'react-native-reanimated';
import {Size} from '../../../types';

export type UseContentSizeChangeProps = {
  orientation: 'vertical' | 'horizontal';
  scrolling: SharedValue<number>;
  scrollingInitial: SharedValue<number>;
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
        const value = Number(height > scrollingLayout.current.height);
        scrollingInitial.value = value;
        scrolling.value = value;
      } else {
        const value = Number(width > scrollingLayout.current.width);
        scrollingInitial.value = value;
        scrolling.value = value;
      }
    },
    [orientation, scrolling, scrollingInitial, scrollingLayout],
  );

  return {onContentSizeChange};
};
