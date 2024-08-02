import * as ImagePicker from "react-native-image-picker";

class FileUtil {
  static isFile(obj: any): obj is IFile {
    return (obj &&
      typeof obj === 'object' &&
      typeof obj.uri === 'string' &&
      (!obj.type || typeof obj.type === 'string') &&
      (!obj.name || typeof obj.name === 'string'));
  }

  static handlePicker(mediaType: any) {
    ImagePicker.launchImageLibrary({ mediaType }, async (response: any) => {
      if (response.didCancel) {
        return null;
      } else if (response.error) {
        return null;
      } else if (response.customButton) {
        return null;
      } else {
        if (response.assets && response.assets.length > 0) {
          return {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName
          };
        } else {
          return null;
        }
      }
    });
  }


}

export default FileUtil;
