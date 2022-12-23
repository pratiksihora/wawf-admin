// Enums
import { UserRoleAssociate } from "src/app/constants/enums/user/user-role-associate.enum"
import { UserRoleColor } from "src/app/constants/enums/user/user-role.enum"
import { UserStatusColor } from "src/app/constants/enums/user/user-status.enum"
import { ColumFilterType } from "src/app/shared/constants/enums/controls/table"

// Interfaces
import { TableConfig } from "src/app/shared/constants/models/controls/table/table-config"

// Utils
import { TableUtil } from "src/app/shared/_core/utils/table"


export const configureTable = (translate: any, permission: any, data: any): TableConfig => {
  return TableUtil.configure({
    type: 'lazy',
    dataKey: 'skd_id',
    columns: [
      {
        field: 'skd_wa_no', header: 'Number'
      },
      {
        field: 'skd_device_name', header: 'Device Name', blank: '-'
      },
      {
        field: 'skd_created_at', header: 'Date of Active', blank: '-', type: 'date'
      },
    ],
    tableOptions: {
      globalFilterDisable: false,
      exportDisable: true,
      pdfDisable: false,
      csvDisable: false,
      excelDisable: false,
      sortField: 'skd_created_at',
      sortOrder: 0,
      paginator: false
    },
    add: false,
    delete: false,
    edit: false,
    actions:false
  }, translate, permission, data)
}
