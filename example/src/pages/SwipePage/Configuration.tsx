import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SwipeNs} from '@hyoper/rn-animated-modal';
import {ConfigStyle as styles} from '../styles';

export type Configuration = {
  enabled: boolean;
  directions: SwipeNs.Direction[];
  distance: number;
  velocity: number;
  closable: boolean;
  onChangeEnabled: (value: boolean) => void;
  onChangeDirection: (value: SwipeNs.Direction) => void;
  onDecreaseDistance: () => void;
  onIncreaseDistance: () => void;
  onDecreaseVelocity: () => void;
  onIncreaseVelocity: () => void;
  onChangeCloseable: (value: boolean) => void;
};

export const Configuration = ({
  enabled,
  directions,
  distance,
  velocity,
  closable,
  onChangeEnabled,
  onChangeDirection,
  onDecreaseDistance,
  onIncreaseDistance,
  onDecreaseVelocity,
  onIncreaseVelocity,
  onChangeCloseable,
}: Configuration) => {
  const state: Record<SwipeNs.Direction, boolean> = {
    up: directions.includes('up'),
    down: directions.includes('down'),
    left: directions.includes('left'),
    right: directions.includes('right'),
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
          <Text style={styles.labelText}>Start</Text>
        </View>

        <View style={styles.columnRow}>
          <TouchableOpacity
            style={[styles.item, state.up && styles.itemActive]}
            onPress={() => onChangeDirection('up')}>
            <Text style={styles.itemText}>Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.item, state.down && styles.itemActive]}
            onPress={() => onChangeDirection('down')}>
            <Text style={styles.itemText}>Down</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.item, state.left && styles.itemActive]}
            onPress={() => onChangeDirection('left')}>
            <Text style={styles.itemText}>Left</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.item, state.right && styles.itemActive]}
            onPress={() => onChangeDirection('right')}>
            <Text style={styles.itemText}>Right</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.labelText}>Distance</Text>
        </View>

        <View style={styles.columnRow}>
          <TouchableOpacity style={styles.item} onPress={onDecreaseDistance}>
            <Text style={styles.itemText}>-</Text>
          </TouchableOpacity>

          <View style={styles.item}>
            <Text style={styles.itemText}>{`${distance}`}</Text>
          </View>

          <TouchableOpacity style={styles.item} onPress={onIncreaseDistance}>
            <Text style={styles.itemText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.labelText}>Velocity</Text>
        </View>

        <View style={styles.columnRow}>
          <TouchableOpacity style={styles.item} onPress={onDecreaseVelocity}>
            <Text style={styles.itemText}>-</Text>
          </TouchableOpacity>

          <View style={styles.item}>
            <Text style={styles.itemText}>{`${velocity}`}</Text>
          </View>

          <TouchableOpacity style={styles.item} onPress={onIncreaseVelocity}>
            <Text style={styles.itemText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.labelText}>Closeable</Text>
        </View>

        <View style={styles.columnRow}>
          <TouchableOpacity
            style={[styles.item, closable && styles.itemActive]}
            onPress={() => onChangeCloseable(true)}>
            <Text style={styles.itemText}>Enable</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.item, !closable && styles.itemActive]}
            onPress={() => onChangeCloseable(false)}>
            <Text style={styles.itemText}>Disable</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
