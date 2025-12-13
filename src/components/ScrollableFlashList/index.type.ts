// @ts-ignore
import type {FlashListRef} from '@shopify/flash-list';
// @ts-ignore
import type {FlashListProps} from '@shopify/flash-list';
// @ts-ignore
import type {ListRenderItem} from '@shopify/flash-list';

export namespace ScrollableFlashListNs {
  /**
   * FlashList reference type.
   * @see https://github.com/Shopify/flash-list
   */
  export type Ref<ItemT> = FlashListRef<ItemT>;
  /**
   * FlashList props type.
   * @see https://github.com/Shopify/flash-list
   */
  export type Props<ItemT> = FlashListProps<ItemT>;
  /**
   * FlashList RenderItem type.
   * @see https://github.com/Shopify/flash-list
   */
  export type RenderItem<ItemT> = ListRenderItem<ItemT>;
}
