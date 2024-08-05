class RestUtil {
  static getFormData(request: any) {
    let formData = new FormData();
    Object.keys(request).map((key) => {
      if (request[key]) {
        formData.append(key, request[key]);
      }
    });
    return formData;
  }
}

export default RestUtil;
