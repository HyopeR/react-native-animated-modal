import React, {useImperativeHandle, useRef} from 'react';
import {GestureDetector} from 'react-native-gesture-handler';
import {useShareContext} from '../../context';
import {getSafeProps} from '../../utils';
import {useLayout, useContentSizeChange, useScrollable} from './hooks';
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

    const {native, scrolling, scrollingInitial} = useShareContext();

    const scrollingLayout = useRef({width: 0, height: 0});

    const {onLayout} = useLayout({scrollingLayout});
    const {onContentSizeChange} = useContentSizeChange({
      orientation,
      scrolling,
      scrollingInitial,
      scrollingLayout,
    });
    const {onScroll} = useScrollable({orientation, scrolling});

    useImperativeHandle(
      ref,
      () => ({onLayout, onContentSizeChange, onScroll}),
      [onContentSizeChange, onLayout, onScroll],
    );

    return <GestureDetector gesture={native}>{children}</GestureDetector>;
  },
);
