import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {AnimationNs} from 'react-native-animated-modal';
import {ConfigStyle as styles} from '../styles';

export type Configuration = {
  type: AnimationNs.Animation;
  duration: number;
  direction: AnimationNs.DirectionExtend;
  onChangeType: (value: AnimationNs.Animation) => void;
  onDecrease: () => void;
  onIncrease: () => void;
  onChangeDirection: (
    position: keyof AnimationNs.DirectionExtend,
    value: AnimationNs.Direction,
  ) => void;
};

export const Configuration = ({
  type,
  duration,
  direction,
  onChangeType,
  onDecrease,
  onIncrease,
  onChangeDirection,
}: Configuration) => {
  const start: Record<AnimationNs.Direction, boolean> = {
    up: direction.start === 'up',
    down: direction.start === 'down',
    left: direction.start === 'left',
    right: direction.start === 'right',
  };

  const end: Record<AnimationNs.Direction, boolean> = {
    up: direction.end === 'up',
    down: direction.end === 'down',
    left: direction.end === 'left',
    right: direction.end === 'right',
  };

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.labelText}>Type</Text>
        </View>

        <View style={styles.columnRow}>
          <TouchableOpacity
            style={[styles.item, type === 'fade' && styles.itemActive]}
            onPress={() => onChangeType('fade')}>
            <Text style={styles.itemText}>Fade</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.item, type === 'scale' && styles.itemActive]}
            onPress={() => onChangeType('scale')}>
            <Text style={styles.itemText}>Scale</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.item, type === 'slide' && styles.itemActive]}
            onPress={() => onChangeType('slide')}>
            <Text style={styles.itemText}>Slide</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.labelText}>Duration</Text>
        </View>

        <View style={styles.columnRow}>
          <TouchableOpacity style={styles.item} onPress={onDecrease}>
            <Text style={styles.itemText}>-</Text>
          </TouchableOpacity>

          <View style={styles.item}>
            <Text style={styles.itemText}>{`${duration}`}</Text>
          </View>

          <TouchableOpacity style={styles.item} onPress={onIncrease}>
            <Text style={styles.itemText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {type === 'slide' && (
        <>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.labelText}>Direction</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.labelText}>Start</Text>
            </View>

            <View style={styles.columnRow}>
              <TouchableOpacity
                style={[styles.item, start.up && styles.itemActive]}
                onPress={() => onChangeDirection('start', 'up')}>
                <Text style={styles.itemText}>Up</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.item, start.down && styles.itemActive]}
                onPress={() => onChangeDirection('start', 'down')}>
                <Text style={styles.itemText}>Down</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.item, start.left && styles.itemActive]}
                onPress={() => onChangeDirection('start', 'left')}>
                <Text style={styles.itemText}>Left</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.item, start.right && styles.itemActive]}
                onPress={() => onChangeDirection('start', 'right')}>
                <Text style={styles.itemText}>Right</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.labelText}>End</Text>
            </View>

            <View style={styles.columnRow}>
              <TouchableOpacity
                style={[styles.item, end.up && styles.itemActive]}
                onPress={() => onChangeDirection('end', 'up')}>
                <Text style={styles.itemText}>Up</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.item, end.down && styles.itemActive]}
                onPress={() => onChangeDirection('end', 'down')}>
                <Text style={styles.itemText}>Down</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.item, end.left && styles.itemActive]}
                onPress={() => onChangeDirection('end', 'left')}>
                <Text style={styles.itemText}>Left</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.item, end.right && styles.itemActive]}
                onPress={() => onChangeDirection('end', 'right')}>
                <Text style={styles.itemText}>Right</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};
