import React from 'react';
import {Text, View} from 'react-native';
import {Modal} from 'react-native-animated-modal';
import {Button} from '../../commons/Button';
import {styles} from '../styles';
import {ModalExampleProps} from '../types';

export const SlideSwipeModal = ({visible, setVisible}: ModalExampleProps) => {
  return (
    <Modal
      visible={visible}
      animation={{type: 'slide', direction: {start: 'up', end: 'down'}}}
      swipe={{enabled: true, directions: ['up', 'down', 'left', 'right']}}
      onHide={() => setVisible(false)}
      onSwipeComplete={() => setVisible(false)}
      supportedOrientations={['portrait', 'landscape']}>
      <View style={styles.container}>
        <Text style={styles.title}>Slide Example</Text>
        <Text style={styles.description}>
          Enter/exit animations are run with the modal slide effect.
        </Text>

        <View style={styles.action}>
          <Button title="Close" onPress={() => setVisible(false)} />
        </View>
      </View>
    </Modal>
  );
};
