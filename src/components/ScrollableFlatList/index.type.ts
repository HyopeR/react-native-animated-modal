import {FlatList, FlatListProps, ListRenderItem} from 'react-native';

export namespace ScrollableFlatListNs {
  /**
   * FlatList reference type.
   */
  export type Ref = FlatList<unknown>;
  /**
   * FlatList props type.
   */
  export type Props<ItemT> = FlatListProps<ItemT>;
  /**
   * FlatList RenderItem type.
   */
  export type RenderItem<ItemT> = ListRenderItem<ItemT>;
}
