// Enums
import { UserRoleAssociate } from "src/app/constants/enums/user/user-role-associate.enum"
import { UserRoleColor } from "src/app/constants/enums/user/user-role.enum"
import { UserStatusColor } from "src/app/constants/enums/user/user-status.enum"
import { ActionType } from "src/app/shared/constants/enums/common/action/action.enum"
import { ColumFilterType } from "src/app/shared/constants/enums/controls/table"

// Interfaces
import { TableConfig } from "src/app/shared/constants/models/controls/table/table-config"

// Utils
import { TableUtil } from "src/app/shared/_core/utils/table"


export const configureTable = (translate: any, permission: any, data: any): TableConfig => {
  return TableUtil.configure({
    type: 'local',
    dataKey: 'ch_id',
    columns: [
      {
        field: 'ch_plan_type', header: 'Type', sortableDisable: true, blank: '-'
      },
      {
        field: 'ch_no_of_device', header: 'Device', sortableDisable: true, blank: '-'
      },
      {
        field: 'ch_used_credit', header: 'Credit Used', sortableDisable: true, blank: '-'
      },
      {
        field: 'ch_created_at', header: 'Date', type: 'date', sortableDisable: true, blank: '-'
      },
    ],
    tableOptions: {
      globalFilterDisable: false,
      exportDisable: true,
      pdfDisable: false,
      csvDisable: false,
      excelDisable: false,
      sortField: 'ch_created_at',
      sortOrder: 0,
      paginator: false
    },
    add: false,
    delete: false,
    edit: false,
    actions: false
  }, translate, permission, data)
}
