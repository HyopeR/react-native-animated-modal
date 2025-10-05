import {ReactNode} from 'react';
import {NativeSyntheticEvent, StyleProp, ViewStyle} from 'react-native';
import {AnimationNs, BackdropNs, SwipeNs} from '../../types';

/**
 * Props for the Modal component.
 * This is the type intended for end-user usage. All properties are optional.
 */
export type ModalProps = {
  /**
   * The visible prop determines whether your modal is visible.
   * @default false
   */
  visible?: boolean;
  /**
   * Callback fired when the modal is shown.
   */
  onShow?: () => void;
  /**
   * Callback fired when the modal is hidden.
   */
  onHide?: () => void;
  /**
   * Callback fired when the backdrop is pressed.
   */
  onBackdropPress?: () => void;
  /**
   * Callback fired when the back button is pressed.
   */
  onBackPress?: () => void;
  /**
   * Callback fired when a swipe gesture completes successfully.
   */
  onSwipeComplete?: () => void;
  /**
   * Callback fired when a swipe gesture is canceled.
   */
  onSwipeCancel?: () => void;
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

  // Android Props
  /**
   * Controls whether to force hardware acceleration for the underlying window.
   */
  hardwareAccelerated?: boolean;
  /**
   * Should the status bar be translucent.
   * @default true
   */
  statusBarTranslucent?: boolean;
  /**
   * Should the navigation bar be translucent.
   * @default true
   */
  navigationBarTranslucent?: boolean;

  // Ios Props
  /**
   * The supportedOrientations prop allows the modal to be rotated to any of the specified orientations.
   * On iOS, the modal is still restricted by what's specified in your app's Info.plist's
   * UISupportedInterfaceOrientations field.
   */
  supportedOrientations?: Array<
    | 'portrait'
    | 'portrait-upside-down'
    | 'landscape'
    | 'landscape-left'
    | 'landscape-right'
  >;
  /**
   * The onOrientationChange callback is called when the orientation changes while the modal is being displayed.
   * The orientation provided is only 'portrait' or 'landscape'.
   * This callback is also called on initial render, regardless of the current orientation.
   */
  onOrientationChange?: (event: NativeSyntheticEvent<any>) => void;
};

/**
 * Props that always have initial values even if the user leaves them empty.
 */
export type ModalRequiredProps = Required<
  Pick<
    ModalProps,
    | 'visible'
    | 'statusBarTranslucent'
    | 'navigationBarTranslucent'
    | 'onShow'
    | 'onHide'
    | 'onBackdropPress'
    | 'onBackPress'
    | 'onSwipeComplete'
    | 'onSwipeCancel'
  >
>;
/**
 * Props that can be optionally provided by the user and are later filled with default values if missing.
 */
export type ModalPartialProps = Pick<
  ModalProps,
  | 'animation'
  | 'swipe'
  | 'backdrop'
  | 'hardwareAccelerated'
  | 'onOrientationChange'
  | 'supportedOrientations'
  | 'style'
  | 'children'
>;

/** @internal */
export type ModalStrictProps = ModalRequiredProps & ModalPartialProps;
