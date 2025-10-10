import {useCallback, useMemo} from 'react';
import {
  runOnJS,
  SharedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Gesture} from 'react-native-gesture-handler';
import {SWIPE_LOCK_THRESHOLD} from '../constants';
import {
  AnimationNs,
  Offset,
  Scroll,
  ScrollOrientation,
  Size,
  SwipeNs,
} from '../types';

export type UseGestureEvents = {
  onSwipeComplete: () => void;
  onSwipeCancel: () => void;
};

export type UseGestureProps = {
  swipe: SwipeNs.ConfigStrict;
  animation: AnimationNs.ConfigStrict;
  size: SharedValue<Size>;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  scroll: SharedValue<Scroll>;
  scrollLock: SharedValue<boolean>;
  scrollOffset: SharedValue<Offset>;
  scrollOrientation: SharedValue<ScrollOrientation>;
  events?: Partial<UseGestureEvents>;
};

/**
 * @internal
 * Hook to handle swipe gestures for dismissing or moving the view.
 *
 * Updates translation shared values (X/Y) based on gesture input.
 * Determines direction (up, down, left, right) with lock threshold.
 * Applies user-defined swipe config (distance, velocity, closable).
 * Calls lifecycle events: `onSwipeComplete` or `onSwipeCancel`.
 */
