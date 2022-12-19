// Enums and Interfaces

import { TableApiAction } from 'src/app/shared/constants/models/api/table';
import { TableApiConfig } from 'src/app/shared/constants/models/controls/table/table-api';
import { ApiUtil } from './index';

export class TableApiUtil {
  static lazyTable(table: TableApiAction): TableApiConfig {
    let api: any = {};

    api.pagging = ApiUtil.configurePost({ module: table.module, url: table.paggingUrl || `/v1/${table.action}/pagging`, title: table.title });

    if (!table.skipExportCall)
      api.export = ApiUtil.configurePost({ module: table.module, url: table.exportUrl || `/v1/${table.action}/export`, title: table.title });

    if (!table.skipStatusCall)
      api.status = ApiUtil.configurePatch({ module: table.module, url: table.statusUrl || `/v1/${table.action}/status${!table.multiple ? `/{{${table.idKey}}}` : ''}`, title: table.title, success: 'COMMON.TOASTER.UPDATE_STATUS' });

    if (!table.skipDeleteCall)
      api.delete = ApiUtil.configureDelete({
        module: table.module, url: table.deleteUrl ||
          `/v1/${table.action}${!table.multiple ? `/{{${table.idKey}}}` : ''}`, title: table.title, success: table.title + ' has been deleted successfully.', skipPayload: !table.multiple
      });

    return api;
  }


  static localTable(table: TableApiAction): TableApiConfig {
    let api: any = {
      all: ApiUtil.configureGet({ module: table.module, url: table.allUrl || `/v1/${table.action}/all`, title: table.title })
    }

    if (!table.skipDeleteCall)
      api.delete = ApiUtil.configureDelete({
        module: table.module, url: table.deleteUrl ||
          `/v1/${table.action}${!table.multiple ? `/{{${table.idKey}}}` : ''}`, title: table.title, success: table.title + ' has been deleted successfully.', skipPayload: !table.multiple
      });
    return api;
  }
}