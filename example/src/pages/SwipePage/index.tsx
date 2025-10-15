import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Modal, SwipeNs} from 'react-native-animated-modal';
import {Screen} from '../../commons/Screen';
import {Button} from '../../commons/Button';
import {ModalStyle, PageStyle} from '../styles';
import {PageProps} from '../types';
import {Configuration} from './Configuration';

export const SwipePage = ({back}: PageProps) => {
  const [visible, setVisible] = useState(false);

  const [enabled, setEnabled] = useState(true);
  const [directions, setDirections] = useState<SwipeNs.Direction[]>([
    'up',
    'down',
    'left',
    'right',
  ]);
  const [distance, setDistance] = useState(150);
  const [velocity, setVelocity] = useState(800);
  const [closeable, setCloseable] = useState(true);

  const changeDirection = (newDirection: SwipeNs.Direction) => {
    setDirections(prev => {
      const include = prev.includes(newDirection);
      if (include) return prev.filter(p => p !== newDirection);
      else return [...prev, newDirection];
    });
  };

  const decreaseDistance = () => {
    setDistance(prev => {
      if (prev > 0) return prev - 50;
      else return prev;
    });
  };

  const increaseDistance = () => {
    setDistance(prev => {
      if (prev < 400) return prev + 50;
      else return prev;
    });
  };

  const decreaseVelocity = () => {
    setVelocity(prev => {
      if (prev > 0) return prev - 50;
      else return prev;
    });
  };

  const increaseVelocity = () => {
    setVelocity(prev => {
      if (prev < 1600) return prev + 50;
      else return prev;
    });
  };

  return (
    <Screen scrollable={true}>
      <Screen.Header left={'Back'} leftProps={{onPress: back}}>
        <Screen.Title>Swipe Playground</Screen.Title>
      </Screen.Header>

      <Screen.Content style={PageStyle.root}>
        <View style={PageStyle.body}>
          <Text style={PageStyle.description}>
            You can customize modal's draggable animations Play with the values.
          </Text>

          <Configuration
            enabled={enabled}
            directions={directions}
            distance={distance}
            velocity={velocity}
            closable={closeable}
            onChangeEnabled={setEnabled}
            onChangeDirection={changeDirection}
            onDecreaseDistance={decreaseDistance}
            onIncreaseDistance={increaseDistance}
            onDecreaseVelocity={decreaseVelocity}
            onIncreaseVelocity={increaseVelocity}
            onChangeCloseable={setCloseable}
          />
        </View>

        <Button title="Open" onPress={() => setVisible(true)} />
      </Screen.Content>

      <Modal
        visible={visible}
        supportedOrientations={['portrait', 'landscape']}
        // Use to customize swipe behavior.
        swipe={{
          enabled: enabled,
          directions: directions,
          distance: distance,
          velocity: velocity,
          closable: closeable,
        }}
        // Triggered when the swipe is completed successfully.
        onSwipeComplete={() => setVisible(false)}
        // Triggered when the swipe is canceled.
        onSwipeCancel={() => {}}
        onHide={() => setVisible(false)}>
        <View style={ModalStyle.root}>
          <View style={ModalStyle.body}>
            <Text style={ModalStyle.title}>Swipe Example</Text>
            <Text style={ModalStyle.description}>
              In this example, you're displaying a draggable modal and
              customizable drag gestures.
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
