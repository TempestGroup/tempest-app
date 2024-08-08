import React from "react";
import IIcon from "./icon.component.tsx";
import { StyleSheet, TouchableOpacity } from "react-native";

const FloatButton = ({ icon, color = 'black', size = 35, onPress, ...rest }: any) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <IIcon name={icon} color={color} size={size} {...rest} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: 'blue', // Adjust color if needed
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
});

export default FloatButton;
