let Package: Record<string, any>;
try {
  Package = require('@shopify/flash-list') as never;
} catch (_) {}

import React, {useMemo} from 'react';
import Animated from 'react-native-reanimated';
import {ScrollableFlashListNs} from './index.type';

// @ts-ignore
function ScrollableFlashListComponent<ItemT>(
  props: ScrollableFlashListNs.Props<ItemT> &
    React.RefAttributes<ScrollableFlashListNs.Ref<ItemT>>,
): React.ReactElement;

function ScrollableFlashListComponent<ItemT>(
  props: ScrollableFlashListNs.Props<ItemT>,
  ref: React.Ref<ScrollableFlashListNs.Ref<ItemT>>,
): React.ReactElement {
  const AnimatedFlashList = useMemo(() => {
    if (!Package) {
      throw 'You need to install `@shopify/flash-list` to use this component.';
    }

    return Animated.createAnimatedComponent(Package.FlashList);
  }, []);

  // @ts-ignore
  return <AnimatedFlashList ref={ref} {...props} />;
}

const ScrollableFlashList = React.forwardRef(
  ScrollableFlashListComponent,
) as typeof ScrollableFlashListComponent;

export {ScrollableFlashList};
export type {ScrollableFlashListNs};
