import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BaseToast } from 'react-native-toast-message';
import enums from '../../enums/enums';
import StringUtil from "../../utils/string.util.ts";

const IToast = ({ text1, type, ...rest }: any) => (
  <BaseToast
    {...rest}
    style={{borderLeftColor: (type == 'SUCCESS') ? enums.ToastType.SUCCESS : ((type == 'WARNING') ? enums.ToastType.WARNING : enums.ToastType.ERROR)}}
    contentContainerStyle={styles.contentContainer}
    text1Style={styles.customText} text1={text1} text1Props={{ numberOfLines: (StringUtil.getNumberOfLines(text1) * 2), ellipsizeMode: 'tail' }} />
);

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  customContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  customText: {
    fontSize: 14,
    color: 'black',
  },
});

export default IToast;
