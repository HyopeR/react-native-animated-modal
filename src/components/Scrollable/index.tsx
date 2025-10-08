import React, {useEffect} from 'react';
import {GestureDetector} from 'react-native-gesture-handler';
import {useShareContext} from '../../context';
import {getSafeProps} from '../../utils';
import {useEvent} from '../../hooks';
import {useScrollable} from './hooks';
import {
  ScrollableProps,
  ScrollableRequiredProps,
  ScrollableStrictProps,
} from './index.type';

export type {ScrollableProps};

const ScrollableDefaultProps: ScrollableRequiredProps = {
  orientation: 'vertical',
  onReady: () => {},
};

export const Scrollable = (props: ScrollableProps) => {
  const {orientation, onReady, children} = getSafeProps(
    props,
    ScrollableDefaultProps,
  ) as ScrollableStrictProps;

  const {native, scrolling} = useShareContext();

  const onReadyEvent = useEvent(onReady);

  const {onScroll} = useScrollable({orientation, scrolling});

  useEffect(() => {
    onReadyEvent(onScroll);
  }, [onReadyEvent, onScroll]);

  return <GestureDetector gesture={native}>{children}</GestureDetector>;
};

export {useScrollable};
