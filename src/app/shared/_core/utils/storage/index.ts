import { DefaultConstant } from "src/app/shared/constants/enums/core/default.enum";

export class StorageUtil {
  /**
   * @static
   * To set the timezone of the user
   * @param {string} timeZone
   * @returns default timezone or sessionStorage timezone
   */
  static setTimeZone(timeZone: string) {
    sessionStorage.setItem('timezone', (timeZone || DefaultConstant.TIMEZONE));
  }

  /**
   * @static
   * To set the date format of the user to use it throughout the website
   * @param {string} dateFormat
   * @returns default timezone or sessionStorage timezone
   */
  static setDateFormat(dateFormat: string) {
    sessionStorage.setItem('dateformat', (dateFormat || DefaultConstant.LOCAL_DATE_FORMAT));
  }

  /**
   * To set the timeformat of the user
   * @param timeFormat
   */
  static setTimeFormat(timeFormat: string) {
    let format = timeFormat === '24' ? DefaultConstant.TIME_24_FORMAT : DefaultConstant.TIME_12_FORMAT;
    sessionStorage.setItem('timeformat', format);
  }

  /**
  * To set the timezone and format of the user
  * @param format
  */
  static setTimezoneAndFormat(format: any) {
    this.setTimeZone(format.tz);
    this.setDateFormat(format.date);
    this.setTimeFormat(format.time);
  }

  /**
   * To get the time format of the user
   */
  static getTimeFormat() {
    const timeFormat = sessionStorage.getItem('timeformat');
    return !!(timeFormat && !timeFormat.includes('undefined') && !timeFormat.includes('null')) ? timeFormat : DefaultConstant.TIME_12_FORMAT;
  }

  /**
   * To get the timezone of the user
   */
  static getTimeZone() {
    const timeZone = sessionStorage.getItem('timezone');
    return !!(timeZone && !timeZone.includes('undefined') && !timeZone.includes('null')) ? timeZone : DefaultConstant.TIMEZONE;
  }

  /**
  * To get the timezone date
  */
  static getSystemFormat() {
    return DefaultConstant.SYSTEM_DATETIME_FORMAT;
  }


  /**
  * To get the timezone date
  */
  static getDateTimeFormat() {
    return `${this.getDateFormat()} ${this.getTimeFormat()}`;
  }

  /**
 * To get the timezone date
 */
  static getFixLocalDateTimeFormat() {
    return DefaultConstant.LOCAL_DATETIME_FORMAT;
  }

  /**
* To get the timezone date
*/
  static getDateFormat() {
    const timeZone = sessionStorage.getItem('dateformat');
    return !!(timeZone && !timeZone.includes('undefined') && !timeZone.includes('null')) ? timeZone : DefaultConstant.LOCAL_DATE_FORMAT;
  }

}