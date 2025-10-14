import React from 'react';
import {Text, View} from 'react-native';
import {Modal} from 'react-native-animated-modal';
import {Button} from '../../commons/Button';
import {styles} from '../styles';
import {ModalExampleProps} from '../types';

export const SlideModal = ({visible, setVisible}: ModalExampleProps) => {
  return (
    <Modal
      visible={visible}
      supportedOrientations={['portrait', 'landscape']}
      animation={{type: 'slide', direction: {start: 'up', end: 'down'}}}
      onHide={() => setVisible(false)}>
      <View style={styles.container}>
        <Text style={styles.title}>Slide Example</Text>
        <Text style={styles.description}>
          This is an example of a basic modal. The slide effect is used for
          enter and exit animations.
        </Text>

        <View style={styles.action}>
          <Button title="Close" onPress={() => setVisible(false)} />
        </View>
      </View>
    </Modal>
  );
};
