import {ReactNode} from 'react';
import {
  ModalPropsIOS,
  ModalPropsAndroid,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {BackdropProps} from '../Backdrop';
import {AnimationNs, SwipeNs} from '../../types';

type ModalIosProps = Pick<
  ModalPropsIOS,
  'onOrientationChange' | 'supportedOrientations'
>;
type ModalAndroidProps = ModalPropsAndroid;

export interface ModalRequiredProps {
  visible: boolean;
  statusBarTranslucent: boolean;
  navigationBarTranslucent: boolean;
  onShow: () => void;
  onHide: () => void;
  onBackdropPress: () => void;
  onBackPress: () => void;
  onSwipeComplete: () => void;
}

export interface ModalPartialProps extends ModalIosProps, ModalAndroidProps {
  animation?: AnimationNs.Config;
  swipe?: SwipeNs.Config;
  backdrop?: Omit<BackdropProps, 'touch'>;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export type ModalProps = Partial<ModalRequiredProps> & ModalPartialProps;

export type ModalDevelopmentProps = {};

export type ModalPrivateProps = ModalDevelopmentProps & ModalProps;

export type ModalPrivateStrictProps = ModalDevelopmentProps &
  ModalRequiredProps &
  ModalPartialProps;
