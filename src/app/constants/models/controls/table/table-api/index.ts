import { ApiAction } from "../../../api";

/**
 * Table configureation
 */
export interface TableApiConfig {
  params?: string[];
  pagging?: ApiAction;
  export?: ApiAction;
  status?: ApiAction;
  delete?: ApiAction;
  move?: ApiAction;
  all?: ApiAction;
}