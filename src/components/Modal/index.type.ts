import {ReactNode} from 'react';
import {
  ModalPropsIOS,
  ModalPropsAndroid,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {AnimationNs, BackdropNs, SwipeNs} from '../../types';

type ModalIosProps = Pick<
  ModalPropsIOS,
  'onOrientationChange' | 'supportedOrientations'
>;
type ModalAndroidProps = Pick<ModalPropsAndroid, 'hardwareAccelerated'>;

/**
 * Props for the Modal component.
 * This is the type intended for end-user usage. All properties are optional.
 */
export type ModalProps = Partial<ModalRequiredProps> & ModalPartialProps;

/**
 * @internal
 * Props that always have initial values even if the user leaves them empty.
 */
export interface ModalRequiredProps {
  /**
   * The visible prop determines whether your modal is visible.
   * @default false
   */
  visible: boolean;
  /**
   * Should the status bar be translucent.
   * @default true
   */
  statusBarTranslucent: boolean;
  /**
   * Should the navigation bar be translucent.
   * @default true
   */
  navigationBarTranslucent: boolean;
  /**
   * Callback fired when the modal is shown.
   */
  onShow: () => void;
  /**
   * Callback fired when the modal is hidden.
   */
  onHide: () => void;
  /**
   * Callback fired when the backdrop is pressed.
   */
  onBackdropPress: () => void;
  /**
   * Callback fired when the back button is pressed.
   */
  onBackPress: () => void;
  /**
   * Callback fired when a swipe gesture completes successfully.
   */
  onSwipeComplete: () => void;
  /**
   * Callback fired when a swipe gesture is canceled.
   */
  onSwipeCancel: () => void;
}

/**
 * @internal
 * Props that can be optionally provided by the user and are later filled with default values if missing.
 */
export interface ModalPartialProps extends ModalIosProps, ModalAndroidProps {
  /**
   * Animation configuration.
   * @default {type: 'fade', duration: 350}
   */
  animation?: AnimationNs.Config;
  /**
   * Swipe configuration.
   * @default {enabled: false, directions: [], distance: 120, velocity: 800, closable: false}
   */
  swipe?: SwipeNs.Config;
  /**
   * Backdrop configuration.
   * @default {enabled: true, opacity: 0.6, backgroundColor: 'black'}
   */
  backdrop?: BackdropNs.Config;
  /**
   * Children container style.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Modal children.
   */
  children?: ReactNode;
}

/** @internal */
export type ModalDevelopmentProps = {};

/** @internal */
export type ModalPrivateProps = ModalDevelopmentProps &
  Partial<ModalRequiredProps> &
  ModalPartialProps;

/** @internal */
export type ModalPrivateStrictProps = ModalDevelopmentProps &
  ModalRequiredProps &
  ModalPartialProps;
