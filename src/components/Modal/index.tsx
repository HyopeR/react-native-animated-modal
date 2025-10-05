import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Modal as ModalNative, StyleSheet} from 'react-native';
import {
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {ModalProvider} from '../../context';
import {getSafeProps} from '../../utils';
import {
  useAnimation,
  useAnimationConfig,
  useAnimationValues,
  useBackdropConfig,
  useEvent,
  useGesture,
  useSwipeConfig,
} from '../../hooks';
import {Backdrop} from '../Backdrop';
import {Content} from '../Content';
import {
  ModalProps,
  ModalPrivateProps,
  ModalPrivateStrictProps,
  ModalRequiredProps,
} from './index.type';

export type {ModalProps, ModalPrivateProps};

const ModalDefaultProps: ModalRequiredProps = {
  visible: false,
  statusBarTranslucent: true,
  navigationBarTranslucent: true,
  onShow: () => {},
  onHide: () => {},
  onBackdropPress: () => {},
  onBackPress: () => {},
  onSwipeComplete: () => {},
  onSwipeCancel: () => {},
};

export const Modal = (props: ModalPrivateProps) => {
  // Merge user props with defaults.
  const propsSafe = getSafeProps(
    props,
    ModalDefaultProps,
  ) as ModalPrivateStrictProps;

  const {
    visible,
    animation,
    swipe,
    backdrop,
    onShow,
    onHide,
    onBackdropPress,
    onBackPress,
    onSwipeComplete,
    onSwipeCancel,
    style,
    children,
    ...rest
  } = propsSafe;

  // Cache all configs and shared values into a single store for context usage.
  const animationValues = useAnimationValues();
  const animationConfig = useAnimationConfig(animation);
  const swipeConfig = useSwipeConfig(swipe);
  const backdropConfig = useBackdropConfig(backdrop);
  const store = useMemo(() => {
    return {
      swipe: swipeConfig,
      animation: animationConfig,
      backdrop: backdropConfig,
      ...animationValues,
    };
  }, [animationConfig, animationValues, backdropConfig, swipeConfig]);

  const mount = useRef(false);
  const [_visible, _setVisible] = useState(visible);

  // Cache user-provided callbacks to avoid unnecessary re-renders.
  const onShowEvent = useEvent(onShow);
  const onHideEvent = useEvent(onHide);
  const onBackdropPressEvent = useEvent(onBackdropPress);
  const onBackPressEvent = useEvent(onBackPress);
  const onSwipeCompleteEvent = useEvent(onSwipeComplete);
  const onSwipeCancelEvent = useEvent(onSwipeCancel);

  const handleShow = useCallback(() => {
    if (_visible) return;
    onShowEvent();
    _setVisible(true);
  }, [onShowEvent, _visible]);

  const handleHide = useCallback(() => {
    if (!_visible) return;
    onHideEvent();
    _setVisible(false);
  }, [onHideEvent, _visible]);

  const handleSwipeComplete = useCallback(() => {
    onSwipeCompleteEvent();
    _setVisible(false);
  }, [onSwipeCompleteEvent]);

  const handleSwipeCancel = useCallback(() => {
    onSwipeCancelEvent();
  }, [onSwipeCancelEvent]);

  const eventsAnimation = useMemo(() => {
    return {
      onEnterStart: handleShow,
      onExitEnd: handleHide,
    };
  }, [handleHide, handleShow]);

  const eventsGesture = useMemo(() => {
    return {
      onSwipeComplete: handleSwipeComplete,
      onSwipeCancel: handleSwipeCancel,
    };
  }, [handleSwipeCancel, handleSwipeComplete]);

  const eventsBackdrop = useMemo(() => {
    return {
      touch: {
        onPress: onBackdropPressEvent,
      },
    };
  }, [onBackdropPressEvent]);

  const {init, enter, exit} = useAnimation({...store, events: eventsAnimation});

  // Reset animation values when modal becomes visible.
  useEffect(() => {
    if (!visible) return;
    init();
  }, [init, visible]);

  // Control enter/exit animations when visibility changes.
  useEffect(() => {
    if (!visible && !mount.current) return;
    const timeout = setTimeout(() => {
      if (visible) enter();
      else exit();
    }, 10);
    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [enter, exit, visible]);

  useEffect(() => {
    mount.current = true;
    return () => {
      mount.current = false;
    };
  }, []);

  const gesture = useGesture({
    size: store.size,
    swipe: store.swipe,
    animation: store.animation,
    translateX: store.translateX,
    translateY: store.translateY,
    events: eventsGesture,
  });

  return (
    <ModalNative
      visible={_visible}
      transparent={true}
      animationType={'none'}
      onRequestClose={onBackPressEvent}
      {...rest}>
      <GestureHandlerRootView style={styles.root}>
        <ModalProvider value={store}>
          <Backdrop {...eventsBackdrop} {...backdropConfig} />
          <GestureDetector gesture={gesture}>
            <Content style={style}>{children}</Content>
          </GestureDetector>
        </ModalProvider>
      </GestureHandlerRootView>
    </ModalNative>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
});
