import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Modal} from '@hyoper/rn-animated-modal';
import {Screen} from '../../commons/Screen';
import {Button} from '../../commons/Button';
import {ModalStyle, PageStyle} from '../styles';
import {PageProps} from '../types';
import {Configuration} from './Configuration';

export const BackdropPage = ({back}: PageProps) => {
  const [visible, setVisible] = useState(false);

  const [enabled, setEnabled] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState('black');
  const [opacity, setOpacity] = useState(0.6);

  const decreaseOpacity = () => {
    setOpacity(prev => {
      if (prev > 0) return Number((prev - 0.1).toFixed(1));
      else return prev;
    });
  };

  const increaseOpacity = () => {
    setOpacity(prev => {
      if (prev < 1) return Number((prev + 0.1).toFixed(1));
      else return prev;
    });
  };

  return (
    <Screen scrollable={true}>
      <Screen.Header left={'Back'} leftProps={{onPress: back}}>
        <Screen.Title>Backdrop Playground</Screen.Title>
      </Screen.Header>

      <Screen.Content style={PageStyle.root}>
        <View style={PageStyle.body}>
          <Text style={PageStyle.description}>
            You can customize the modal's backdrop appearance. Play with the
            values.
          </Text>

          <Configuration
            enabled={enabled}
            backgroundColor={backgroundColor}
            opacity={opacity}
            onChangeEnabled={setEnabled}
            onChangeBackgroundColor={setBackgroundColor}
            onDecrease={decreaseOpacity}
            onIncrease={increaseOpacity}
          />
        </View>

        <Button title="Open" onPress={() => setVisible(true)} />
      </Screen.Content>

      <Modal
        visible={visible}
        supportedOrientations={['portrait', 'landscape']}
        // Use it to customize the backdrop.
        backdrop={{
          enabled: enabled,
          backgroundColor: backgroundColor,
          opacity: opacity,
        }}
        // Triggered when the Backdrop is pressed.
        onBackdropPress={() => setVisible(false)}
        onHide={() => setVisible(false)}>
        <View style={ModalStyle.root}>
          <View style={ModalStyle.body}>
            <Text style={ModalStyle.title}>Backdrop Example</Text>
            <Text style={ModalStyle.description}>
              In this example, you're displaying a simple modal and customizable
              backdrop.
            </Text>
          </View>

          <View style={ModalStyle.footer}>
            <Button title="Close" onPress={() => setVisible(false)} />
          </View>
        </View>
      </Modal>
    </Screen>
  );
};
