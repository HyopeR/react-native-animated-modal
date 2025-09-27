import React from 'react';
import {Text, View} from 'react-native';
import {Modal} from 'react-native-animated-modal';
import {Button} from '../commons/Button';
import {styles} from './styles';
import {ModalExampleProps} from './types';

export const SwipeModal = ({visible, setVisible}: ModalExampleProps) => {
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
      <View style={styles.container}>
        <Text style={styles.title}>Swipe Example</Text>
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
