/**
 * This util is for get and set token and user related data
 * For get & set user and token related stuff.
 *
 * @author Pratik Shihora <pratik@saeculumsolutions.com>
 *
 * Notes:-
 * Date: 19/07/2020 (Pratik Shihora <pratik@saeculumsolutions.com>) initially created token storage util
 */

export const STORAGEKEY = {
    USER_BUSINESS_DETAIL: 'USER_BUSINESS_DETAIL',
};

export class AuthUtil {
    /**
      * Set access token
      * @param token {string} : token used for store in local storage
      * @returns TokenStorage
      */
    public static setUserBusiness(data: string): void {
        data = JSON.stringify(data);
        localStorage.setItem(STORAGEKEY.USER_BUSINESS_DETAIL, data);
    }

    /**
    * Set access token
    * @param token {string} : token used for store in local storage
    * @returns TokenStorage
    */
    public static getUserBusiness() {
        const businesesDetail: any = localStorage.getItem(STORAGEKEY.USER_BUSINESS_DETAIL);
        return history ? JSON.parse(businesesDetail) : [];
    }

    /**
      * Clear access token
      * @param token {string} : token used for store in local storage
      * @returns TokenStorage
      */
    clearUserBusiness() {
        return localStorage.removeItem(STORAGEKEY.USER_BUSINESS_DETAIL);
    }
}
