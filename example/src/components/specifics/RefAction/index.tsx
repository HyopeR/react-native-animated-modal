import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from '../../commons';

export namespace RefActionNs {
  export type Props<T> = {
    target: React.RefObject<T | null>;
    actions: Action<T>[];
  };

  export type Action<T> = {
    title: string;
    run: (current: T) => void;
  };
}

/**
 * Buttons that call methods on a list/scroll reference.
 * Warns when the reference is not attached, so broken ref forwarding is easy to spot.
 */
export const RefAction = <T,>({target, actions}: RefActionNs.Props<T>) => {
  const handle = (action: RefActionNs.Action<T>) => {
    const current = target.current;
    if (!current) {
      console.warn(`[RefActions] "${action.title}": ref is null.`);
      return;
    }
    action.run(current);
  };

  return (
    <View style={styles.root}>
      {actions.map(action => (
        <Button
          key={action.title}
          title={action.title}
          style={styles.button}
          onPress={() => handle(action)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  button: {
    flex: 1,
    height: 32,
  },
});
