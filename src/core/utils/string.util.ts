/* eslint-disable no-trailing-spaces */
class StringUtil {

  static isEmpty(s: string | null | undefined) {
    return s == '' || s == null || s == undefined;
  }

  static isNotEmpty(s: string | null | undefined) {
    return !this.isEmpty(s);
  }

}

export default StringUtil;
