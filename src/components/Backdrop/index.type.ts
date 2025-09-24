import {TouchableOpacityProps} from 'react-native';

export interface BackdropRequiredProps {
  enabled: boolean;
  backgroundColor: string;
  opacity: number;
}

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
