export interface FormApiAction {
  module?: string;
  idKey?: string[];
  version?: string;
  title?: string;

  getUrl?: string;
  addUrl?: string;
  editUrl?: string;
  deleteUrl?: string;

  skipGetCall?: boolean;
  skipAddCall?: boolean;
  skipEditCall?: boolean;
  skipDeleteCall?: boolean;
}

