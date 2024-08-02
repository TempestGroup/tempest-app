class RestUtil {
  static getFormData(request: any) {
    let formData = new FormData();
    Object.keys(request).map((key) => {
      if (request[key]) {
        if (request[key].uri && request[key].type) {
          formData.append(key, {
            uri: request[key].uri,
            name: request[key].name,
            type: request[key].type
          });
        } else {
          formData.append(key, request[key]);
        }
      }
    });
    return formData;
  }
}

export default RestUtil;
