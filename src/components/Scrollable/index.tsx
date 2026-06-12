import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Platform} from 'react-native';
import {runOnJS, useAnimatedReaction} from 'react-native-reanimated';
import {GestureDetector, ScrollView} from 'react-native-gesture-handler';
import {useShareContext} from '../../context';
import {getSafeProps} from '../../utils';
import {useEvent} from '../../hooks';
import {useLayout, useContentSizeChange, useScroll} from './hooks';
import {
  ScrollableChildrenProps,
  ScrollableProps,
  ScrollableRequiredProps,
  ScrollableStrictProps,
  ScrollableNs,
} from './index.type';

export type {ScrollableProps, ScrollableChildrenProps, ScrollableNs};

const ScrollableDefaultProps: ScrollableRequiredProps = {
  orientation: 'vertical',
  inverted: false,
  children: () => <></>,
};

/**
 * A wrapper component for managing scrollable children's events.
 * It is designed for use only inside a Modal.
 */
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

  const {
    native,
    panRef,
    scroll,
    scrollInteraction,
    scrollLock,
    scrollOrientation,
  } = useShareContext();

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

  const renderScrollComponent = useCallback<
    ScrollableChildrenProps['renderScrollComponent']
  >(
    rest => {
      return <ScrollView {...rest} simultaneousHandlers={panRef} />;
    },
    [panRef],
  );

  const options = useMemo<ScrollableChildrenProps>(() => {
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
      renderScrollComponent: renderScrollComponent,
    };
  }, [
    inverted,
    orientation,
    onContentSizeChange,
    onLayout,
    onScrollHandler,
    scrollEnabled,
    renderScrollComponent,
  ]);

  const node = children(options);
  const nodeGestureType = (node as any)?.type?.gestureType;
  const gesture = useMemo(() => {
    if (Platform.OS === 'android') {
      const shouldActiveOnStart = nodeGestureType === 'FlashList';
      native.shouldActivateOnStart(shouldActiveOnStart);
      return native;
    }
    return native;
  }, [native, nodeGestureType]);

  return <GestureDetector gesture={gesture}>{node}</GestureDetector>;
};
