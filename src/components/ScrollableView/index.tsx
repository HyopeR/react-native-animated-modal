import React from 'react';
import {ScrollView, ScrollViewProps} from 'react-native';
import Animated from 'react-native-reanimated';
import {ScrollableViewNs} from './index.type';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export type {ScrollableViewNs};

export const ScrollableView = React.forwardRef(
  (props: ScrollViewProps, ref: React.Ref<ScrollView>) => {
    // @ts-ignore
    return <AnimatedScrollView ref={ref} {...props} />;
  },
) as (
  props: ScrollViewProps & {ref?: React.Ref<ScrollView>},
) => React.ReactElement;
