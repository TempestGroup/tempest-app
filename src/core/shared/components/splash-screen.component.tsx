import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import StringUtil from "../../utils/string.util.ts";
import StorageUtil from "../../utils/storage.util.ts";
// @ts-ignore
import { APIURL } from '@env';
import storageUtil from "../../utils/storage.util.ts";
import toastUtil from "../../utils/toast.util.ts";
import i18n from "../../configs/i18n.config.ts";
import enums from "../../enums/enums.ts";

const getOptions = (options: any = {}, token: string) => {
  let headers = {
    'Content-Type': 'application/json',
    'Device-Type': 'MOBILE',
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
      if (StringUtil.isEmpty(storageUtil.getString(storageUtil.USER_MOBILE_TOKEN))) {
        navigation.replace('login');
      } else {
        fetch(APIURL + '/api/v1/auth/refresh', getOptions({}, `${storageUtil.getString(storageUtil.USER_MOBILE_TOKEN)}`)).then(promise => {
          if (!promise.ok) {
            return promise.json().then(message => {
              toastUtil.showToast(message);
              navigation.replace('login');
            });
          }
          return promise.json().then(response => {
            StorageUtil.save(StorageUtil.USER_ACCESS_TOKEN, response.token.accessToken);
            StorageUtil.save(StorageUtil.USER_REFRESH_TOKEN, response.token.refreshToken);
            navigation.replace('main');
          });
        }).catch(error => {
          if (error instanceof TypeError && error.message === 'Network request failed') {
            toastUtil.showToast({ content: i18n.t('app.network.error'), status: enums.MessageStatus.ERROR }, 10000);
            navigation.replace('login');
          }
          throw error;
        });
      }
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
