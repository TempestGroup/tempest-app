// Loader.js
import React, { useEffect, useState } from "react";
import { View, Modal, ActivityIndicator, StyleSheet } from 'react-native';
import blockUI from "../../utils/block-ui.util.ts";

const ILoader = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleShow = () => setVisible(true);
    const handleHide = () => setVisible(false);

    blockUI.on('show', handleShow);
    blockUI.on('hide', handleHide);

    return () => {
      blockUI.off('show', handleShow);
      blockUI.off('hide', handleHide);
    };
  }, []);
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={visible}
      onRequestClose={() => { console.log('close modal') }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={visible}
            size="large"
            color="#0000ff" // Customize the color as needed
          />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#rgba(0, 0, 0, 0.5)'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ILoader;
