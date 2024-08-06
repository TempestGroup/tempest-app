import React from "react";
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ children, style }: any) => {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 10,
    // Add shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    // Add elevation for Android
    elevation: 3,
  },
});

export default Card;
