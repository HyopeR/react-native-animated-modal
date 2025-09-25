import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Screen} from './commons/Screen';
import {Card} from './commons/Card';

// Examples
import {BasicModal} from './examples/Basic';
import {SwipeModal} from './examples/Swipe';

export const Main = () => {
  const [visibleBasic, setVisibleBasic] = useState(false);
  const [visibleSwipe, setVisibleSwipe] = useState(false);

  return (
    <Screen style={styles.screen}>
      <Screen.Header title={'Examples'} titleProps={{style: styles.title}} />
      <Screen.Content>
        <View style={styles.root}>
          <Card
            title={'Basic'}
            onPress={() => setVisibleBasic(true)}
            style={styles.column}
          />
          <Card
            title={'Swipe'}
            onPress={() => setVisibleSwipe(true)}
            style={styles.column}
          />
        </View>

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
  root: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 10,
    padding: 10,
  },
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
