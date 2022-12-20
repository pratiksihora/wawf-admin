// Interfaces
import { NotificationConfig } from "../notification";

// Enums
import { ApiMethod, ApiModule } from "src/app/api/enums/api-module.enum";
import { HttpMethod } from "src/app/api/enums/http-method.enum";

export interface ApiAction extends NotificationConfig {
  fullUrl?: string;
  url?: string;
  httpMethod?: HttpMethod;
  queryParams?: string[];
  module?: ApiModule | string;
  method?: ApiMethod | string;
  thirdParty?: string;
  response?: any;
  version?: number,
  compress?: boolean;
  promise?: boolean;
  storage?: string;
  skipPayload?: boolean;
  skipCToken?: boolean;
}