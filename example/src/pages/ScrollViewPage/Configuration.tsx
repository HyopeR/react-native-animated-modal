import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScrollableNs, SwipeNs} from 'react-native-animated-modal';
import {ConfigStyle as styles} from '../styles';

export type Configuration = {
  orientation: ScrollableNs.Orientation;
  directions: SwipeNs.Direction[];
  onChangeOrientation: (value: ScrollableNs.Orientation) => void;
  onChangeDirection: (value: SwipeNs.Direction) => void;
};

export const Configuration = ({
  orientation,
  directions,
  onChangeOrientation,
  onChangeDirection,
}: Configuration) => {
  const state = {
    vertical: orientation === 'vertical',
    horizontal: orientation === 'horizontal',
  };

  const stateSwipe: Record<SwipeNs.Direction, boolean> = {
    up: directions.includes('up'),
    down: directions.includes('down'),
    left: directions.includes('left'),
    right: directions.includes('right'),
  };

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.labelText}>Orientation</Text>
        </View>

        <View style={styles.columnRow}>
          <TouchableOpacity
            style={[styles.item, state.vertical && styles.itemActive]}
            onPress={() => onChangeOrientation('vertical')}>
            <Text style={styles.itemText}>Vertical</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.item, state.horizontal && styles.itemActive]}
            onPress={() => onChangeOrientation('horizontal')}>
            <Text style={styles.itemText}>Horizontal</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.labelText}>Directions</Text>
        </View>

        <View style={styles.columnRow}>
          <TouchableOpacity
            style={[styles.item, stateSwipe.up && styles.itemActive]}
            onPress={() => onChangeDirection('up')}>
            <Text style={styles.itemText}>Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.item, stateSwipe.down && styles.itemActive]}
            onPress={() => onChangeDirection('down')}>
            <Text style={styles.itemText}>Down</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.item, stateSwipe.left && styles.itemActive]}
            onPress={() => onChangeDirection('left')}>
            <Text style={styles.itemText}>Left</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.item, stateSwipe.right && styles.itemActive]}
            onPress={() => onChangeDirection('right')}>
            <Text style={styles.itemText}>Right</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
