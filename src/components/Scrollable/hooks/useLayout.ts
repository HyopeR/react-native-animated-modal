import {RefObject, useCallback} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {Size} from '../../../types';

export type UseLayoutProps = {
  scrollingLayout: RefObject<Size>;
};

export const useLayout = ({scrollingLayout}: UseLayoutProps) => {
  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const {width, height} = e.nativeEvent.layout;
      scrollingLayout.current = {width, height};
    },
    [scrollingLayout],
  );

  return {onLayout};
};
