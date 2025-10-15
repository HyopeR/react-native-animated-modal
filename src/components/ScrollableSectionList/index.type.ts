import React from 'react';
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
  export type RenderSection<ItemT, SectionT> = (info: {
    section: SectionListData<ItemT, SectionT>;
  }) => React.ReactElement | null;
}
