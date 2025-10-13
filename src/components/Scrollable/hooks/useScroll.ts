import {useMemo} from 'react';
import {runOnJS, useAnimatedScrollHandler} from 'react-native-reanimated';
import {useScrollVertical} from './useScrollVertical';
import {useScrollHorizontal} from './useScrollHorizontal';
import {UseScrollProps, UseScrollCommonProps} from './index.type';

export const useScroll = ({
  orientation,
  inverted,
  scroll,
  scrollInteraction,
  scrollLock,
  onScroll,
  onBeginDrag,
  onEndDrag,
  onMomentumBegin,
  onMomentumEnd,
}: UseScrollProps) => {
  const commonProps = useMemo<UseScrollCommonProps>(() => {
    return {inverted, scroll, scrollLock};
  }, [inverted, scroll, scrollLock]);

  const {onScroll: onScrollVertical} = useScrollVertical(commonProps);
  const {onScroll: onScrollHorizontal} = useScrollHorizontal(commonProps);

  const onScrollHandler = useAnimatedScrollHandler(
    {
      onScroll: e => {
        if (orientation === 'vertical') onScrollVertical(e);
        else onScrollHorizontal(e);

        if (onScroll) {
          runOnJS(onScroll)({nativeEvent: e});
        }
      },
      onBeginDrag: e => {
        if (!scrollInteraction.value) scrollInteraction.value = true;

        if (onBeginDrag) {
          runOnJS(onBeginDrag)({nativeEvent: e});
        }
      },
      onEndDrag: e => {
        if (scrollInteraction.value) scrollInteraction.value = false;

        if (onEndDrag) {
          runOnJS(onEndDrag)({nativeEvent: e});
        }
      },
      onMomentumBegin: e => {
        if (onMomentumBegin) {
          runOnJS(onMomentumBegin)({nativeEvent: e});
        }
      },
      onMomentumEnd: e => {
        if (onMomentumEnd) {
          runOnJS(onMomentumEnd)({nativeEvent: e});
        }
      },
    },
    [],
  );

  return {onScrollHandler};
};
