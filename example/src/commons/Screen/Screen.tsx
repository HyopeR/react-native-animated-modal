import React from 'react';
import {View, ViewProps, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HeaderProps} from './Header';

export type ScreenProps = {
  header?: HeaderProps;
} & ViewProps;

export const Screen = ({style, children}: ScreenProps) => {
  const insets = useSafeAreaInsets();
  const insetsPadding = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  return (
    <View style={StyleSheet.flatten([styles.root, style, insetsPadding])}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
});
