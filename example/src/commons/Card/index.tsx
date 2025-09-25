import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

export type CardProps = {
  title: string;
} & TouchableOpacityProps;

export const Card = ({title, style, ...props}: CardProps) => {
  return (
    <TouchableOpacity
      style={[StyleSheet.flatten([styles.root, style])]}
      {...props}>
      <View style={styles.container}>
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 100,
    height: 100,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#EEE',
    borderRadius: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
