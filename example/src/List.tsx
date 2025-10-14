import React, {useCallback} from 'react';
import {
  ListRenderItem,
  SectionList,
  SectionListData,
  SectionListProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Card} from './commons/Card';

export type ListItem = {
  title: string;
  onPress: React.Dispatch<React.SetStateAction<boolean>>;
  section: number;
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
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
    );
  }, []);

  const renderItem = useCallback<ListRender>(({item, index}) => {
    const {title, onPress} = item;
    const text = `${index + 1}- ${title}`;
    return (
      <Card title={text} onPress={() => onPress(true)} style={styles.item} />
    );
  }, []);

  const keyExtractor = useCallback((item: ListItem, index: number) => {
    return `example-${item.section}-${index}`;
  }, []);

  return (
    <SectionList
      sections={sections}
      stickySectionHeadersEnabled={false}
      renderSectionHeader={renderSectionHeader}
      SectionSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.container}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
  section: {
    flex: 1,
    height: 40,
    backgroundColor: '#EFEFEF',
    justifyContent: 'center',
    paddingHorizontal: 8,
    marginTop: 8,
  },
  sectionTitle: {
    textTransform: 'capitalize',
    fontSize: 15,
    fontWeight: '500',
  },
  item: {
    flex: 1,
    paddingHorizontal: 8,
  },
  separator: {
    height: 4,
  },
});
