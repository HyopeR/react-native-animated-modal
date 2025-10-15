A highly customizable React Native modal component supporting animations, swipe gestures, and backdrop interactions. Designed for mobile applications to enhance modal interactions with smooth animations and user-friendly gestures.
For full API documentation and examples, see the [online docs](https://hyoper.github.io/react-native-animated-modal/).

---

## Requirements
This package relies on specific versions of its peer dependencies to function correctly. Make sure your project meets the following requirements.
 - "react": ">=18.2.0",
 - "react-native": ">=0.78.0",
 - "react-native-gesture-handler": ">=2.26.0",
 - "react-native-reanimated": ">=3.19.0"

## Example
A simple example of the component's usage is provided below. You can customize it according to your needs. For more complete examples and real-world use cases, see the [example folder](https://github.com/HyopeR/react-native-animated-modal/tree/master/example).

```typescript jsx
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Modal} from 'react-native-animated-modal';

const Example = () => {
  const [visible, setVisible] = useState(false);
  return (
    <Modal
      // Modal status is hidden or visible.
      visible={visible}
      // Use Fade/Scale/Slide animations. (Optional)
      animation={{
        type: 'slide',
        direction: {start: 'up', end: 'down'},
        duration: 350,
      }}
      // Activate and customize the draggable modal. (Optional)
      swipe={{
        enabled: true,
        directions: ['up', 'down', 'left', 'right'],
        distance: 120,
        velocity: 800,
        closable: true,
      }}
      // Customize the backdrop component. (Optional)
      backdrop={{
        enabled: true,
        backgroundColor: 'black',
        opacity: 0.5,
      }}
      // Triggered when the modal is closed.
      onHide={() => setVisible(false)}
      // Triggered when the modal is opened. (Optional)
      onShow={() => {}}
      // Triggered when the android back button is pressed. (Optional)
      onBackPress={() => setVisible(false)}
      // Triggered when the backdrop is pressed. (Optional)
      onBackdropPress={() => setVisible(false)}
      // Triggered when the drag operation is completed. (Optional)
      onSwipeComplete={() => setVisible(false)}
      // Triggered when the drag operation is canceled. (Optional)
      onSwipeCancel={() => {}}
    >
      <View style={styles.content}>
        <Text>React Native Animated Modal</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    width: 320,
    height: 240,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

## Props
The following table lists all props available for the Modal component. They allow you to customize the modal's appearance, behavior, and gesture interactions.

| Prop                     | Type                   | Default | Description                                                 |
| ------------------------ |------------------------|---------| ----------------------------------------------------------- |
| visible                  | boolean                | false   | Determines whether the modal is visible.                    |
| onShow                   | Function               | —       | Callback fired when the modal is shown.                     |
| onHide                   | Function               | —       | Callback fired when the modal is hidden.                    |
| onBackdropPress          | Function               | —       | Callback fired when the backdrop is pressed.                |
| onBackPress              | Function               | —       | Callback fired when the back button is pressed.             |
| onSwipeComplete          | Function               | —       | Callback fired when a swipe gesture completes successfully. |
| onSwipeCancel            | Function               | —       | Callback fired when a swipe gesture is canceled.            |
| animation                | `AnimationNs.Config`   | —       | Animation configuration for the modal.                      |
| swipe                    | `SwipeNs.Config`       | —       | Swipe gesture configuration.                                |
| backdrop                 | `BackdropNs.Config`    | —       | Backdrop configuration.                                     |
| style                    | `StyleProp<ViewStyle>` | —       | Style for the modal content container.                      |
| children                 | `ReactNode`            | —       | Modal children.                                             |
| hardwareAccelerated      | boolean                | —       | Forces hardware acceleration for the modal on Android.      |
| statusBarTranslucent     | boolean                | true    | Determines if the status bar is translucent on Android.     |
| navigationBarTranslucent | boolean                | true    | Determines if the navigation bar is translucent on Android. |
| supportedOrientations    | Array                  | —       | Supported orientations on iOS.                              |
| onOrientationChange      | Function               | —       | Callback when orientation changes on iOS.                   |

### AnimationNs.Config
| Field     | Type                                            | Default   | Description                                          |
| --------- |-------------------------------------------------|-----------| ---------------------------------------------------- |
| type      | 'fade' \| 'slide' \| 'scale'                    | 'fade'    | Type of animation.                                   |
| duration  | number                                          | 350       | Duration of the animation in milliseconds.           |
| direction | `Direction` \| `DirectionExtend`                | 'up'      | Only for slide animations. Defines motion direction. |

### SwipeNs.Config
| Field      | Type          | Default | Description                          |
| ---------- | ------------- | ------- | ------------------------------------ |
| enabled    | boolean       | false   | Whether swipe gestures are enabled.  |
| directions | `Direction[]` | []      | Allowed swipe directions.            |
| distance   | number        | 120     | Distance threshold to trigger swipe. |
| velocity   | number        | 800     | Velocity threshold to trigger swipe. |
| closable   | boolean       | false   | Whether swipe can close the modal.   |

### BackdropNs.Config
| Field           | Type    | Default | Description                       |
| --------------- | ------- | ------- | --------------------------------- |
| enabled         | boolean | true    | Whether the backdrop is enabled.  |
| backgroundColor | string  | 'black' | Background color of the backdrop. |
| opacity         | number  | 0.6     | Opacity of the backdrop.          |

