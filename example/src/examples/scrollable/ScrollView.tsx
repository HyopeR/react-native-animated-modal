import React, {useMemo, useRef} from 'react';
import {Text, useWindowDimensions, View} from 'react-native';
import {
  Modal,
  Scrollable,
  ScrollableView,
  ScrollableViewNs,
} from 'react-native-animated-modal';
import {Button} from '../../commons/Button';
import {styles} from '../styles';
import {ModalExampleProps} from '../types';

export const ScrollViewModal = ({visible, setVisible}: ModalExampleProps) => {
  const ref = useRef<ScrollableViewNs.Ref>(null);

  const {width, height} = useWindowDimensions();

  const landscape = useMemo(() => width > height, [width, height]);

  return (
    <Modal
      visible={visible}
      supportedOrientations={['portrait', 'landscape']}
      onHide={() => setVisible(false)}
      onSwipeComplete={() => setVisible(false)}
      animation={{type: 'slide', direction: {start: 'up', end: 'down'}}}
      swipe={{enabled: true, directions: ['up', 'down', 'left', 'right']}}>
      <View
        style={{
          ...styles.container,
          height: landscape ? height * 0.85 : height * 0.55,
        }}>
        <Text style={styles.title}>ScrollView Example</Text>

        <Scrollable
          // Determine the orientation of the list.
          orientation={'vertical'}
          // Listen to the list's callbacks.
          onScroll={() => {}}
          onBeginDrag={() => {}}
          onEndDrag={() => {}}
          onMomentumBegin={() => {}}
          onMomentumEnd={() => {}}>
          {options => {
            return (
              <ScrollableView ref={ref} {...options}>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean vitae lobortis justo. Nullam imperdiet efficitur velit
                  in rutrum. Nunc accumsan pulvinar est, et consectetur libero
                  egestas nec. Duis maximus ornare felis. Sed eleifend tortor ac
                  lectus bibendum, nec faucibus ipsum ullamcorper. Maecenas nunc
                  orci, dapibus sit amet mauris ac, interdum iaculis lacus.
                  Praesent lobortis metus vitae eros porttitor feugiat.
                  Phasellus dapibus porttitor augue. Mauris suscipit turpis eu
                  risus ornare efficitur. Aenean non erat in enim ullamcorper
                  cursus sed eget risus. Donec facilisis felis ac ante auctor
                  viverra. Mauris vestibulum venenatis porta. Donec porttitor
                  metus eleifend est finibus, in varius nisl vulputate. Vivamus
                  sed suscipit lorem. Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Aenean vitae lobortis justo. Nullam imperdiet
                  efficitur velit in rutrum. Nunc accumsan pulvinar est, et
                  consectetur libero egestas nec. Duis maximus ornare felis. Sed
                  eleifend tortor ac lectus bibendum, nec faucibus ipsum
                  ullamcorper. Maecenas nunc orci, dapibus sit amet mauris ac,
                  interdum iaculis lacus. Praesent lobortis metus vitae eros
                  porttitor feugiat. Phasellus dapibus porttitor augue. Mauris
                  suscipit turpis eu risus ornare efficitur. Aenean non erat in
                  enim ullamcorper cursus sed eget risus. Donec facilisis felis
                  ac ante auctor viverra. Mauris vestibulum venenatis porta.
                  Donec porttitor metus eleifend est finibus, in varius nisl
                  vulputate. Vivamus sed suscipit lorem.
                </Text>
              </ScrollableView>
            );
          }}
        </Scrollable>

        <View style={styles.action}>
          <Button title="Close" onPress={() => setVisible(false)} />
        </View>
      </View>
    </Modal>
  );
};
