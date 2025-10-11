import React, {useEffect, useImperativeHandle, useRef} from 'react';
import {GestureDetector} from 'react-native-gesture-handler';
import {useShareContext} from '../../context';
import {getSafeProps} from '../../utils';
import {useLayout, useContentSizeChange, useScroll} from './hooks';
import {
  ScrollableRef,
  ScrollableProps,
  ScrollableRequiredProps,
  ScrollableStrictProps,
} from './index.type';

export type {ScrollableProps, ScrollableRef};

const ScrollableDefaultProps: ScrollableRequiredProps = {
  orientation: 'vertical',
  inverted: false,
};

export const Scrollable = React.forwardRef<ScrollableRef, ScrollableProps>(
  (props: ScrollableProps, ref) => {
    const safeProps = getSafeProps(
      props,
      ScrollableDefaultProps,
    ) as ScrollableStrictProps;

    const {orientation, inverted, children} = safeProps;

    const {native, scroll, scrollLock, scrollOrientation} = useShareContext();

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
    const {onScroll} = useScroll({orientation, inverted, scroll, scrollLock});

    useImperativeHandle(
      ref,
      () => ({onLayout, onContentSizeChange, onScroll}),
      [onContentSizeChange, onLayout, onScroll],
    );

    return <GestureDetector gesture={native}>{children}</GestureDetector>;
  },
);
