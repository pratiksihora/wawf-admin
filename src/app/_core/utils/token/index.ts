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
    * Set refresh token
    * @param token {string} : token used for store in local storage
    * @returns TokenStorage
    */
  public static setRefreshToken(token: string): void {
    localStorage.setItem(btoa('refreshToken'), token);
  }

  /**
    * Set Super Admin state
    * @param isSuperAdmin {string} : isSuperAdmin used for store in local storage for super admin role
    * @returns TokenStorage
    */
  public static setIsAdmin(isSuperAdmin: string): void {
    localStorage.setItem(btoa('isSuperAdmin'), isSuperAdmin);
  }

  /**
    * Get Business Id
    * @returns userId {string}
    */
  public static getBsId(): string {
    const bsId: string = sessionStorage.getItem(btoa('bsId')) as string;
    if (!!(bsId && !bsId.includes('undefined') && !bsId.includes('null'))) {
      return bsId;
    }
    return undefined;
  }

  /**
    * Set Business Id
    * @returns TokenStorage
    */
  public static setBsId(bsId: string): void {
    sessionStorage.setItem(btoa('bsId'), bsId);
  }

  /**
   * Get WsToken
   * @returns Wsif {string}
   */
  public static getWsId(): string {
    const wsId: string = sessionStorage.getItem(btoa('wsId')) as string;
    if (!!(wsId && !wsId.includes('undefined') && !wsId.includes('null'))) {
      return wsId;
    }
    return undefined;
  }

  /**
    * Set User  Business Id
    * @param userName {string} : userName used for store in local storage
    * @returns TokenStorage
    */
  public static setWsId(wsId: string): void {
    sessionStorage.setItem(btoa('wsId'), wsId);
  }

  /**
 * Get CapToken
 * @returns Wsif {string}
 */
  public static getCmpId(): string {
    const cmpId: string = sessionStorage.getItem(btoa('cmpId')) as string;
    if (!!(cmpId && !cmpId.includes('undefined') && !cmpId.includes('null'))) {
      return cmpId;
    }
    return undefined;
  }

  /**
    * Set User  Business Id
    * @param userName {string} : userName used for store in local storage
    * @returns TokenStorage
    */
  public static setCmpId(cmpId: string): void {
    sessionStorage.setItem(btoa('cmpId'), cmpId);
  }

  /**
 * Get User Business Id
 * @returns userId {string}
 */
  public static getUbId(): string {
    const ubId: string = sessionStorage.getItem(btoa('ubId')) as string;
    if (!!(ubId && !ubId.includes('undefined') && !ubId.includes('null'))) {
      return ubId;
    }
    return undefined;
  }

  /**
    * Set User  Business Id
    * @param userName {string} : userName used for store in local storage
    * @returns TokenStorage
    */
  public static setUbId(ubId: string): void {
    sessionStorage.setItem(btoa('ubId'), ubId);
  }


  /**
   * Get hubspot popup status
   */
   public static getHubspotStatus(): string {
    return  localStorage.getItem(btoa('hubspot')) as string;
  }

  /**
   * Set hubspot popup status
   */
   public static setHubspotStatus(status) {
    localStorage.setItem(btoa('hubspot'), status) ;
  }

  /**
   * remove hubspot popup status
   */
   public static removeHubspotStatus() {
    localStorage.removeItem(btoa('hubspot')) ;
    return this;
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
  * Get Permissions
  * @returns permissions {string[]}
  */
  public static getPermissions(): string[] {
    const permissions = localStorage.getItem(btoa('permissions'));
    const token = JSON.parse(!!permissions ? atob(permissions) : '[]');
    return token;
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
    * Get user image
    * @returns void
    */
   public static getUbDetails() {
    return JSON.parse(localStorage.getItem(STORAGEKEY.USER_BUSINESS_DETAIL));
  }
}
