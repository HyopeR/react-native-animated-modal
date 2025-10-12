import {RefObject} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {SharedValue} from 'react-native-reanimated';
import {Scroll, Size} from '../../../types';

export type ScrollableEvent = Pick<
  NativeSyntheticEvent<NativeScrollEvent>,
  'nativeEvent'
>;

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
  onScroll?: (e: ScrollableEvent) => void;
  onBeginDrag?: (e: ScrollableEvent) => void;
  onEndDrag?: (e: ScrollableEvent) => void;
  onMomentumBegin?: (e: ScrollableEvent) => void;
  onMomentumEnd?: (e: ScrollableEvent) => void;
};

export type UseScrollCommonProps = {
  inverted: boolean;
  scroll: SharedValue<Scroll>;
  scrollLock: SharedValue<boolean>;
};
