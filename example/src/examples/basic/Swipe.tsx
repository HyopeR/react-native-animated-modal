import React from 'react';
import {Text, View} from 'react-native';
import {Modal} from 'react-native-animated-modal';
import {Button} from '../../commons/Button';
import {styles} from '../styles';
import {ModalExampleProps} from '../types';

export const SwipeModal = ({visible, setVisible}: ModalExampleProps) => {
  return (
    <Modal
      visible={visible}
      supportedOrientations={['portrait', 'landscape']}
      animation={{type: 'slide', direction: {start: 'up', end: 'down'}}}
      swipe={{enabled: true, directions: ['up', 'down', 'left', 'right']}}
      onHide={() => setVisible(false)}
      onSwipeComplete={() => setVisible(false)}>
      <View style={styles.container}>
        <Text style={styles.title}>Swipe Example</Text>
        <Text style={styles.description}>
          This is an example of a draggable modal. You can close this modal by
          dragging it in any direction.
        </Text>

        <View style={styles.action}>
          <Button title="Close" onPress={() => setVisible(false)} />
        </View>
      </View>
    </Modal>
  );
};
