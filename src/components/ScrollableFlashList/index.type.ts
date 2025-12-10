// @ts-ignore
import type {FlashListRef} from '@shopify/flash-list';
// @ts-ignore
import type {FlashListProps} from '@shopify/flash-list';
// @ts-ignore
import type {ListRenderItem} from '@shopify/flash-list';

export namespace ScrollableFlashListNs {
  /**
   * FlashList reference type.
   */
  export type Ref = FlashListRef<unknown>;
  /**
   * FlashList props type.
   */
  export type Props<ItemT> = FlashListProps<ItemT>;
  /**
   * FlashList RenderItem type.
   */
  export type RenderItem<ItemT> = ListRenderItem<ItemT>;
}
