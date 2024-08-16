import React, { useState } from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import ListUtil from "../../utils/list.util.ts";
import { useTranslation } from "react-i18next";
import IIcon from "./icon.component.tsx";

const ISelect = ({ selectedValue, list, onValueChange, bindID = 'value', bindLabel = 'label', translate = false  }: any) => {
  const { t }: any = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(ListUtil.findItem(list, selectedValue, bindID));
  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
        <Text style={styles.buttonText}>{ translate ? t(selectedItem[bindLabel]) : selectedItem[bindLabel] }</Text>
        <IIcon name={ modalVisible? 'chevron-up-outline' : 'chevron-down-outline' } color={ 'black' } size={ 24 }/>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <IIcon name={ 'close' } color={ 'black' } size={ 24 }/>
            </TouchableOpacity>
            {list.map((item: any) => (
              <TouchableOpacity
                key={item[bindID]}
                onPress={() => { selectedValue = item[bindID]; setSelectedItem(item); onValueChange(item[bindID]); setModalVisible(false); }}
                style={styles.option}
              >
                <Text style={styles.optionText}>{ translate ? t(item[bindLabel]) : item[bindLabel]}</Text>
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    padding: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
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
