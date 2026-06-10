import React from 'react';
import {FlatList, FlatListProps} from 'react-native';
import Animated from 'react-native-reanimated';
import {ScrollableFlatListNs} from './index.type';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

/**
 * FlatList component in react-native wrapped with reanimated.
 */
const ScrollableFlatList = React.forwardRef(
  <ItemT,>(props: FlatListProps<ItemT>, ref: React.Ref<FlatList<ItemT>>) => {
    // @ts-ignore
    return <AnimatedFlatList ref={ref} {...props} />;
  },
) as <ItemT>(
  props: FlatListProps<ItemT> & {ref?: React.Ref<FlatList<unknown>>},
) => React.ReactElement;

// @ts-ignore
ScrollableFlatList.gestureType = 'FlatList';
export {ScrollableFlatList};
export type {ScrollableFlatListNs};
