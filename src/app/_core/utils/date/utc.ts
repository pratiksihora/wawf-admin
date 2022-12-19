// EXTERNAL DEPENDENCY
import * as  momentTimeZone from 'moment-timezone';

// UTILS

export class UTCDateUtil {

  /**
   * Get time in utc
   * @returns {string} payload date time format in string
   */
  static current() {
    return momentTimeZone().utc();
  }


  static dateToUTC(date) {
    return momentTimeZone(date).utc();
  }

}