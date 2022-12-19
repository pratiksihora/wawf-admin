import { environment } from 'src/environments/environment';
import { get } from 'lodash';

// Enums and Interfaces
import { ApiModule, HttpMethod } from 'src/app/api/enums/api-module.enum';
import { ApiAction } from 'src/app/constants/models/api';

export class ApiUtil {
  static configurableDomain(domain: string | any) {
    return false;
  }
  /**
   * Get Api Url Method
   * @param domain {string}: domain base api base url
   * @returns Observable<ApiResponse>
   */
  static getApiUrl(domain: string | any, provider: string = null) {
    let apiUrl = '';
    return apiUrl;
  }

  /**
   * Set Api Url Method
   * @param domain {string}: domain for set domain base api url
   * @param url {string}: url for unique for domain
   * @returns void
   */
  static setApiConfigUrl(domain: string, url: string) {
    localStorage.setItem(btoa(domain), url);
  }

  /**
  * Get Api Url Method
  * @param domain {string}: domain for get domain base api url
  * @returns string
  */
  static getApiConfigUrl(domain: string | any): string | any {
    return localStorage.getItem(btoa(domain));
  }

  /**
   * Returns API path with append params values
   * @param queryParams : array of params that has to be replaced in the api path
   * @param payload: object of param's values it will replaced in the api path
   * @Input: getAppendParams('/testcase/1/teststep', ['test_id','user_id'], { test_id : 1, 'user_id': 2})
   * @Output: '/testcase/1/teststep?test_id=1&user_id=2'
   */
  static getAppendParams = (path: string, queryParams: Array<string>, payload: any) => {
    const params: any = [];
    queryParams.forEach(key => {
      if (payload[key] !== undefined) {
        params.push(key + '=' + payload[key]);
      }
    });

    return `${path}${params.length ? '?' : ''}${params.join('&')}`;
  }

  /**
     * Returns API path with replaces params values
     * @param path : string from API_PATH
     * @param replaceParams : array of params that has to be replaced in the api path
     * @param payload: object of param's values it will replaced in the api path
     * @Input: getReplaceParams('/testcase/{{test_id}}/teststep', ['test_id'], { test_id : 1})
     * @Output: '/testcase/1/teststep'
     */
  static getReplaceParams = (path: string, replaceParams: Array<string>, payload: any) => {
    replaceParams.forEach(key => {
      key = key.replace('{{', '').replace('}}', '');
      path = path.split(`{{${key}}}`)
        .join(payload[key] || '');
    });
    return path;
  }

  /**
  * Returns API Url with append and replace params values with prepand domain
  * @param domain : string from domain
  * @param path : string from API_PATH
  * @param payload: object of param's values it will replaced in the api path
  * @param replaceParams : array of params that has to be replaced in the api path
  * @param queryParams : array of params that has to be replaced in the api path
  * @param configure : true when dynamically configure urls
  * @Input: getFullApiUrl('auth', '/testcase/{{test_id}}/teststep', { test_id : 1, 'user_id': 2, abc_id: 3 }, ['test_id'], ['abc_id','user_id'])
  * @Output: 'https://auth.domain.com/testcase/1/teststep?abc_id=3&user_id=2'
  */
  static getFullApiUrl(config?: ApiAction, payload?: any) {
    let domain = '';
    let url = '';
    if (config.fullUrl) {
      url = config.fullUrl;
    } else {
      domain = this.configurableDomain(config?.module) ? this.getApiConfigUrl(config?.module) : this.getApiUrl(config?.module, config?.thirdParty);
      url = this.makeAPiUrl(config);
    }

    const keywords = url.match(/{{(.*?)\}}/g);
    if (keywords?.length) {
      url = this.getReplaceParams(url, keywords, payload);
    }

    if (config?.queryParams?.length) {
      url = this.getAppendParams(url, config?.queryParams, payload);
    }

    return `${domain}${url}`;
  }

  static makeAPiUrl(config?: ApiAction) {
    let url = config?.url;
    if (!url) {
      url = `/api/v${config?.version || 1}/${config?.module}${config.method ? ('/' + config.method) : ''}`
    }
    return url;
  }

  static configureGet(payload): ApiAction {
    return {
      ... this.configurePost(payload),
      httpMethod: HttpMethod.GET,
    }
  }

  static configurePost(payload): ApiAction {
    const { url, module, response, title, success, error, promise, queryParams, skipPayload, skipCToken } = payload;

    let notiConfig: any = {};

    if (success) {
      notiConfig = {
        title: title,
        success: success
      }
    }

    if (error) {
      notiConfig.title = notiConfig.title || title;
      notiConfig.error = error;
    }

    return {
      url,
      httpMethod: HttpMethod.POST,
      module: module || ApiModule.BUSINESS,
      response,
      promise,
      queryParams,
      skipPayload,
      skipCToken,
      ...notiConfig
    }
  }

  static configurePatch(payload): ApiAction {
    return {
      ... this.configurePost(payload),
      httpMethod: HttpMethod.PATCH,
    }
  }

  static configurePut(payload): ApiAction {
    return {
      ... this.configurePost(payload),
      httpMethod: HttpMethod.PUT,
    }
  }

  static configurePutUpload(payload): ApiAction {
    return {
      ... this.configurePost(payload),
      httpMethod: HttpMethod.UPLOAD_PUT,
    }
  }

  static configureUpload(payload): ApiAction {
    return {
      ... this.configurePost(payload),
      httpMethod: HttpMethod.UPLOAD,
    }
  }

  static configureDelete(payload): ApiAction {
    return {
      ... this.configurePost(payload),
      httpMethod: HttpMethod.DELETE,
    }
  }

  static configureGetThirdParty(url?: string, thirdParty?: string, responseKey?: null): ApiAction {
    return {
      url,
      httpMethod: HttpMethod.GET,
      module: ApiModule.THIRD_PARTY,
      thirdParty: thirdParty,
      response: (response: any) => {
        return responseKey ? get(response, responseKey) : response;
      }
    }
  }
}