import React from 'react';
import {
  SectionList,
  SectionListProps,
  SectionListRenderItem,
  SectionListData,
} from 'react-native';

export namespace ScrollableSectionListNs {
  /**
   * SectionList reference type.
   */
  export type Ref = SectionList<unknown, unknown>;
  /**
   * SectionList props type.
   */
  export type Props<ItemT, SectionT> = SectionListProps<ItemT, SectionT>;
  /**
   * SectionList RenderItem type.
   */
  export type RenderItem<ItemT, SectionT> = SectionListRenderItem<
    ItemT,
    SectionT
  >;
  /**
   * SectionList RenderSection type.
   */
  export type RenderSection<ItemT, SectionT> = (info: {
    section: SectionListData<ItemT, SectionT>;
  }) => React.ReactElement | null;
}
