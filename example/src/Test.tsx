import React, {useRef} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import Animated from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  ScrollView as ScrollViewGH,
  FlatList as FlatListGH,
} from 'react-native-gesture-handler';

export function Test() {
  return TestRN();
}

export function TestRN() {
  const native = Gesture.Native();
  const pan = Gesture.Pan()
    .simultaneousWithExternalGesture(native)
    .onBegin(() => {
      console.log('🟢 Pan started');
    })
    .onUpdate(e => {
      console.log('🟡 Pan update:', e.translationX, e.translationY);
    })
    .onEnd(() => {
      console.log('🔴 Pan ended');
    });

  return (
    <View style={styles.root}>
      <GestureDetector gesture={pan}>
        <Animated.View
          style={StyleSheet.absoluteFillObject}
          pointerEvents="box-none">
          <GestureDetector gesture={native}>
            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.content}
              scrollEventThrottle={16}>
              {Array.from({length: 30}, (_, i) => (
                <View key={i} style={styles.item}>
                  <Text style={styles.text}>Item {i + 1}</Text>
                </View>
              ))}
            </ScrollView>
          </GestureDetector>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

export function TestRNGestureHandler() {
  const ref = useRef<any>(null);

  const pan = Gesture.Pan()
    .simultaneousWithExternalGesture(ref)
    .onBegin(() => {
      console.log('🟢 Pan started');
    })
    .onUpdate(e => {
      console.log('🟡 Pan update:', e.translationX, e.translationY);
    })
    .onEnd(() => {
      console.log('🔴 Pan ended');
    });

  return (
    <View style={styles.root}>
      <GestureDetector gesture={pan}>
        <Animated.View
          style={StyleSheet.absoluteFillObject}
          pointerEvents="box-none">
          <ScrollViewGH
            ref={ref}
            style={styles.scroll}
            contentContainerStyle={styles.content}
            scrollEventThrottle={16}>
            {Array.from({length: 30}, (_, i) => (
              <View key={i} style={styles.item}>
                <Text style={styles.text}>Item {i + 1}</Text>
              </View>
            ))}
          </ScrollViewGH>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#fff'},
  scroll: {flex: 1},
  content: {paddingVertical: 20},
  item: {
    height: 80,
    marginVertical: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {fontSize: 18},
});
