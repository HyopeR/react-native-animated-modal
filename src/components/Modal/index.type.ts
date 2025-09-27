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

export interface ModalRequiredProps {
  visible: boolean;
  statusBarTranslucent: boolean;
  navigationBarTranslucent: boolean;
  onShow: () => void;
  onHide: () => void;
  onBackdropPress: () => void;
  onBackPress: () => void;
  onSwipeComplete: () => void;
  onSwipeCancel: () => void;
}

export interface ModalPartialProps extends ModalIosProps, ModalAndroidProps {
  animation?: AnimationNs.Config;
  swipe?: SwipeNs.Config;
  backdrop?: BackdropNs.Config;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export type ModalProps = Partial<ModalRequiredProps> & ModalPartialProps;

export type ModalDevelopmentProps = {};

export type ModalPrivateProps = ModalDevelopmentProps &
  Partial<ModalRequiredProps> &
  ModalPartialProps;

export type ModalPrivateStrictProps = ModalDevelopmentProps &
  ModalRequiredProps &
  ModalPartialProps;
