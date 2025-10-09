import {RefObject, useCallback} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {Size} from '../../../types';

export type UseLayoutProps = {
  scrollLayout: RefObject<Size>;
};

export const useLayout = ({scrollLayout}: UseLayoutProps) => {
  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const {width, height} = e.nativeEvent.layout;
      scrollLayout.current = {width, height};
    },
    [scrollLayout],
  );

  return {onLayout};
};
