import React, {useEffect, useMemo, useRef, useState} from 'react';
import {runOnJS, useAnimatedReaction} from 'react-native-reanimated';
import {GestureDetector} from 'react-native-gesture-handler';
import {useShareContext} from '../../context';
import {getSafeProps} from '../../utils';
import {useEvent} from '../../hooks';
import {useLayout, useContentSizeChange, useScroll} from './hooks';
import {
  ScrollableChildrenOptions,
  ScrollableProps,
  ScrollableRequiredProps,
  ScrollableStrictProps,
  ScrollableEvent,
} from './index.type';

export type {ScrollableProps, ScrollableChildrenOptions, ScrollableEvent};

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
  const [scrollEnabled, setScrollEnabled] = useState(true);

  useEffect(() => {
    scrollOrientation.value = orientation;
  }, [orientation, scrollOrientation]);

  useAnimatedReaction(
    () => scrollLock.value,
    (next, prev) => {
      if (next !== prev) runOnJS(setScrollEnabled)(!next);
    },
    [],
  );

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

  const options = useMemo<ScrollableChildrenOptions>(() => {
    return {
      horizontal: orientation === 'horizontal',
      inverted: inverted,
      pointerEvents: scrollEnabled ? 'auto' : 'none',
      scrollEventThrottle: 16,
      bounces: false,
      alwaysBounceVertical: false,
      alwaysBounceHorizontal: false,
      onLayout: onLayout,
      onContentSizeChange: onContentSizeChange,
      onScroll: onScrollHandler,
    };
  }, [
    inverted,
    orientation,
    onContentSizeChange,
    onLayout,
    onScrollHandler,
    scrollEnabled,
  ]);

  return (
    <GestureDetector gesture={native}>{children(options)}</GestureDetector>
  );
};
