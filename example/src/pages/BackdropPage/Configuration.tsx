import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ConfigStyle as styles} from '../styles';

export type Configuration = {
  enabled: boolean;
  backgroundColor: string;
  opacity: number;
  onChangeEnabled: (value: boolean) => void;
  onChangeBackgroundColor: (value: string) => void;
  onDecrease: () => void;
  onIncrease: () => void;
};

export const Configuration = ({
  enabled,
  backgroundColor,
  opacity,
  onChangeEnabled,
  onChangeBackgroundColor,
  onIncrease,
  onDecrease,
}: Configuration) => {
  const color = {
    black: backgroundColor === 'black',
    red: backgroundColor === 'red',
    blue: backgroundColor === 'blue',
  };

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.labelText}>Enable</Text>
        </View>

        <View style={styles.columnRow}>
          <TouchableOpacity
            style={[styles.item, enabled && styles.itemActive]}
            onPress={() => onChangeEnabled(true)}>
            <Text style={styles.itemText}>Enable</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.item, !enabled && styles.itemActive]}
            onPress={() => onChangeEnabled(false)}>
            <Text style={styles.itemText}>Disable</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.labelText}>Color</Text>
        </View>

        <View style={styles.columnRow}>
          <TouchableOpacity
            style={[styles.item, color.black && styles.itemActive]}
            onPress={() => onChangeBackgroundColor('black')}>
            <Text style={{...styles.itemText, color: 'black'}}>Black</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.item, color.red && styles.itemActive]}
            onPress={() => onChangeBackgroundColor('red')}>
            <Text style={{...styles.itemText, color: 'red'}}>Red</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.item, color.blue && styles.itemActive]}
            onPress={() => onChangeBackgroundColor('blue')}>
            <Text style={{...styles.itemText, color: 'blue'}}>Blue</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.labelText}>Opacity</Text>
        </View>

        <View style={styles.columnRow}>
          <TouchableOpacity style={styles.item} onPress={onDecrease}>
            <Text style={styles.itemText}>-</Text>
          </TouchableOpacity>

          <View style={styles.item}>
            <Text style={styles.itemText}>{`${opacity}`}</Text>
          </View>

          <TouchableOpacity style={styles.item} onPress={onIncrease}>
            <Text style={styles.itemText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
