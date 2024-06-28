/* eslint-disable @typescript-eslint/no-unused-vars */
import Toast from 'react-native-toast-message';

class ToastUtil {

  showToast = (message: any) => {
    Toast.show({
      type: message.type,
      text1: message.content
    });
  }

}

const toastUtil = new ToastUtil();

export default toastUtil;