export const useGesture = ({
  size,
  swipe,
  animation,
  translateX,
  translateY,
  scroll,
  scrollLock,
  scrollOffset,
  scrollOrientation,
  events,
}: UseGestureProps) => {
  const enabled = useMemo(
    () => swipe.enabled && swipe.directions.length >= 1,
    [swipe.directions.length, swipe.enabled],
  );

  const config = useMemo(
    () => ({duration: animation.duration}),
    [animation.duration],
  );

  const gestureLock = useSharedValue(false);

  const direction = useSharedValue<AnimationNs.Direction | null>(null);
  const directionLock = useSharedValue<AnimationNs.Direction | null>(null);
  const axis = useSharedValue<AnimationNs.Axis | null>(null);
  const axisLock = useSharedValue<AnimationNs.Axis | null>(null);

  const handler = useCallback(
    (type: 'complete' | 'cancel') => {
      if (type === 'complete') events?.onSwipeComplete?.();
      else events?.onSwipeCancel?.();
      gestureLock.value = false;

      direction.value = null;
      directionLock.value = null;
      axis.value = null;
      axisLock.value = null;

      scrollLock.value = false;
      scrollOffset.value = {x: 0, y: 0};
    },
    [
      axis,
      axisLock,
      direction,
      directionLock,
      events,
      gestureLock,
      scrollLock,
      scrollOffset,
    ],
  );

  const cb = useCallback(
    (
      finished: boolean | undefined,
      character: 'x' | 'y',
      type: 'complete' | 'cancel',
    ) => {
      'worklet';
      if (axisLock.value === character) {
        runOnJS(handler)(type);
      }
    },
    [axisLock, handler],
  );

  return useMemo(() => {
    const gestureNative = Gesture.Native();
    const gesturePan = Gesture.Pan()
      .enabled(enabled)
      .simultaneousWithExternalGesture(gestureNative)
      .onStart(() => {
        'worklet';
        if (gestureLock.value) return;

        direction.value = null;
        directionLock.value = null;
        axis.value = null;
        axisLock.value = null;
      })
      .onUpdate(e => {
        'worklet';
        if (gestureLock.value) return;

        const translationX = e.translationX - scrollOffset.value.x;
        const translationY = e.translationY - scrollOffset.value.y;

        const absX = Math.abs(translationX);
        const absY = Math.abs(translationY);
        if (absX < SWIPE_LOCK_THRESHOLD && absY < SWIPE_LOCK_THRESHOLD) {
          return;
        }

        // The direction and axis of movement are determined.
        if (absX > absY) {
          direction.value = translationX > 0 ? 'right' : 'left';
          axis.value = 'x';
        } else {
          direction.value = translationY > 0 ? 'down' : 'up';
          axis.value = 'y';
        }

        // The axis is locked when movement begins.
        // It prevents simultaneous movement in the X and Y axes.
        if (!axisLock.value) {
          axisLock.value = axis.value;
        }

        // The direction of movement can be changed while in motion.
        // The direction of movement can only change along the axis from which it started.
        if (!directionLock.value || axisLock.value === axis.value) {
          directionLock.value = direction.value;
        }

        // If there is a movement in directions not specified by the user,
        // the movement is not started.
        if (!swipe.directions.includes(direction.value)) {
          direction.value = null;
          directionLock.value = null;
          axis.value = null;
          axisLock.value = null;
          return;
        }

        if (scrollOrientation.value !== 'none' && scroll.value === 'middle') {
          if (scrollOrientation.value === 'vertical' && axis.value === 'y') {
            scrollOffset.value = {x: e.translationX, y: e.translationY};
            return;
          }

          if (scrollOrientation.value === 'horizontal' && axis.value === 'x') {
            scrollOffset.value = {x: e.translationX, y: e.translationY};
            return;
          }
        }

        // Pan.Gesture and Scrollable Children are what determine how the component will work.
        // If there are no scrollable children -> All true.
        // If there are scrollable children -> Determine by position in the list.
        const scrollable = {
          top:
            scrollOrientation.value !== 'vertical' ||
            (scrollOrientation.value === 'vertical' && scroll.value !== 'top'),
          bottom:
            scrollOrientation.value !== 'vertical' ||
            (scrollOrientation.value === 'vertical' &&
              scroll.value !== 'bottom'),
          left:
            scrollOrientation.value !== 'horizontal' ||
            (scrollOrientation.value === 'horizontal' &&
              scroll.value !== 'left'),
          right:
            scrollOrientation.value !== 'horizontal' ||
            (scrollOrientation.value === 'horizontal' &&
              scroll.value !== 'right'),
        };

        switch (direction.value) {
          case 'up':
            if (axisLock.value === 'y' && scrollable.top) {
              scrollLock.value = true;
              translateX.value = 0;
              translateY.value = Math.min(0, translationY);
            }
            break;
          case 'down':
            if (axisLock.value === 'y' && scrollable.bottom) {
              scrollLock.value = true;
              translateX.value = 0;
              translateY.value = Math.max(0, translationY);
            }
            break;
          case 'left':
            if (axisLock.value === 'x' && scrollable.left) {
              scrollLock.value = true;
              translateX.value = Math.min(0, translationX);
              translateY.value = 0;
            }
            break;
          case 'right':
            if (axisLock.value === 'x' && scrollable.right) {
              scrollLock.value = true;
              translateX.value = Math.max(0, translationX);
              translateY.value = 0;
            }
            break;
        }
      })
      .onEnd(e => {
        'worklet';
        if (gestureLock.value || !axisLock.value || !directionLock.value) {
          return;
        }

        const translationX = e.translationX - scrollOffset.value.x;
        const translationY = e.translationY - scrollOffset.value.y;

        let dismiss = false;
        let toX = 0;
        let toY = 0;

        if (directionLock.value === 'up') {
          dismiss = translationY < -swipe.distance;
          toY = dismiss ? -size.value.height : 0;
        } else if (directionLock.value === 'down') {
          dismiss = translationY > swipe.distance;
          toY = dismiss ? size.value.height : 0;
        } else if (directionLock.value === 'left') {
          dismiss = translationX < -swipe.distance;
          toX = dismiss ? -size.value.width : 0;
        } else if (directionLock.value === 'right') {
          dismiss = translationX > swipe.distance;
          toX = dismiss ? size.value.width : 0;
        }

        gestureLock.value = true;
        if (dismiss && swipe.closable) {
          translateX.value = withTiming(toX, config, f =>
            cb(f, 'x', 'complete'),
          );
          translateY.value = withTiming(toY, config, f =>
            cb(f, 'y', 'complete'),
          );
        } else {
          translateX.value = withTiming(0, config, f => cb(f, 'x', 'cancel'));
          translateY.value = withTiming(0, config, f => cb(f, 'y', 'cancel'));
        }
      });

    return {
      native: gestureNative,
      pan: gesturePan,
    };
  }, [
    axis,
    axisLock,
    cb,
    config,
    direction,
    directionLock,
    enabled,
    gestureLock,
    scroll,
    scrollLock,
    scrollOffset,
    scrollOrientation,
    size,
    swipe.closable,
    swipe.directions,
    swipe.distance,
    translateX,
    translateY,
  ]);
};
