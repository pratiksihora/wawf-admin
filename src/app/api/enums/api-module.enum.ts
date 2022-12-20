export * from './http-method.enum';

/**
 * Http Api Method config enum for api call
 */

export enum ApiModule {
  API = 'api',
  THIRD_PARTY = 'third_party',
}

/**
 * Http Api Method config enum for api call
 */
export enum ApiMethod {
  ADD = 'add',
  UPDATE = 'update',
  ALL = 'all',
  GET = 'get',
  PAGGING = 'pagging',
  EXPORT = 'export',
  STATUS = 'status',
  DELETE = 'delete',
  REORDER = 'reorder',
  LOOKUP = 'lookup'
}