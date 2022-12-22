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
    dataKey: 'user_id',
    columns: [
      {
        field: 'user_unique_id', header: 'Number'
      },
      {
        field: 'user_name', header: 'Name', blank: '-'
      },
      {
        field: 'user_email', header: 'Date of Active', blank: '-'
      },
      {
        field: 'user_created_at', header: 'Device Name'
      },
    ],
    tableOptions: {
      globalFilterDisable: false,
      exportDisable: true,
      pdfDisable: false,
      csvDisable: false,
      excelDisable: false,
      sortField: 'user_created_at',
      sortOrder: 1,
      paginator: false
    },
    add: false,
    delete: false,
    edit: true,
  }, translate, permission, data)
}
