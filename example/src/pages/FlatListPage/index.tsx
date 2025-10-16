import React, {useMemo, useRef, useState} from 'react';
import {Text, useWindowDimensions, View} from 'react-native';
import {
  Modal,
  Scrollable,
  ScrollableFlatList,
  ScrollableFlatListNs,
  ScrollableNs,
  SwipeNs,
} from '@hyoper/rn-animated-modal';
import {Screen} from '../../commons/Screen';
import {Button} from '../../commons/Button';
import {ModalStyle, PageStyle, ListStyle} from '../styles';
import {PageProps} from '../types';
import {Configuration} from './Configuration';

export const FlatListPage = ({back}: PageProps) => {
  const [visible, setVisible] = useState(false);

  const [orientation, setOrientation] =
    useState<ScrollableNs.Orientation>('vertical');
  const [inverted, setInverted] = useState(false);
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
  const ref = useRef<ScrollableFlatListNs.Ref>(null);

  return (
    <Screen scrollable={true}>
      <Screen.Header left={'Back'} leftProps={{onPress: back}}>
        <Screen.Title>FlatList Playground</Screen.Title>
      </Screen.Header>

      <Screen.Content style={PageStyle.root}>
        <View style={PageStyle.body}>
          <Text style={PageStyle.description}>
            Modal and Scrollable components share gestures. You can customize
            Scrollable components. Play with the values.
          </Text>

          <Configuration
            orientation={orientation}
            inverted={inverted}
            directions={directions}
            onChangeOrientation={setOrientation}
            onChangeInverted={setInverted}
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
            <Text style={ModalStyle.title}>FlatList Example</Text>
            {!landscape && (
              <Text style={ModalStyle.description}>
                Drag the list to the end or grab and drag from the empty areas
                of the modal.
              </Text>
            )}

            <Scrollable
              // Determine the orientation of the list.
              orientation={orientation}
              // Determine whether the list should be reversed.
              inverted={inverted}
              // Listen to the list's callbacks.
              onScroll={() => {}}
              onBeginDrag={() => {}}
              onEndDrag={() => {}}
              onMomentumBegin={() => {}}
              onMomentumEnd={() => {}}>
              {options => {
                return (
                  <ScrollableFlatList
                    ref={ref}
                    {...options}
                    // // If you need onLayout you can use it like this.
                    // onLayout={e => {
                    //   options.onLayout(e);
                    // }}
                    // // If you need onContentSizeChange you can use it like this.
                    // onContentSizeChange={(w, h) => {
                    //   options.onContentSizeChange(w, h);
                    // }}
                    data={Array.from({length: 20}, (_, i) => i + 1)}
                    keyExtractor={item => item.toString()}
                    renderItem={({item}) => (
                      <View style={ListStyle.item}>
                        <Text style={ListStyle.itemText}>Item: {item}</Text>
                      </View>
                    )}
                  />
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
