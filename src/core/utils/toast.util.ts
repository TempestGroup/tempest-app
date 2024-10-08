/* eslint-disable @typescript-eslint/no-unused-vars */
import Toast from 'react-native-toast-message';

class ToastUtil {

  // showToast = (message: any) => {
  //   Toast.show({
  //     type: message.status,
  //     text1: message.content
  //   });
  // }

  showToast = (message: any, delay: number = 5000) => {
    Toast.show({
      type: message.status,
      text1: message.content,
      visibilityTime: delay
    });
  }

}

const toastUtil = new ToastUtil();

export default toastUtil;
