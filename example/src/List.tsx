import React, {useCallback} from 'react';
import {
  ListRenderItem,
  SectionList,
  SectionListData,
  SectionListProps,
  Text,
  View,
} from 'react-native';
import {Card} from './commons/Card';

export type ListItem = {
  title: string;
  onPress: React.Dispatch<React.SetStateAction<boolean>>;
};
export type ListSection = {
  title: string;
  data: ListItem[];
};
export type ListProps = SectionListProps<ListItem, ListSection>;
type ListRender = ListRenderItem<ListItem>;
type ListRenderSection = (info: {
  section: SectionListData<ListItem, ListSection>;
}) => React.ReactElement;

export const List = ({sections, ...props}: ListProps) => {
  const renderSectionHeader = useCallback<ListRenderSection>(({section}) => {
    const {title} = section;
    return (
      <View style={{flex: 1, height: 40, backgroundColor: '#EFEFEF', alignItems: 'center', justifyContent: 'center'}}>
        <Text>{title}</Text>
      </View>
    );
  }, []);

  const renderItem = useCallback<ListRender>(({item}) => {
    const {title, onPress} = item;
    return (
      <View style={{flex: 1}}>
        <Card title={title} onPress={() => onPress(true)} />
      </View>
    );
  }, []);

  const keyExtractor = useCallback((item: ListItem, index: number) => {
    return `example-${index}`;
  }, []);

  return (
    <SectionList
      sections={sections}
      stickySectionHeadersEnabled={false}
      renderSectionHeader={renderSectionHeader}
      SectionSeparatorComponent={() => <View style={{height: 4}} />}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={{height: 4}} />}
      keyExtractor={keyExtractor}
      {...props}
    />
  );
};
