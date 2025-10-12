import React from 'react';
import {SectionList, SectionListProps} from 'react-native';
import Animated from 'react-native-reanimated';
import {ScrollableSectionListNs} from './index.type';

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

export type {ScrollableSectionListNs};

export const ScrollableSectionList = React.forwardRef(
  <ItemT, SectionT>(
    props: SectionListProps<ItemT, SectionT>,
    ref: React.Ref<SectionList<ItemT, SectionT>>,
  ) => {
    // @ts-ignore
    return <AnimatedSectionList ref={ref} {...props} />;
  },
) as <ItemT, SectionT>(
  props: SectionListProps<ItemT, SectionT> & {
    ref?: React.Ref<SectionList<unknown, unknown>>;
  },
) => React.ReactElement;
