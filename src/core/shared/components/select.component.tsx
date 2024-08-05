import React, { useState } from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import ListUtil from "../../utils/list.util.ts";

const ISelect = ({ selectedValue, list, onValueChange, bindID = 'value', bindLabel = 'label'  }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(ListUtil.findItem(list, selectedValue, bindID));
  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
        <Text style={styles.buttonText}>{ selectedItem[bindLabel] }</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {list.map((item: any) => (
              <TouchableOpacity
                key={item[bindID]}
                onPress={() => { selectedValue = item[bindID]; setSelectedItem(item); onValueChange(item[bindID]); setModalVisible(false); }}
                style={styles.option}
              >
                <Text style={styles.optionText}>{item[bindLabel]}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  option: {
    padding: 10,
  },
  optionText: {
    fontSize: 18,
  },
});

export default ISelect;
