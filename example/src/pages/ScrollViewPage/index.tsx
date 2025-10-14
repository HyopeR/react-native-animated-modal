import React, {useMemo, useRef, useState} from 'react';
import {Text, useWindowDimensions, View} from 'react-native';
import {
  Modal,
  Scrollable,
  ScrollableOrientation,
  ScrollableView,
  ScrollableViewNs,
  SwipeNs,
} from 'react-native-animated-modal';
import {Screen} from '../../commons/Screen';
import {Button} from '../../commons/Button';
import {ModalStyle, PageStyle} from '../styles';
import {PageProps} from '../types';
import {Configuration} from './Configuration';

export const ScrollViewPage = ({back}: PageProps) => {
  const [visible, setVisible] = useState(false);

  const [orientation, setOrientation] =
    useState<ScrollableOrientation>('vertical');
  const [directions, setDirections] = useState<SwipeNs.Direction[]>([
    'up',
    'down',
    'left',
    'right',
  ]);

  const changeDirection = (newDirection: SwipeNs.Direction) => {
    setDirections(prev => {
      const include = prev.includes(newDirection);
      if (include) return prev.filter(p => p !== newDirection);
      else return [...prev, newDirection];
    });
  };

  const {width, height} = useWindowDimensions();
  const landscape = useMemo(() => width > height, [width, height]);

  // Use it as you would a classic reference.
  const ref = useRef<ScrollableViewNs.Ref>(null);

  return (
    <Screen scrollable={true}>
      <Screen.Header left={'Back'} leftProps={{onPress: back}}>
        <Screen.Title>ScrollView Playground</Screen.Title>
      </Screen.Header>

      <Screen.Content style={PageStyle.root}>
        <View style={PageStyle.body}>
          <Text style={PageStyle.description}>
            Modal and Scrollable components share gestures. You can customize
            Scrollable components. Play with the values.
          </Text>

          <Configuration
            orientation={orientation}
            directions={directions}
            onChangeOrientation={setOrientation}
            onChangeDirection={changeDirection}
          />
        </View>

        <Button title="Open" onPress={() => setVisible(true)} />
      </Screen.Content>

      <Modal
        visible={visible}
        supportedOrientations={['portrait', 'landscape']}
        swipe={{enabled: true, directions: directions}}
        onSwipeComplete={() => setVisible(false)}
        onHide={() => setVisible(false)}>
        <View
          style={{
            ...ModalStyle.root,
            height: landscape ? height * 0.9 : height * 0.55,
          }}>
          <View style={ModalStyle.body}>
            <Text style={ModalStyle.title}>ScrollView Example</Text>
            {!landscape && (
              <Text style={ModalStyle.description}>
                Drag the list to the end or grab and drag from the empty areas
                of the modal.
              </Text>
            )}

            <Scrollable
              // Determine the orientation of the list.
              orientation={orientation}
              // Listen to the list's callbacks.
              onScroll={() => {}}
              onBeginDrag={() => {}}
              onEndDrag={() => {}}
              onMomentumBegin={() => {}}
              onMomentumEnd={() => {}}>
              {options => {
                return (
                  <ScrollableView ref={ref} {...options}>
                    <Text style={{marginBottom: 10}}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Donec non placerat velit. Proin feugiat luctus tellus,
                      vitae vehicula velit ultrices sed. Sed tincidunt nibh at
                      lacus feugiat maximus. In hac habitasse platea dictumst.
                      Maecenas ut tristique metus, et luctus dui. Donec pretium
                      mi varius nisi suscipit, ac ultricies tellus ultrices.
                      Nulla vehicula risus sem, finibus mollis diam laoreet et.
                    </Text>

                    <Text style={{marginBottom: 10}}>
                      Donec tincidunt augue enim, id consequat ligula mattis eu.
                      Donec ut tortor et lacus condimentum blandit. Curabitur
                      quis condimentum erat. Etiam finibus in quam eget
                      pulvinar. Praesent non quam sit amet orci condimentum
                      aliquam et nec ligula. Cras at est tortor. In cursus
                      varius nulla sit amet dictum.
                    </Text>

                    <Text style={{marginBottom: 10}}>
                      Suspendisse hendrerit accumsan dolor, ac efficitur sapien
                      bibendum sit amet. Nam rutrum ultricies fringilla. Fusce
                      tincidunt tempus turpis vel luctus. Orci varius natoque
                      penatibus et magnis dis parturient montes, nascetur
                      ridiculus mus. Morbi sed nisl velit. Sed porta mi in
                      convallis mattis. Donec ullamcorper, nibh quis suscipit
                      viverra, elit velit lobortis dui, sed rutrum diam libero
                      nec ante. Nam sit amet quam in purus volutpat egestas.
                    </Text>
                  </ScrollableView>
                );
              }}
            </Scrollable>
          </View>

          <View style={ModalStyle.footer}>
            <Button title="Close" onPress={() => setVisible(false)} />
          </View>
        </View>
      </Modal>
    </Screen>
  );
};
