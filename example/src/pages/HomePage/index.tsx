import React from 'react';
import {Text, View} from 'react-native';
import {Screen} from '../../commons/Screen';
import {PageStyle} from '../styles';
import {PageProps} from '../types';

export const HomePage = ({children}: PageProps) => {
  return (
    <Screen>
      <Screen.Header>
        <Screen.Title>React Native Animated Modal</Screen.Title>
      </Screen.Header>

      <Screen.Content style={PageStyle.root}>
        <View style={PageStyle.body}>
          <Text style={PageStyle.description}>
            You can use it to create high-performance, animated, and interactive
            modals. You can also try it in landscape mode.
          </Text>

          {children}
        </View>
      </Screen.Content>
    </Screen>
  );
};
