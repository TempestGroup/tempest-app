/* eslint-disable no-trailing-spaces */
class StringUtil {

  static isEmpty(s: string | null | undefined) {
    return s == '' || s == null || s == undefined;
  }

  static isNotEmpty(s: string | null | undefined) {
    return !this.isEmpty(s);
  }

  static getNumberOfLines(s: string) {
    if (this.isEmpty(s)) {
      return 0;
    }
    if (!s.includes('\n')) {
      return 1;
    }
    return s.split('\n').length;
  }

}

export default StringUtil;
