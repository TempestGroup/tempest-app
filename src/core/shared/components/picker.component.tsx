import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const IPicker = ({ selectedValue, list, onValueChange, bindID = 'value', bindLabel = 'label' }: any) => {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.picker}
      >
        {list.map((item: any) => (
          <Picker.Item key={item[bindID]} label={item[bindLabel]} value={item[bindID]} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    width: 150,
  },
});

export default IPicker;
