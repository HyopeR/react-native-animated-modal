import {useCallback} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {UseLayoutProps} from './index.type';

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
