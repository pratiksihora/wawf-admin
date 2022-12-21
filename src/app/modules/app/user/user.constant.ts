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
        field: 'flag', header: 'Flag'
      },
      {
        field: 'conatct_number', header: 'Contact Number'
      },
      {
        field: 'name_email', header: 'Name & Email'
      },
      {
        field: 'created_date', header: 'Created Date'
      },
    ],
    tableOptions: {
      globalFilterDisable: false,
      exportDisable: false,
      pdfDisable: false,
      csvDisable: false,
      excelDisable: false,
      sortField: 'user_id',
      sortOrder: 1
    },
    add: false,
    actions:false,
    
  }, translate, permission, data)
}
