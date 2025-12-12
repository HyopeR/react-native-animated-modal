import {ComponentType, ReactNode} from 'react';
// @ts-ignore
import type {LegendListRef} from '@legendapp/list';
// @ts-ignore
import type {LegendListProps} from '@legendapp/list';
// @ts-ignore
import type {LegendListRenderItemProps} from '@legendapp/list';

export namespace ScrollableLegendListNs {
  /**
   * LegendList reference type.
   */
  export type Ref = LegendListRef;
  /**
   * LegendList props type.
   */
  export type Props<ItemT> = LegendListProps<ItemT>;
  /**
   * LegendList RenderItem type.
   */
  export type RenderItem<
    ItemT,
    TItemType extends string | undefined = undefined,
  > =
    | ((props: LegendListRenderItemProps<ItemT, TItemType>) => ReactNode)
    | ComponentType<LegendListRenderItemProps<ItemT, TItemType>>;
}
