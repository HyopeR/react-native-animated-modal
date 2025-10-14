import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {Screen} from './commons/Screen';
import {List, ListSection} from './List';

import {FadeModal} from './examples/basic/Fade';
import {ScaleModal} from './examples/basic/Scale';
import {SlideModal} from './examples/basic/Slide';
import {SwipeModal} from './examples/basic/Swipe';
import {PropertyModal} from './examples/basic/Property';
import {FlatListModal} from './examples/scrollable/FlatList';
import {ScrollViewModal} from './examples/scrollable/ScrollView';
import {SectionListModal} from './examples/scrollable/SectionList';

export const Main = () => {
  const [showFade, setShowFade] = useState(false);
  const [showScale, setShowScale] = useState(false);
  const [showSlide, setShowSlide] = useState(false);
  const [showSwipe, setShowSwipe] = useState(false);
  const [showProperty, setShowProperty] = useState(false);
  const [showFlatList, setShowFlatList] = useState(false);
  const [showScrollView, setShowScrollView] = useState(false);
  const [showSectionList, setShowSectionList] = useState(false);

  const sections: ListSection[] = [
    {
      title: 'Basic Usage',
      data: [
        {title: 'Fade Usage', onPress: setShowFade, section: 0},
        {title: 'Scale Usage', onPress: setShowScale, section: 0},
        {title: 'Slide Usage', onPress: setShowSlide, section: 0},
        {title: 'Swipe Usage', onPress: setShowSwipe, section: 0},
        {title: 'Property Usage', onPress: setShowProperty, section: 0},
      ],
    },
    {
      title: 'Scrollable Usage',
      data: [
        {title: 'FlatList Usage', onPress: setShowFlatList, section: 1},
        {title: 'ScrollView Usage', onPress: setShowScrollView, section: 1},
        {title: 'SectionList Usage', onPress: setShowSectionList, section: 1},
      ],
    },
  ];

  return (
    <Screen>
      <Screen.Header height={60}>
        <StatusBar
          barStyle={'dark-content'}
          translucent={true}
          backgroundColor={'white'}
        />
        <Screen.Title>React Native Animated Modal</Screen.Title>
        <Screen.Subtitle>Examples</Screen.Subtitle>
      </Screen.Header>

      <Screen.Content>
        <List sections={sections} />
      </Screen.Content>

      <FadeModal visible={showFade} setVisible={setShowFade} />
      <ScaleModal visible={showScale} setVisible={setShowScale} />
      <SlideModal visible={showSlide} setVisible={setShowSlide} />
      <SwipeModal visible={showSwipe} setVisible={setShowSwipe} />
      <PropertyModal visible={showProperty} setVisible={setShowProperty} />
      <FlatListModal visible={showFlatList} setVisible={setShowFlatList} />
      <ScrollViewModal
        visible={showScrollView}
        setVisible={setShowScrollView}
      />
      <SectionListModal
        visible={showSectionList}
        setVisible={setShowSectionList}
      />
    </Screen>
  );
};
