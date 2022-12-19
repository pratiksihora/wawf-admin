
export class CommonUtil {

  static removeHidden(data: any) {
    if (!data) { return {}; }

    const payload: any = {};
    Object.keys(data).forEach(key => {
      if (Array.isArray(data[key])) {
        payload[key] = data[key].map(x => this.removeHidden(x));
      } else if (typeof data[key] === 'object' && data[key] !== null) {
        payload[key] = this.removeHidden(data[key]);
      } else if (key.indexOf('_hidden') === -1 && key.indexOf('_upload') === -1) {
        payload[key] = data[key];
      }
    });
    return payload;
  }
}

