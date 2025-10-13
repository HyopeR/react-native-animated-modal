import React, {useState} from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {Screen} from './commons/Screen';
import {List, ListSection} from './List';

// Examples
import {BasicModal} from './examples/Basic';
import {SwipeModal} from './examples/Swipe';
import {ListModal} from './examples/List';

export const Main = () => {
  const [visibleBasic, setVisibleBasic] = useState(false);
  const [visibleSwipe, setVisibleSwipe] = useState(false);
  const [visibleList, setVisibleList] = useState(false);

  const sections: ListSection[] = [
    {
      title: 'Animations',
      data: [
        {title: 'Basic', onPress: setVisibleBasic},
        {title: 'Swipe', onPress: setVisibleSwipe},
        {title: 'List', onPress: setVisibleList},
      ],
    },
  ];

  return (
    <Screen style={styles.screen}>
      <Screen.Header height={80}>
        <StatusBar barStyle={'dark-content'} translucent={true} />
        <Screen.Title>React Native Animated Modal</Screen.Title>
        <Screen.Subtitle>Examples</Screen.Subtitle>
      </Screen.Header>

      <Screen.Content>
        <List sections={sections} />

        <BasicModal visible={visibleBasic} setVisible={setVisibleBasic} />
        <SwipeModal visible={visibleSwipe} setVisible={setVisibleSwipe} />
        <ListModal visible={visibleList} setVisible={setVisibleList} />
      </Screen.Content>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
  },
});
