import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {AnimationNs, Modal} from 'react-native-animated-modal';
import {Screen} from '../../commons/Screen';
import {Button} from '../../commons/Button';
import {ModalStyle, PageStyle} from '../styles';
import {PageProps} from '../types';
import {Configuration} from './Configuration';

export const AnimationPage = ({back}: PageProps) => {
  const [visible, setVisible] = useState(false);

  const [type, setType] = useState<AnimationNs.Animation>('fade');
  const [duration, setDuration] = useState<number>(300);
  const [direction, setDirection] = useState<AnimationNs.DirectionExtend>({
    start: 'up',
    end: 'down',
  });

  const decreaseDuration = () => {
    setDuration(prev => {
      if (prev > 0) return prev - 100;
      else return prev;
    });
  };

  const increaseDuration = () => {
    setDuration(prev => {
      if (prev < 2000) return prev + 100;
      else return prev;
    });
  };

  const changeDirection = (
    position: keyof AnimationNs.DirectionExtend,
    newDirection: AnimationNs.Direction,
  ) => {
    setDirection(prev => ({...prev, [position]: newDirection}));
  };

  return (
    <Screen scrollable={true}>
      <Screen.Header left={'Back'} leftProps={{onPress: back}}>
        <Screen.Title>Animation Playground</Screen.Title>
      </Screen.Header>

      <Screen.Content style={PageStyle.root}>
        <View style={PageStyle.body}>
          <Text style={PageStyle.description}>
            You can make adjustments to customize modal's entry and exit
            animations. Play with the values.
          </Text>

          <Configuration
            type={type}
            duration={duration}
            direction={direction}
            onChangeType={setType}
            onDecrease={decreaseDuration}
            onIncrease={increaseDuration}
            onChangeDirection={changeDirection}
          />
        </View>

        <Button title="Open" onPress={() => setVisible(true)} />
      </Screen.Content>

      <Modal
        visible={visible}
        supportedOrientations={['portrait', 'landscape']}
        // Use to customize animation values.
        animation={{
          type: type as never,
          duration: duration,
          direction: direction as never,
        }}
        // Triggered when when the Android back key is pressed.
        onBackPress={() => setVisible(false)}
        // Triggered when the modal is opened.
        onShow={() => {}}
        // Triggered when the modal is closed.
        onHide={() => setVisible(false)}>
        <View style={ModalStyle.root}>
          <View style={ModalStyle.body}>
            <Text style={ModalStyle.title}>Animation Example</Text>
            <Text style={ModalStyle.description}>
              In this example, you are displaying a simple modal and
              customizable animations.
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
