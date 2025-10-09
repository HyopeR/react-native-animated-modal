import React, {useImperativeHandle, useRef} from 'react';
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
};

export const Scrollable = React.forwardRef<ScrollableRef, ScrollableProps>(
  (props: ScrollableProps, ref) => {
    const {orientation, children} = getSafeProps(
      props,
      ScrollableDefaultProps,
    ) as ScrollableStrictProps;

    const {native, scrolling, scrollingLock} = useShareContext();

    const scrollingLayout = useRef({width: 0, height: 0});

    const {onLayout} = useLayout({scrollingLayout});
    const {onContentSizeChange} = useContentSizeChange({
      orientation,
      scrolling,
      scrollingLayout,
    });
    const {onScroll} = useScroll({orientation, scrolling, scrollingLock});

    useImperativeHandle(
      ref,
      () => ({onLayout, onContentSizeChange, onScroll}),
      [onContentSizeChange, onLayout, onScroll],
    );

    return <GestureDetector gesture={native}>{children}</GestureDetector>;
  },
);
