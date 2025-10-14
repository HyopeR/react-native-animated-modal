import React, {ComponentProps} from 'react';
import {StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export type ScreenProps = {
  scrollable?: boolean;
} & ComponentProps<Animated.View>;

export const Screen = ({
  scrollable,
  style,
  children,
  ...props
}: ScreenProps) => {
  const insets = useSafeAreaInsets();
  const insetsPadding = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  return (
    <Animated.View style={[styles.root, style, insetsPadding]} {...props}>
      {scrollable ? (
        <Animated.ScrollView contentContainerStyle={styles.scrollable}>
          {children}
        </Animated.ScrollView>
      ) : (
        children
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  scrollable: {
    flexGrow: 1,
  },
});
