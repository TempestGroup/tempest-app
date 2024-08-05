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
import enums from "../../../core/enums/enums.ts";
import StorageUtil from "../../../core/utils/storage.util.ts";
import ApiConfig from "../../../core/configs/api.config.ts";
import SharedPreferencesUtil from "../../../core/utils/shared-preferences.util.ts";


const LoginComponent = ({ navigation }: any) => {
  const [request, setRequest] = useState(new LoginRequest());

  const getRefreshOptions = (method: string = 'POST', options: any = {}, withToken: boolean = true, token: string) => {
    let headers = {
      'Content-Type': 'application/json',
      Language: 'ru',
      ...options.headers
    };
    if (withToken) {
      headers.Token = token;
    }
    return {
      method: method,
      headers,
      ...options
    }
  }

  const handleSubmit = async () => {
    blockUiUtil.show();
    authService.login(request).then(async response => {
      if (response.message.status == enums.MessageStatus.ERROR) {
        toastUtil.showToast(response.message);
        blockUiUtil.hide();
      } else {
        SharedPreferencesUtil.set(SharedPreferencesUtil.USER_MOBILE_TOKEN, response.token.mobileToken).then(ignored => {
          StorageUtil.save(StorageUtil.USER_ACCESS_TOKEN, response.token.accessToken);
          StorageUtil.save(StorageUtil.USER_REFRESH_TOKEN, response.token.refreshToken);
          toastUtil.showToast(response.message);
          blockUiUtil.hide();
          navigation.navigate('main');
        });
      }
    });
    //navigation.navigate('main');
  }

  return (
    <SafeAreaView>
      <View>
        <FlexView>
          <HeaderText>Login page</HeaderText>
          <SizedBox line={4}/>
          <ITextField placeholder={'Email'} textContentType={'email'} value={request.username}
                              onChangeText={(username: string) => setRequest({ ...request, username })}/>
          <ITextField placeholder={'Password'} textContentType={'password'} value={request.password}
                              onChangeText={(password: string) => setRequest({ ...request, password })} />
          <IButton title="Sign in" onPress={handleSubmit}/>
          <SizedBox line={2}/>
          <TouchableOpacity onPress={() => navigation.navigate('register')}><Text>Do not have an account?</Text></TouchableOpacity>
        </FlexView>
      </View>
    </SafeAreaView>
  );
}

export default LoginComponent;
