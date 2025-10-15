import {useCallback} from 'react';
import {UseContentSizeChangeProps} from './index.type';

export const useContentSizeChange = ({
  orientation,
  inverted,
  scroll,
  scrollLayout,
}: UseContentSizeChangeProps) => {
  const onContentSizeChange = useCallback(
    (width: number, height: number) => {
      if (orientation === 'vertical') {
        const boundary = !inverted ? 'top' : 'bottom';
        scroll.value = height > scrollLayout.current.height ? boundary : 'none';
      } else {
        const boundary = !inverted ? 'left' : 'right';
        scroll.value = width > scrollLayout.current.width ? boundary : 'none';
      }
    },
    [inverted, orientation, scroll, scrollLayout],
  );

  return {onContentSizeChange};
};
