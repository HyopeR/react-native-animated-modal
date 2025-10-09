import {RefObject, useCallback} from 'react';
import {SharedValue} from 'react-native-reanimated';
import {Size} from '../../../types';

export type UseContentSizeChangeProps = {
  orientation: 'vertical' | 'horizontal';
  scrolling: SharedValue<string>;
  scrollingLayout: RefObject<Size>;
};

export const useContentSizeChange = ({
  orientation,
  scrolling,
  scrollingLayout,
}: UseContentSizeChangeProps) => {
  const onContentSizeChange = useCallback(
    (width: number, height: number) => {
      if (orientation === 'vertical') {
        const value = height > scrollingLayout.current.height ? 'down' : 'none';
        scrolling.value = value;
      } else {
        const value = width > scrollingLayout.current.width ? 'right' : 'none';
        scrolling.value = value;
      }
    },
    [orientation, scrolling, scrollingLayout],
  );

  return {onContentSizeChange};
};
