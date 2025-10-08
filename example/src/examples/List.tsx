import React, {useRef} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Modal, Scrollable, ScrollableRef} from 'react-native-animated-modal';
import {Button} from '../commons/Button';
import {styles} from './styles';
import {ModalExampleProps} from './types';

export const ListModal = ({visible, setVisible}: ModalExampleProps) => {
  const scroll = useRef<ScrollableRef>(null);

  return (
    <Modal
      visible={visible}
      onHide={() => setVisible(false)}
      onSwipeComplete={() => setVisible(false)}
      onBackPress={() => setVisible(false)}
      onBackdropPress={() => setVisible(false)}
      animation={{type: 'slide', direction: {start: 'up', end: 'down'}}}
      supportedOrientations={['portrait', 'landscape']}
      swipe={{enabled: true, directions: ['up', 'down', 'left', 'right']}}>
      <View style={{...styles.container, height: 500}}>
        <Scrollable ref={scroll} orientation={'vertical'}>
          <FlatList
            scrollEventThrottle={16}
            onLayout={e => scroll.current?.onLayout?.(e)}
            onContentSizeChange={(w, h) =>
              scroll.current?.onContentSizeChange?.(w, h)
            }
            onScroll={e => scroll.current?.onScroll?.(e)}
            data={Array.from({length: 20}, (_, i) => i + 1)}
            keyExtractor={item => item.toString()}
            renderItem={({item}) => (
              <View style={itemStyles.item}>
                <Text style={itemStyles.text}>Item: {item}</Text>
              </View>
            )}
          />
        </Scrollable>

        <Text style={styles.title}>List Example</Text>
        <Text style={styles.description}>
          Swipeable modal usage example. Can use gestures for show/hide. Try
          scrolling up, down, right, and left.
        </Text>

        <View style={styles.action}>
          <Button title="Close" onPress={() => setVisible(false)} />
        </View>
      </View>
    </Modal>
  );
};

const itemStyles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});
