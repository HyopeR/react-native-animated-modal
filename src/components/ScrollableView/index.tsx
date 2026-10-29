import React from 'react';
import {ScrollView, ScrollViewProps} from 'react-native';
import Animated from 'react-native-reanimated';
import {ScrollableViewNs} from './index.type';

type ScrollViewRendererProps = ScrollViewProps & {
  renderScrollComponent?: (
    props: ScrollViewProps & {ref?: React.Ref<ScrollView>},
  ) => React.JSX.Element;
};

// Unlike the list components, ScrollView doesn't support `renderScrollComponent` natively.
// It is called here so that Scrollable can attach its gesture to the scroll view.
const ScrollViewRenderer = React.forwardRef(
  (props: ScrollViewRendererProps, ref: React.Ref<ScrollView>) => {
    const {renderScrollComponent, ...rest} = props;
    if (renderScrollComponent) {
      return renderScrollComponent({...rest, ref});
    }
    return <ScrollView ref={ref} {...rest} />;
  },
);

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollViewRenderer);

/**
 * ScrollView component in react-native wrapped with reanimated.
 */
const ScrollableView = React.forwardRef(
  (props: ScrollViewProps, ref: React.Ref<ScrollView>) => {
    // @ts-ignore
    return <AnimatedScrollView ref={ref} {...props} />;
  },
) as (
  props: ScrollViewProps & {ref?: React.Ref<ScrollView>},
) => React.ReactElement;

export {ScrollableView};
export type {ScrollableViewNs};
