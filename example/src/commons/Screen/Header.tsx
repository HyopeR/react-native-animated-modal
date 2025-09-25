import React from 'react';
import {
  StyleSheet,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
} from 'react-native';

export type HeaderProps = {
  title: string;
  titleProps?: TextProps;
  left?: string;
  leftProps?: TouchableOpacityProps;
  right?: string;
  rightProps?: TouchableOpacityProps;
  style?: ViewProps;
};

export const Header = ({
  title,
  titleProps,
  left = '',
  leftProps,
  right = '',
  rightProps,
  style,
}: HeaderProps) => {
  const {style: leftStyle, ...omitLeftProps} = leftProps || {};
  const {style: rightStyle, ...omitRightProps} = rightProps || {};

  return (
    <View style={StyleSheet.flatten([styles.root, style])}>
      <TouchableOpacity
        style={StyleSheet.flatten([styles.side, styles.sideLeft, leftStyle])}
        {...omitLeftProps}>
        <Text>{left}</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text {...titleProps}>{title}</Text>
      </View>

      <TouchableOpacity
        style={StyleSheet.flatten([styles.side, styles.sideRight, rightStyle])}
        {...omitRightProps}>
        <Text>{right}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    height: 50,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  side: {
    width: 60,
    justifyContent: 'center',
  },
  sideLeft: {
    alignItems: 'flex-start',
  },
  sideRight: {
    alignItems: 'flex-end',
  },
});
