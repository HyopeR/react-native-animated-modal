let Package: Record<string, any>;
try {
  Package = require('@legendapp/list/reanimated') as never;
} catch (_) {}

import React, {useMemo} from 'react';
import {ScrollableLegendListNs} from './index.type';

// @ts-ignore
function ScrollableLegendListComponent<ItemT>(
  props: ScrollableLegendListNs.Props<ItemT> &
    React.RefAttributes<ScrollableLegendListNs.Ref>,
): React.ReactElement;

function ScrollableLegendListComponent<ItemT>(
  props: ScrollableLegendListNs.Props<ItemT>,
  ref: React.Ref<ScrollableLegendListNs.Ref>,
): React.ReactElement {
  const AnimatedLegendList = useMemo(() => {
    if (!Package) {
      throw 'You need to install `@legendapp/list` to use this component.';
    }

    return Package.AnimatedLegendList;
  }, []);

  // @ts-ignore
  return <AnimatedLegendList ref={ref} {...props} />;
}

const ScrollableLegendList = React.forwardRef(
  ScrollableLegendListComponent,
) as typeof ScrollableLegendListComponent;

// @ts-ignore
ScrollableLegendList.gestureType = 'LegendList';
export {ScrollableLegendList};
export type {ScrollableLegendListNs};
