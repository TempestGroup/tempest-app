import React from "react";
import { SafeAreaView, Text } from "react-native";
import StorageUtil from "../../../../core/utils/storage.util.ts";

const HomeComponent = () => {
  return (
    <SafeAreaView>
      <Text>{StorageUtil.getString(StorageUtil.USER_MOBILE_TOKEN)}</Text>
      <Text>{StorageUtil.getString(StorageUtil.USER_REFRESH_TOKEN)}</Text>
      <Text>{StorageUtil.getString(StorageUtil.USER_ACCESS_TOKEN)}</Text>
    </SafeAreaView>
  );
}

export default HomeComponent;
