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
        field: 'key_type', header: 'Key Type'
      },
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
        field: 'credit_used', header: 'Credit Used'
      },
      {
        field: 'plan_type', header: 'Plan Type'
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
    },
    add: false,
    actions:false
  }, translate, permission, data)
}
