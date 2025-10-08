import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Modal as ModalNative, StyleSheet} from 'react-native';
import {
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {ConfigProvider, ShareProvider} from '../../context';
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
import {ModalProps, ModalRequiredProps, ModalStrictProps} from './index.type';

export type {ModalProps};

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

export const Modal = (props: ModalProps) => {
  // Merge user props with defaults.
  const propsSafe = getSafeProps(props, ModalDefaultProps) as ModalStrictProps;

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

  const values = useAnimationValues();

  // Cache all configs and shared values into a single store for context usage.
  const animationConfig = useAnimationConfig(animation);
  const swipeConfig = useSwipeConfig(swipe);
  const backdropConfig = useBackdropConfig(backdrop);
  const config = useMemo(() => {
    return {
      swipe: swipeConfig,
      animation: animationConfig,
      backdrop: backdropConfig,
    };
  }, [animationConfig, backdropConfig, swipeConfig]);

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

  const {init, enter, exit} = useAnimation({
    animation: config.animation,
    size: values.size,
    translateX: values.translateX,
    translateY: values.translateY,
    opacity: values.opacity,
    scale: values.scale,
    scrolling: values.scrolling,
    events: eventsAnimation,
  });

  const {native, pan} = useGesture({
    swipe: config.swipe,
    animation: config.animation,
    size: values.size,
    translateX: values.translateX,
    translateY: values.translateY,
    scrolling: values.scrolling,
    events: eventsGesture,
  });

  const share = useMemo(
    () => ({...values, native, pan}),
    [values, native, pan],
  );

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

  return (
    <ModalNative
      visible={_visible}
      transparent={true}
      animationType={'none'}
      onRequestClose={onBackPressEvent}
      {...rest}>
      <GestureHandlerRootView style={styles.root}>
        <ConfigProvider value={config}>
          <ShareProvider value={share}>
            <Backdrop {...eventsBackdrop} {...backdropConfig} />
            <GestureDetector gesture={pan}>
              <Content style={style}>{children}</Content>
            </GestureDetector>
          </ShareProvider>
        </ConfigProvider>
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
