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
  useDimensionEffect,
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
  onShow: () => {},
  onHide: () => {},
  onBackdropPress: () => {},
  onBackPress: () => {},
  onSwipeComplete: () => {},
};

export const Modal = (props: ModalPrivateProps) => {
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
    style,
    children,
    ...rest
  } = propsSafe;

  const animationValues = useAnimationValues();
  const animationConfig = useAnimationConfig(animation);
  const swipeConfig = useSwipeConfig(swipe);
  const store = useMemo(() => {
    return {
      swipe: swipeConfig,
      animation: animationConfig,
      ...animationValues,
    };
  }, [animationConfig, animationValues, swipeConfig]);

  const mount = useRef(false);
  const [_visible, _setVisible] = useState(visible);

  const onShowEvent = useEvent(onShow);
  const onHideEvent = useEvent(onHide);
  const onBackdropPressEvent = useEvent(onBackdropPress);
  const onBackPressEvent = useEvent(onBackPress);
  const onSwipeCompleteEvent = useEvent(onSwipeComplete);

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

  const eventsAnimation = useMemo(() => {
    return {
      onEnterStart: handleShow,
      onExitEnd: handleHide,
    };
  }, [handleHide, handleShow]);

  const eventsGesture = useMemo(() => {
    return {
      onSwipeComplete: handleSwipeComplete,
    };
  }, [handleSwipeComplete]);

  const {init, enter, exit} = useAnimation({...store, events: eventsAnimation});

  useEffect(() => {
    if (!visible) return;
    init();
  }, [init, visible]);

  useEffect(() => {
    if (!visible && !mount.current) return;
    if (visible) enter();
    else exit();
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

  useDimensionEffect(size => {
    store.size.value = {width: size.width, height: size.height};
  }, []);

  return (
    <ModalNative
      visible={_visible}
      transparent={true}
      animationType={'none'}
      onRequestClose={onBackPressEvent}
      {...rest}>
      <GestureHandlerRootView style={styles.root}>
        <ModalProvider value={store}>
          <Backdrop {...backdrop} touch={{onPress: onBackdropPressEvent}} />
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
