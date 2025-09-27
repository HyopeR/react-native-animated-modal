import React, {useCallback, useMemo, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  ListRenderItem,
  View,
  useWindowDimensions,
} from 'react-native';
import {Screen} from './commons/Screen';
import {Card} from './commons/Card';

// Examples
import {BasicModal} from './examples/Basic';
import {SwipeModal} from './examples/Swipe';

type Item = {
  title: string;
  onPress: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Main = () => {
  const {width, height} = useWindowDimensions();
  const orientation = useMemo(() => {
    return width < height ? 'portrait' : 'landscape';
  }, [height, width]);

  const [visibleBasic, setVisibleBasic] = useState(false);
  const [visibleSwipe, setVisibleSwipe] = useState(false);

  const items: Item[] = [
    {title: 'Basic', onPress: setVisibleBasic},
    {title: 'Swipe', onPress: setVisibleSwipe},
  ];

  const renderItem = useCallback<ListRenderItem<Item>>(
    ({item}) => {
      const {title, onPress} = item;
      const flex = orientation === 'portrait' ? 1 / 2 : 1 / 5;
      return (
        <View style={{flex}}>
          <Card title={title} onPress={() => onPress(true)} />
        </View>
      );
    },
    [orientation],
  );

  const keyExtractor = useCallback((item: Item, index: number) => {
    return `example-${index}`;
  }, []);

  return (
    <Screen style={styles.screen}>
      <Screen.Header title={'Examples'} titleProps={{style: styles.title}} />
      <Screen.Content>
        <FlatList
          key={orientation}
          data={items}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={orientation === 'portrait' ? 2 : 5}
        />

        <BasicModal visible={visibleBasic} setVisible={setVisibleBasic} />
        <SwipeModal visible={visibleSwipe} setVisible={setVisibleSwipe} />
      </Screen.Content>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    textAlign: 'center',
  },
});
