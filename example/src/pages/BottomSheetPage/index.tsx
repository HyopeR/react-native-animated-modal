import React, {useMemo, useState} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  Modal,
  Scrollable,
  ScrollableFlatList,
} from 'react-native-animated-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Screen} from '../../commons/Screen';
import {Button} from '../../commons/Button';
import {ListStyle, ModalStyle, PageStyle} from '../styles';
import {PageProps} from '../types';

export const BottomSheetPage = ({back}: PageProps) => {
  const [visible, setVisible] = useState(false);

  const {width, height} = useWindowDimensions();

  const landscape = useMemo(() => width > height, [width, height]);

  const insets = useSafeAreaInsets();
  const insetBottom = landscape
    ? insets.bottom
    : Platform.select({android: insets.bottom || 48, default: insets.bottom});

  return (
    <Screen scrollable={true}>
      <Screen.Header left={'Back'} leftProps={{onPress: back}}>
        <Screen.Title>BottomSheet Playground</Screen.Title>
      </Screen.Header>

      <Screen.Content style={PageStyle.root}>
        <View style={PageStyle.body}>
          <Text style={PageStyle.description}>
            You can use Modal as a view like BottomSheet. You can combine it
            with scrollable components.
          </Text>
        </View>

        <Button title="Open" onPress={() => setVisible(true)} />
      </Screen.Content>

      <Modal
        visible={visible}
        supportedOrientations={['portrait', 'landscape']}
        animation={{type: 'slide', direction: {start: 'up', end: 'down'}}}
        swipe={{enabled: true, directions: ['down']}}
        style={{justifyContent: 'flex-end'}}
        onSwipeComplete={() => setVisible(false)}
        onSwipeCancel={() => {}}
        onBackdropPress={() => setVisible(false)}
        onHide={() => setVisible(false)}>
        <View
          style={{
            ...ModalStyle.root,
            width: landscape ? width * 0.8 : width,
            height: landscape ? height * 0.9 : height * 0.6,
            borderRadius: 0,
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
          }}>
          <View style={styles.handle} />
          <View style={ModalStyle.body}>
            <Text style={ModalStyle.title}>BottomSheet Example</Text>
            <Text style={ModalStyle.description}>
              You can close the BottomSheet or List by dragging it down.
            </Text>

            <Scrollable>
              {options => {
                return (
                  <ScrollableFlatList
                    {...options}
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

          <View style={{...ModalStyle.footer, paddingBottom: insetBottom}}>
            <Button title="Close" onPress={() => setVisible(false)} />
          </View>
        </View>
      </Modal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  handle: {
    height: 3,
    width: 80,
    backgroundColor: '#CCC',
    alignSelf: 'center',
    marginBottom: 8,
    borderRadius: 1.5,
  },
});
