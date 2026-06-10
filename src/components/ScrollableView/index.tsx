import React from 'react';
import {ScrollView, ScrollViewProps} from 'react-native';
import Animated from 'react-native-reanimated';
import {ScrollableViewNs} from './index.type';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

/**
 * ScrollView component in react-native wrapped with reanimated.
 */
const ScrollableView = React.forwardRef(
  (props: ScrollViewProps, ref: React.Ref<ScrollView>) => {
    // @ts-ignore
    return <AnimatedScrollView ref={ref} {...props} />;
  },
) as (
  props: ScrollViewProps & {ref?: React.Ref<ScrollView>},
) => React.ReactElement;

// @ts-ignore
ScrollableView.gestureType = 'ScrollView';
export {ScrollableView};
export type {ScrollableViewNs};
