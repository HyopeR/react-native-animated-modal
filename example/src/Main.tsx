import React, {useMemo, useState} from 'react';
import {List} from './List';
import {
  HomePage,
  AnimationPage,
  BackdropPage,
  SwipePage,
  FlatListPage,
  ScrollViewPage,
  SectionListPage,
  PageSection,
} from './pages';

const Pages: PageSection[] = [
  {
    title: 'Foundation Features',
    data: [
      {title: 'Animation Playground', name: 'Animation', section: 0},
      {title: 'Backdrop Playground', name: 'Backdrop', section: 0},
      {title: 'Swipe Playground', name: 'Swipe', section: 0},
    ],
  },
  {
    title: 'Scrollable Features',
    data: [
      {title: 'FlatList Playground', name: 'FlatList', section: 1},
      {title: 'ScrollView Playground', name: 'ScrollView', section: 1},
      {title: 'SectionList Playground', name: 'SectionList', section: 1},
    ],
  },
];

export const Main = () => {
  const [name, setName] = useState('Home');

  const Page = useMemo(() => {
    switch (name) {
      case 'Animation':
        return AnimationPage;
      case 'Backdrop':
        return BackdropPage;
      case 'Swipe':
        return SwipePage;
      case 'FlatList':
        return FlatListPage;
      case 'ScrollView':
        return ScrollViewPage;
      case 'SectionList':
        return SectionListPage;
      default:
        return null;
    }
  }, [name]);

  if (Page) {
    return <Page back={() => setName('Home')} />;
  }

  return (
    <HomePage>
      <List sections={Pages} set={setName} />
    </HomePage>
  );
};
