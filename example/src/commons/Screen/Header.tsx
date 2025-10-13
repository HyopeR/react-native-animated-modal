import React, {ReactNode} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
} from 'react-native';

export type HeaderProps = {
  height?: number;
  left?: string;
  leftProps?: TouchableOpacityProps;
  right?: string;
  rightProps?: TouchableOpacityProps;
  children?: ReactNode;
  style?: ViewProps;
};

export const Header = ({
  height = 50,
  left = '',
  leftProps,
  right = '',
  rightProps,
  style,
  children,
}: HeaderProps) => {
  const {style: leftStyle, ...omitLeftProps} = leftProps || {};
  const {style: rightStyle, ...omitRightProps} = rightProps || {};

  return (
    <View style={StyleSheet.flatten([styles.root, {height}, style])}>
      {(left || right) && (
        <TouchableOpacity
          style={StyleSheet.flatten([styles.side, styles.sideLeft, leftStyle])}
          {...omitLeftProps}>
          <Text>{left}</Text>
        </TouchableOpacity>
      )}

      <View style={styles.content}>{children}</View>

      {(left || right) && (
        <TouchableOpacity
          style={StyleSheet.flatten([
            styles.side,
            styles.sideRight,
            rightStyle,
          ])}
          {...omitRightProps}>
          <Text>{right}</Text>
        </TouchableOpacity>
      )}
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
