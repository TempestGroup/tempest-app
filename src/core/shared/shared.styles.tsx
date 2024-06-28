import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

export const FlexView = styled.View`
  display: flex;
  padding: 25%;
  justify-content: center;
  align-items: center;
`;

export const HeaderText = styled.Text`
  font-size: 28px;
  font-weight: bold;
`;

export const SizedBox = ({line = 1}: any) => {
  return (
    <View>
      {Array.from({ length: line }).map((_, index) => (
        <Text key={index}>{'\n'}</Text>
      ))}
    </View>
  );
}
