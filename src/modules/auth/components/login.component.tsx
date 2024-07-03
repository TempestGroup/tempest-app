import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlexView, HeaderText, SizedBox } from "../../../core/shared/shared.styles";
import LoginRequest from "../dtos/login-request.dto.ts";
import ITextField from "../../../core/shared/components/text-field.component.tsx";
import IButton from "../../../core/shared/components/button.component.tsx";
import blockUiUtil from "../../../core/utils/block-ui.util.ts";
import toastUtil from "../../../core/utils/toast.util.ts";
import authService from "../../../core/services/auth.service.ts";


const LoginComponent = ({ navigation }: any) => {
  const [request, setRequest] = useState(new LoginRequest());

  const handleSubmit = () => {
    authService.login(request).then(response => {
      console.log(response)
      toastUtil.showToast(response);
    })
    // blockUiUtil.show();
    //
    // toastUtil.showToast({ content: 'SHadik tazik', type: 'WARNING' })
    //
    // setTimeout(() => {
    //   blockUiUtil.hide();
    // }, 1000);

    navigation.navigate('main');
  }

  return (
    <SafeAreaView>
      <View>
        <FlexView>
          <HeaderText>Login page</HeaderText>
          <SizedBox line={4}/>
          <ITextField placeholder={'Username'} textContentType={'username'} value={request.username}
                              onChangeText={(username: string) => setRequest({ ...request, username })}/>
          <ITextField placeholder={'Password'} textContentType={'password'} value={request.password}
                              onChangeText={(password: string) => setRequest({ ...request, password })} />
          <IButton title="Login" onPress={handleSubmit}/>
        </FlexView>
      </View>
    </SafeAreaView>
  );
}

export default LoginComponent;
