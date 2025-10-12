import React, {useEffect, useMemo, useRef} from 'react';
import {GestureDetector} from 'react-native-gesture-handler';
import {useShareContext} from '../../context';
import {getSafeProps} from '../../utils';
import {useLayout, useContentSizeChange, useScroll} from './hooks';
import {
  ScrollableChildrenOptions,
  ScrollableProps,
  ScrollableRequiredProps,
  ScrollableStrictProps,
} from './index.type';
import {useEvent} from '../../hooks';
import {Platform} from 'react-native';

export type {ScrollableProps, ScrollableChildrenOptions};

const ScrollableDefaultProps: ScrollableRequiredProps = {
  orientation: 'vertical',
  inverted: false,
  children: () => <></>,
};

export const Scrollable = (props: ScrollableProps) => {
  const safeProps = getSafeProps(
    props,
    ScrollableDefaultProps,
  ) as ScrollableStrictProps;

  const {
    orientation,
    inverted,
    children,
    onScroll,
    onBeginDrag,
    onEndDrag,
    onMomentumBegin,
    onMomentumEnd,
  } = safeProps;

  const {native, scroll, scrollInteraction, scrollLock, scrollOrientation} =
    useShareContext();

  const scrollLayout = useRef({width: 0, height: 0});

  useEffect(() => {
    scrollOrientation.value = orientation;
  }, [orientation, scrollOrientation]);

  const {onLayout} = useLayout({scrollLayout});

  const {onContentSizeChange} = useContentSizeChange({
    orientation,
    inverted,
    scroll,
    scrollLayout,
  });

  const onScrollEvent = useEvent(onScroll);
  const onBeginDragEvent = useEvent(onBeginDrag);
  const onEndDragEvent = useEvent(onEndDrag);
  const onMomentumBeginEvent = useEvent(onMomentumBegin);
  const onMomentumEndEvent = useEvent(onMomentumEnd);
  const {onScrollHandler} = useScroll({
    orientation,
    inverted,
    scroll,
    scrollInteraction,
    scrollLock,
    onScroll: onScrollEvent,
    onBeginDrag: onBeginDragEvent,
    onEndDrag: onEndDragEvent,
    onMomentumBegin: onMomentumBeginEvent,
    onMomentumEnd: onMomentumEndEvent,
  });

  const options = useMemo(() => {
    return {
      horizontal: orientation === 'horizontal',
      inverted: inverted,
      scrollEventThrottle: Platform.OS === 'android' ? 8 : 16,
      bounces: false,
      alwaysBounceVertical: false,
      alwaysBounceHorizontal: false,
      onLayout,
      onContentSizeChange,
      onScroll: onScrollHandler,
    };
  }, [inverted, orientation, onContentSizeChange, onLayout, onScrollHandler]);

  return (
    <GestureDetector gesture={native}>{children(options)}</GestureDetector>
  );
};
