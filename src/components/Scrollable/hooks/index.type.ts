import {RefObject} from 'react';
import {SharedValue} from 'react-native-reanimated';
import {Scroll, Size} from '../../../types';
import {ScrollableNs} from '../index.type';

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
  scrollInteraction: SharedValue<boolean>;
  scrollLock: SharedValue<boolean>;
  onScroll?: (e: ScrollableNs.Event) => void;
  onBeginDrag?: (e: ScrollableNs.Event) => void;
  onEndDrag?: (e: ScrollableNs.Event) => void;
  onMomentumBegin?: (e: ScrollableNs.Event) => void;
  onMomentumEnd?: (e: ScrollableNs.Event) => void;
};

export type UseScrollCommonProps = {
  inverted: boolean;
  scroll: SharedValue<Scroll>;
  scrollLock: SharedValue<boolean>;
};
