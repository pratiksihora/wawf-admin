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
    dataKey: 'bl_id',
    columns: [
      {
        field: 'email', header: 'Email'
      },
      {
        field: 'amount', header: 'Amount'
      },
      {
        field: 'bl_credit', header: 'Credit'
      },
      {
        field: 'status', header: 'Status'
      },
      {
        field: 'payment_type', header: 'Payment Type'
      },
      {
        field: 'recipt', header: 'Recipt'
      },
      {
        field: 'bl_created_at', header: 'Date'
      },
    ],
    tableOptions: {
      globalFilterDisable: false,
      exportDisable: false,
      pdfDisable: false,
      csvDisable: false,
      excelDisable: false,
      sortField: 'bl_created_at',
      sortOrder: 1
    },
    add: false,
    actions: false
  }, translate, permission, data)
}
