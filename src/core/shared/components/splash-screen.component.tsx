import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import SharedPreferencesUtil from "../../utils/shared-preferences.util.ts";
import StringUtil from "../../utils/string.util.ts";
import StorageUtil from "../../utils/storage.util.ts";
// @ts-ignore
import { process } from 'react-native-dotenv';

const getRefreshOptions = (options: any = {}, token: string) => {
  let headers = {
    'Content-Type': 'application/json',
    Token: token,
    ...options.headers
  };
  return {
    method: 'POST',
    headers,
    ...options
  }
}

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      SharedPreferencesUtil.get(SharedPreferencesUtil.USER_MOBILE_TOKEN).then(value => {
        if (StringUtil.isEmpty(value)) {
          navigation.replace('login');
        } else {
          fetch(process.env.api_url + '/api/v1/auth/refresh', getRefreshOptions({}, `${value}`)).then(promise => {
            promise.json().then(response => {
              StorageUtil.save(StorageUtil.USER_ACCESS_TOKEN, response.token.accessToken);
              StorageUtil.save(StorageUtil.USER_REFRESH_TOKEN, response.token.refreshToken);
              navigation.replace('main');
            });
          });
        }
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TempestApp</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Set the background color
  },
  logo: {
    width: 200,
    height: 200, // Adjust the logo size
    marginBottom: 20,
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000', // Set the text color
  },
});

export default SplashScreen;
