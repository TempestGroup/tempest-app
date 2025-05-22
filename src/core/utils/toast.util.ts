import Toast from 'react-native-toast-message';

class ToastUtil {

  static showToast = (message: any, delay: number = 5000) => {
    Toast.show({
      type: message.status,
      text1: message.content,
      visibilityTime: delay
    });
  }

}

export default ToastUtil;
