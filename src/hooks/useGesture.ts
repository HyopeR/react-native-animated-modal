import {createRef, useCallback, useMemo} from 'react';
import {
  runOnJS,
  SharedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Gesture} from 'react-native-gesture-handler';
import {SWIPE_LOCK_THRESHOLD} from '../constants';
import {AnimationNs, Offset, Size, SwipeNs} from '../types';

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
  scrolling: SharedValue<string>;
  scrollingLock: SharedValue<boolean>;
  scrollingOffset: SharedValue<Offset>;
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
  scrolling,
  scrollingLock,
  scrollingOffset,
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

  const direction = useSharedValue<AnimationNs.Direction | null>(null);
  const directionLock = useSharedValue<AnimationNs.Direction | null>(null);
  const axis = useSharedValue<AnimationNs.Axis | null>(null);
  const axisLock = useSharedValue<AnimationNs.Axis | null>(null);

  const handler = useCallback(
    (type: 'complete' | 'cancel') => {
      if (type === 'complete') events?.onSwipeComplete?.();
      else events?.onSwipeCancel?.();
      direction.value = null;
      directionLock.value = null;
      axis.value = null;
      axisLock.value = null;

      scrollingLock.value = false;
      scrollingOffset.value = {x: 0, y: 0};
    },
    [
      axis,
      axisLock,
      direction,
      directionLock,
      events,
      scrollingLock,
      scrollingOffset,
    ],
  );

  const cb = useCallback(
    (
      finished: boolean | undefined,
      character: 'x' | 'y',
      type: 'complete' | 'cancel',
    ) => {
      'worklet';
      if (finished && axis.value === character) {
        runOnJS(handler)(type);
      }
    },
    [axis, handler],
  );

  return useMemo(() => {
    const gestureNativeRef = createRef<any>();
    const gestureNative = Gesture.Native();
    const gesturePan = Gesture.Pan()
      .enabled(enabled)
      .simultaneousWithExternalGesture(gestureNative, gestureNativeRef)
      .onStart(() => {
        'worklet';
        direction.value = null;
        directionLock.value = null;
        axis.value = null;
        axisLock.value = null;
      })
      .onUpdate(e => {
        'worklet';
        const translationX = e.translationX - scrollingOffset.value.x;
        const translationY = e.translationY - scrollingOffset.value.y;

        const absX = Math.abs(translationX);
        const absY = Math.abs(translationY);
        if (absX < SWIPE_LOCK_THRESHOLD && absY < SWIPE_LOCK_THRESHOLD) return;

        if (absX > absY) {
          direction.value = translationX > 0 ? 'right' : 'left';
          axis.value = 'x';
        } else {
          direction.value = translationY > 0 ? 'down' : 'up';
          axis.value = 'y';
        }

        if (!axisLock.value) {
          axisLock.value = axis.value;
        }

        if (!directionLock.value || axisLock.value === axis.value) {
          directionLock.value = direction.value;
        }

        if (!swipe.directions.includes(direction.value)) {
          direction.value = null;
          directionLock.value = null;
          axis.value = null;
          axisLock.value = null;
          return;
        }

        const orientation = 'vertical';

        if (orientation === 'vertical') {
          if (axis.value === 'y' && scrolling.value === 'idle') {
            scrollingOffset.value = {x: e.translationX, y: e.translationY};
            return;
          }

          switch (direction.value) {
            case 'up':
              if (axisLock.value === 'y' && scrolling.value !== 'down') {
                console.log('trigger up');
                scrollingLock.value = true;
                translateX.value = 0;
                translateY.value = Math.min(0, translationY);
              }
              break;
            case 'down':
              if (axisLock.value === 'y' && scrolling.value !== 'up') {
                console.log('trigger down');
                scrollingLock.value = true;
                translateX.value = 0;
                translateY.value = Math.max(0, translationY);
              }
              break;
            case 'left':
              if (axisLock.value === 'x') {
                scrollingLock.value = true;
                translateX.value = Math.min(0, translationX);
                translateY.value = 0;
              }
              break;
            case 'right':
              if (axisLock.value === 'x') {
                scrollingLock.value = true;
                translateX.value = Math.max(0, translationX);
                translateY.value = 0;
              }
              break;
          }
        }
      })
      .onEnd(e => {
        'worklet';
        const translationX = e.translationX - scrollingOffset.value.x;
        const translationY = e.translationY - scrollingOffset.value.y;

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

        if (dismiss && axisLock.value && swipe.closable) {
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
      nativeRef: gestureNativeRef,
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
    scrolling,
    scrollingLock,
    scrollingOffset,
    size,
    swipe.closable,
    swipe.directions,
    swipe.distance,
    translateX,
    translateY,
  ]);
};
