import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";


const IButton = ({ title, onPress }: any) => {
  return (
    <TouchableOpacity style={ styles.button } onPress={onPress}>
      <Text style={ styles.buttonText }>{title}</Text>
    </TouchableOpacity>
  );
};

const styles: any = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default IButton;
