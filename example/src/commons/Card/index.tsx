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
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderColor: '#EFEFEF',
    borderWidth: 2,
    margin: 8,
    paddingVertical: 50,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
