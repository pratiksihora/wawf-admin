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
    dataKey: 'ch_id',
    columns: [
      {
        field: 'ch_licence_key', header: 'License Key', blank: '-'
      },
      {
        field: 'ch_type', header: 'Key Type'
      },
      {
        field: 'ch_no_of_device', header: 'Number of Devices'
      },
      {
        field: 'ch_no_of_month', header: 'Number of Month'
      },
      {
        field: 'ch_used_credit', header: 'Credit Used'
      },
      {
        field: 'ch_plan_type', header: 'Plan Type', blank: '-'
      },
      {
        field: 'ch_created_at', header: 'Created Date', type: 'date'
      },
    ],
    tableOptions: {
      globalFilterDisable: false,
      exportDisable: true,
      pdfDisable: false,
      csvDisable: false,
      excelDisable: false,
      sortField: 'ch_created_at',
      sortOrder: 0
    },
    add: false,
    actions: false
  }, translate, permission, data)
}
