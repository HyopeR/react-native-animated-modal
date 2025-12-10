// @ts-ignore
import type {FlashListProps} from '@shopify/flash-list';
import React, {useMemo} from 'react';
import {ScrollView, ScrollViewProps} from 'react-native';
import Animated from 'react-native-reanimated';

// @ts-ignore
let FlashList: {FlashList: React.FC};
try {
  FlashList = require('@shopify/flash-list') as never;
} catch (_) {}

import {ScrollableFlashListNs} from './index.type';
export type {ScrollableFlashListNs};

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

/**
 * FlashList component wrapped with reanimated.
 */
export const ScrollableFlashList = React.forwardRef(
  <ItemT,>(props: FlashListProps<ItemT>, ref: React.Ref<ScrollView>) => {
    useMemo(() => {
      if (!FlashList) {
        //console.log(require('@shopify/flash-list'));
        //throw 'You need to install `@shopify/flash-list` to use this component.';
      }
    }, []);

    const renderScroll = useMemo(() => {
      return React.forwardRef(
        (scrollProps: ScrollViewProps, scrollRef: React.Ref<ScrollView>) => {
          return <AnimatedScrollView ref={scrollRef} {...scrollProps} />;
        },
      );
    }, []);

    return (
      // @ts-ignore
      <FlashList.FlashList
        ref={ref}
        renderScrollComponent={renderScroll}
        {...props}
      />
    );
  },
) as <ItemT>(
  props: FlashListProps<ItemT> & {ref?: React.Ref<unknown>},
) => React.ReactElement;
