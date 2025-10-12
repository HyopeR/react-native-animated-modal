import {FlatList, FlatListProps, ListRenderItem} from 'react-native';

export namespace ScrollableFlatListNs {
  export type Ref = FlatList<unknown>;
  export type Props<ItemT> = FlatListProps<ItemT>;
  export type RenderItem<ItemT> = ListRenderItem<ItemT>;
}
