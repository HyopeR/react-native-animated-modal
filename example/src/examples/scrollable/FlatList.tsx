import React, {useMemo, useRef} from 'react';
import {Text, useWindowDimensions, View} from 'react-native';
import {
  Modal,
  Scrollable,
  ScrollableFlatList,
  ScrollableFlatListNs,
} from 'react-native-animated-modal';
import {Button} from '../../commons/Button';
import {styles} from '../styles';
import {ModalExampleProps} from '../types';

export const FlatListModal = ({visible, setVisible}: ModalExampleProps) => {
  const ref = useRef<ScrollableFlatListNs.Ref>(null);

  const {width, height} = useWindowDimensions();

  const landscape = useMemo(() => width > height, [width, height]);

  return (
    <Modal
      visible={visible}
      supportedOrientations={['portrait', 'landscape']}
      onHide={() => setVisible(false)}
      onSwipeComplete={() => setVisible(false)}
      animation={{type: 'slide', direction: {start: 'up', end: 'down'}}}
      swipe={{enabled: true, directions: ['up', 'down', 'left', 'right']}}>
      <View
        style={{
          ...styles.container,
          height: landscape ? height * 0.85 : height * 0.55,
        }}>
        <Text style={styles.title}>FlatList Example</Text>

        <Scrollable
          // Determine the orientation of the list.
          orientation={'vertical'}
          // Determine whether the list should be reversed.
          inverted={false}
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
                data={Array.from({length: 20}, (_, i) => i + 1)}
                keyExtractor={item => item.toString()}
                renderItem={({item}) => (
                  <View style={styles.item}>
                    <Text style={styles.itemText}>Item: {item}</Text>
                  </View>
                )}
              />
            );
          }}
        </Scrollable>

        <View style={styles.action}>
          <Button title="Close" onPress={() => setVisible(false)} />
        </View>
      </View>
    </Modal>
  );
};
