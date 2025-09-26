import {ReactNode} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

export interface ContentRequiredProps {}

export interface ContentPartialProps {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export type ContentProps = Partial<ContentRequiredProps> & ContentPartialProps;

export type ContentDevelopmentProps = {};

export type ContentPrivateProps = ContentDevelopmentProps &
  Partial<ContentRequiredProps> &
  ContentPartialProps;

export type ContentPrivateStrictProps = ContentDevelopmentProps &
  ContentRequiredProps &
  ContentPartialProps;
