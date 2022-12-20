import { STORAGEKEY } from "../auth";

/**
 * This util is for get and set token and user related data
 * For get & set user and token related stuff.
 *
 * @author Pratik Shihora <pratik@saeculumsolutions.com>
 *
 * Notes:-
 * Date: 02/10/2020 (Pratik Shihora <pratik@saeculumsolutions.com>) initially created token storage util
 */
export class TokenUtil {
  /**
    * Set access token
    * @param token {string} : token used for store in local storage
    * @returns TokenStorage
    */
  public static setAccessToken(token: string): void {
    localStorage.setItem(btoa('accessToken'), token);
  }

  /**
  * Get Access Token
  * @returns token {string}
  */
  public static getAccessToken(): string | null {
    const token: string | null = localStorage.getItem(btoa('accessToken'));
    return token;
  }

  /**
    * Get Business Id
    * @returns userId {string}
    */
  public static getUniqueId(): string {
    const uniqueId: string = localStorage.getItem(btoa('uniqueId')) as string;
    if (!!(uniqueId && !uniqueId.includes('undefined') && !uniqueId.includes('null'))) {
      return uniqueId;
    }
    return undefined;
  }

  /**
    * Set Business Id
    * @returns TokenStorage
    */
  public static setUniqueId(uniqueId: string): void {
    localStorage.setItem(btoa('uniqueId'), uniqueId);
  }

  /**
    * Validate Access Token
    * @returns token {string}
    */
  public static validateAccessToken(): boolean {
    const token: string | null = this.getAccessToken();
    return !!(token && !token.includes('undefined') && !token.includes('null'));
  }

  /**
    * Clear LocalStorage
    * @returns void
    */
  public static clear() {
    localStorage.clear();
  }

  /**
    * Clear Session LocalStorage
    * @returns void
    */
  public static clearSession() {
    localStorage.removeItem('user');
    localStorage.removeItem(btoa('uniqueId'));
    localStorage.removeItem(btoa('accessToken'));
  }

  /**
    * Get user image
    * @returns void
    */
  public static getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  /**
   * Sett user image
   * @returns void
   */
  public static setUser(user) {
    return localStorage.setItem('user', JSON.stringify(user));
  }
}
