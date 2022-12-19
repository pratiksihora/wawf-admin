import { ApiAction } from "../../../api";

export interface FormApiConfig {
  // common
  params?: string[];
  get?: ApiAction;
  add?: ApiAction;
  move?: ApiAction;
  update?: ApiAction;
  delete?: ApiAction;
}