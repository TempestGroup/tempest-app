import React from 'react';
import { Text, View } from "react-native";
import StorageUtil from "../../../../core/utils/storage.util.ts";

const HomeComponent = () => {
  return (
    <View>
      <Text>{StorageUtil.getString(StorageUtil.USER_ACCESS_TOKEN)}</Text>
    </View>
  );
}

export default HomeComponent;
