import {Screen as ScreenBase, ScreenProps as ScreenBaseProps} from './Screen';
import {Header as HeaderBase, HeaderProps as HeaderBaseProps} from './Header';
import {
  Content as ContentBase,
  ContentProps as ContentBaseProps,
} from './Content';

export namespace ScreenNs {
  export type ScreenProps = ScreenBaseProps;
  export type HeaderProps = HeaderBaseProps;
  export type ContentProps = ContentBaseProps;
}

export const Screen = Object.assign(ScreenBase, {
  Header: HeaderBase,
  Content: ContentBase,
});
