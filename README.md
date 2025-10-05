# react-native-animated-modal
A highly customizable React Native modal component supporting animations, swipe gestures, and backdrop interactions. Designed for mobile applications to enhance modal interactions with smooth animations and user-friendly gestures.
For full API documentation and examples, see the [online docs](https://hyoper.github.io/react-native-animated-modal/).

---

## Requirements
This package relies on specific versions of its peer dependencies to function correctly. Make sure your project meets the following requirements.
 - "react": ">=18.2.0",
 - "react-native": ">=0.78.0",
 - "react-native-gesture-handler": ">=2.26.0",
 - "react-native-reanimated": ">=3.19.0"

## Usage
A simple example of the component's usage is provided below. You can customize it according to your needs. For more complete examples and real-world use cases, see the [example folder](https://github.com/HyopeR/react-native-animated-modal/tree/master/example).

```typescript jsx
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Modal} from 'react-native-animated-modal';

const Example = () => {
  const [visible, setVisible] = useState(false);
  return (
    <Modal
      visible={visible}
      onHide={() => setVisible(false)}
      onBackPress={() => setVisible(false)}
      onBackdropPress={() => setVisible(false)}
      onSwipeComplete={() => setVisible(false)}
      backdrop={{enabled: true, backgroundColor: 'black', opacity: 0.6}}
      animation={{type: 'slide', direction: {start: 'up', end: 'down'}}}
      swipe={{enabled: true, directions: ['up', 'down', 'left', 'right']}}>
      <View style={styles.content}>
        <Text>Example Modal</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    width: 300,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 15,
    gap: 10,
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
| animation                | `AnimationNs.Config`   | -       | Animation configuration for the modal.                      |
| swipe                    | `SwipeNs.Config`       | -       | Swipe gesture configuration.                                |
| backdrop                 | `BackdropNs.Config`    | -       | Backdrop configuration.                                     |
| style                    | `StyleProp<ViewStyle>` | —       | Style for the modal content container.                      |
| children                 | `ReactNode`            | —       | Modal children.                                             |
| hardwareAccelerated      | boolean                | —       | Forces hardware acceleration for the modal on Android.      |
| statusBarTranslucent     | boolean                | true    | Determines if the status bar is translucent on Android.     |
| navigationBarTranslucent | boolean                | true    | Determines if the navigation bar is translucent on Android. |
| supportedOrientations    | Array                  |         | Supported orientations on iOS.                              |
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

