import React from 'react';
import {Text, View} from 'react-native';
import {Modal} from 'react-native-animated-modal';
import {Button} from '../../commons/Button';
import {styles} from '../styles';
import {ModalExampleProps} from '../types';

export const PropertyModal = ({visible, setVisible}: ModalExampleProps) => {
  return (
    <Modal
      visible={visible}
      supportedOrientations={['portrait', 'landscape']}
      animation={{
        type: 'fade',
        duration: 600,
      }}
      backdrop={{
        enabled: true,
        backgroundColor: 'orange',
        opacity: 0.5,
      }}
      swipe={{
        enabled: true,
        directions: ['up', 'down', 'left', 'right'],
        distance: 120,
        velocity: 800,
        closable: false,
      }}
      onShow={() => {
        console.info('onShow trigger.');
      }}
      onHide={() => {
        console.info('onHide trigger.');
        setVisible(false);
      }}
      onBackPress={() => {
        console.info('onBackPress trigger.');
        setVisible(false);
      }}
      onBackdropPress={() => {
        console.info('onBackdropPress trigger.');
        setVisible(false);
      }}
      onSwipeComplete={() => {
        console.info('onSwipeComplete trigger.');
      }}
      onSwipeCancel={() => {
        console.info('onSwipeCancel trigger.');
      }}>
      <View style={styles.container}>
        <Text style={styles.title}>Property Example</Text>
        <Text style={styles.description}>
          You can find all the customized attributes that Modal can take in this
          example.
        </Text>

        <View style={styles.action}>
          <Button title="Close" onPress={() => setVisible(false)} />
        </View>
      </View>
    </Modal>
  );
};
