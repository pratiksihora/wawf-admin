export interface TableApiAction {
  module?: string;
  action?: string;
  idKey?: string;
  statusKey?: string;
  additionKeys?: string[];
  version?: string;
  title?: string;

  paggingUrl?: string;
  allUrl?: string;
  exportUrl?: string;
  statusUrl?: string;
  deleteUrl?: string;
  skipStatusCall?: boolean;
  skipDeleteCall?: boolean;
  skipExportCall?: boolean;
  multiple?: boolean;
}

