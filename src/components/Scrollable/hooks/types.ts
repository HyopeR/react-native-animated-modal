import {RefObject} from 'react';
import {SharedValue} from 'react-native-reanimated';
import {Scroll, Size} from '../../../types';

export type UseContentSizeChangeProps = {
  orientation: 'vertical' | 'horizontal';
  inverted: boolean;
  scroll: SharedValue<Scroll>;
  scrollLayout: RefObject<Size>;
};

export type UseLayoutProps = {
  scrollLayout: RefObject<Size>;
};

export type UseScrollProps = {
  orientation: 'vertical' | 'horizontal';
  inverted: boolean;
  scroll: SharedValue<Scroll>;
  scrollLock: SharedValue<boolean>;
};

export type UseScrollCommonProps = Omit<UseScrollProps, 'orientation'>;
