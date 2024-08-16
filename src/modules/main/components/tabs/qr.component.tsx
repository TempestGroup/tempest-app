import { Text, View } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";

const QRComponent = () => {
  const { t }: any = useTranslation();
  return (
    <View>
      <Text>Profile component</Text>
    </View>
  );
}

export default QRComponent;
