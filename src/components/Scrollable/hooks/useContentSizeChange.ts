import {RefObject, useCallback} from 'react';
import {SharedValue} from 'react-native-reanimated';
import {Scroll, Size} from '../../../types';

export type UseContentSizeChangeProps = {
  orientation: 'vertical' | 'horizontal';
  scroll: SharedValue<Scroll>;
  scrollLayout: RefObject<Size>;
};

export const useContentSizeChange = ({
  orientation,
  scroll,
  scrollLayout,
}: UseContentSizeChangeProps) => {
  const onContentSizeChange = useCallback(
    (width: number, height: number) => {
      if (orientation === 'vertical') {
        scroll.value = height > scrollLayout.current.height ? 'top' : 'none';
      } else {
        scroll.value = width > scrollLayout.current.width ? 'left' : 'none';
      }
    },
    [orientation, scroll, scrollLayout],
  );

  return {onContentSizeChange};
};
