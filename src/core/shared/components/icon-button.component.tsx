import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import IIcon from "./icon.component.tsx";

const IIconButton = ({ icon, color, size, onPress, ...rest }: any) => {
  return (
    <TouchableOpacity style={ styles.button } onPress={onPress}>
      <IIcon name={icon} color={color} size={size} {...rest}></IIcon>
    </TouchableOpacity>
  );
};

const styles: any = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default IIconButton;
