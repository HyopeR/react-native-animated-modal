import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {KeyboardAvoidingView} from 'react-native-keyboard-controller';
import {Modal} from 'react-native-animated-modal';
import {Screen} from '../../commons/Screen';
import {Button} from '../../commons/Button';
import {ModalStyle, PageStyle} from '../styles';
import {PageProps} from '../types';

export const TextInputPage = ({back}: PageProps) => {
  const [visible, setVisible] = useState(false);

  const [text, setText] = useState('');

  return (
    <Screen scrollable={true}>
      <Screen.Header left={'Back'} leftProps={{onPress: back}}>
        <Screen.Title>TextInput Playground</Screen.Title>
      </Screen.Header>

      <Screen.Content style={PageStyle.root}>
        <View style={PageStyle.body}>
          <Text style={PageStyle.description}>
            Use the Modal and TextInput component to manage keyboard offset
            values.
          </Text>
        </View>

        <Button title="Open" onPress={() => setVisible(true)} />
      </Screen.Content>

      <Modal
        visible={visible}
        supportedOrientations={['portrait', 'landscape']}
        onBackdropPress={() => setVisible(false)}
        onHide={() => setVisible(false)}>
        <KeyboardAvoidingView
          style={styles.avoid}
          behavior={'padding'}
          pointerEvents={'box-none'}>
          <View pointerEvents={'box-none'} style={styles.avoidContainer}>
            <View style={ModalStyle.root}>
              <View style={ModalStyle.body}>
                <Text style={ModalStyle.title}>TextInput Example</Text>
                <Text style={ModalStyle.description}>
                  Focus on TextInput and type something. It will move in sync
                  with the Modal Keyboard.
                </Text>

                <TextInput
                  value={text}
                  onChangeText={setText}
                  placeholder={'Enter Text'}
                  style={styles.input}
                />
              </View>

              <View style={ModalStyle.footer}>
                <Button title="Close" onPress={() => setVisible(false)} />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  avoid: {
    flex: 1,
  },
  avoidContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 44,
    paddingHorizontal: 8,
    backgroundColor: '#ECECEC',
  },
});
