import {
  SectionList,
  SectionListProps,
  SectionListRenderItem,
  SectionListData,
} from 'react-native';

export namespace ScrollableSectionListNs {
  export type Ref = SectionList<unknown, unknown>;
  export type Props<ItemT, SectionT> = SectionListProps<ItemT, SectionT>;
  export type RenderItem<ItemT, SectionT> = SectionListRenderItem<
    ItemT,
    SectionT
  >;
  export type Section<ItemT> = SectionListData<ItemT>;
}
