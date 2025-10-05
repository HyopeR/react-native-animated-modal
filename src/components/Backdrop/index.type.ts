import {TouchableOpacityProps} from 'react-native';

export type BackdropProps = Partial<BackdropRequiredProps> &
  BackdropPartialProps;

export interface BackdropRequiredProps {}

export interface BackdropPartialProps {
  touch?: TouchableOpacityProps;
}

export type BackdropDevelopmentProps = {};

export type BackdropPrivateProps = BackdropDevelopmentProps &
  Partial<BackdropRequiredProps> &
  BackdropPartialProps;

export type BackdropPrivateStrictProps = BackdropDevelopmentProps &
  BackdropRequiredProps &
  BackdropPartialProps;
