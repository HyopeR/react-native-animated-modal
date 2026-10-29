import React from 'react';
import {ScrollView, ScrollViewProps} from 'react-native';
import {GestureDetector, NativeGesture} from 'react-native-gesture-handler';

export type ScrollComponentProps = ScrollViewProps & {
  gesture: NativeGesture;
};

/**
 * @hidden
 * ScrollView that attaches the modal's native gesture directly to the scroll view.
 *
 * It must be the only gesture handler on the scroll view. Combining it with another native
 * handler on the same view (e.g. GestureHandler's ScrollView) breaks scrolling on some Android versions.
 * Defined at module level so the component type stays stable and lists don't remount their scroll view.
 */
export const ScrollComponent = React.forwardRef<
  ScrollView,
  ScrollComponentProps
>(({gesture, ...rest}, ref) => {
  return (
    <GestureDetector gesture={gesture}>
      <ScrollView ref={ref} {...rest} />
    </GestureDetector>
  );
});
