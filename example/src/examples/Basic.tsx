import React from 'react';
import {Text, View} from 'react-native';
import {Modal} from 'react-native-animated-modal';
import {Button} from '../commons/Button';
import {styles} from './styles';
import {ModalExampleProps} from './types';

export const BasicModal = ({visible, setVisible}: ModalExampleProps) => {
  return (
    <Modal visible={visible} animation={{type: 'scale'}} onHide={() => setVisible(false)}>
      <View style={styles.container}>
        <Text style={styles.title}>Basic Example</Text>
        <Text style={styles.description}>
          Simple modal usage example. Can only use buttons for show/hide.
        </Text>

        <View style={styles.action}>
          <Button title="Close" onPress={() => setVisible(false)} />
        </View>
      </View>
    </Modal>
  );
};
