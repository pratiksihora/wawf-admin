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
    dataKey: 'ub_id',
    columns: [
      {
        field: 'license_key', header: 'License Key'
      },
      {
        field: 'number_devices', header: 'Number of Devices'
      },
      {
        field: 'number_month', header: 'Number of Month'
      },
      {
        field: 'created_date', header: 'Created Date'
      },
      {
        field: 'used_date', header: 'Used Date'
      },
      {
        field: 'executed_date', header: 'Executed Date'
      },
      {
        field: 'current_status', header: 'Current Status'
      },
    ],
    tableOptions: {
      globalFilterDisable: false,
      exportDisable: false,
      pdfDisable: false,
      csvDisable: false,
      excelDisable: false,
    },

  }, translate, permission, data)
}
