import React from "react";
import { WebView } from 'react-native-webview';
import StorageUtil from "../../utils/storage.util.ts";

const WebService = ({ ...rest }: any) => {
  const runInjectedJS = (ref: any) => {
    const currentLanguage = StorageUtil.getString(StorageUtil.APP_LANGUAGE);
    const token = {
      accessToken: StorageUtil.getString(StorageUtil.USER_ACCESS_TOKEN),
      refreshToken: StorageUtil.getString(StorageUtil.USER_REFRESH_TOKEN)
    };
    ref.injectJavaScript(
      `localStorage.setItem('app.language', '${ currentLanguage }');\n` +
      `localStorage.setItem('app.device.type', 'MOBILE');\n` +
      `localStorage.setItem('user.token', '${ JSON.stringify(token) }');`
    );
  };
  return <WebView ref={(ref) => runInjectedJS(ref)} {...rest} />;
};

export default WebService;
