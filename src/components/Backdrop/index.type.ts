import {TouchableOpacityProps} from 'react-native';
import {BackdropNs} from '../../types';

export interface BackdropRequiredProps extends BackdropNs.ConfigPrivate {}

export interface BackdropPartialProps {
  touch?: TouchableOpacityProps;
}

export type BackdropProps = Partial<BackdropRequiredProps> &
  BackdropPartialProps;

export type BackdropDevelopmentProps = {};

export type BackdropPrivateProps = BackdropDevelopmentProps & BackdropProps;

export type BackdropPrivateStrictProps = BackdropDevelopmentProps &
  BackdropRequiredProps &
  BackdropPartialProps;
