import React, {useMemo, useRef, useState} from 'react';
import {Text, useWindowDimensions, View} from 'react-native';
import {
  Modal,
  Scrollable,
  ScrollableOrientation,
  ScrollableSectionList,
  ScrollableSectionListNs,
  SwipeNs,
} from 'react-native-animated-modal';
import {Screen} from '../../commons/Screen';
import {Button} from '../../commons/Button';
import {ModalStyle, PageStyle, ListStyle} from '../styles';
import {PageProps} from '../types';
import {Configuration} from './Configuration';

export const SectionListPage = ({back}: PageProps) => {
  const [visible, setVisible] = useState(false);

  const [orientation, setOrientation] =
    useState<ScrollableOrientation>('vertical');
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
  const ref = useRef<ScrollableSectionListNs.Ref>(null);

  return (
    <Screen scrollable={true}>
      <Screen.Header left={'Back'} leftProps={{onPress: back}}>
        <Screen.Title>SectionList Playground</Screen.Title>
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
            <Text style={ModalStyle.title}>SectionList Example</Text>
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
                  <ScrollableSectionList
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
                    sections={[
                      {title: 'Basic', data: [1, 2, 3, 4]},
                      {title: 'Advanced', data: [5, 6, 7, 8]},
                      {title: 'Expert', data: [9, 10, 11, 12]},
                    ]}
                    stickySectionHeadersEnabled={false}
                    keyExtractor={item => item.toString()}
                    renderItem={({item}) => (
                      <View style={ListStyle.item}>
                        <Text style={ListStyle.itemText}>Item: {item}</Text>
                      </View>
                    )}
                    renderSectionHeader={({section: {title}}) => (
                      <View style={ListStyle.section}>
                        <Text style={ListStyle.sectionText}>{title}</Text>
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
