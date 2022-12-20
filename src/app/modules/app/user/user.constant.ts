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
        field: 'ub_first_name', exportDisable: false, hidden: true, header: 'FirstName', type: 'user-invite', filterType: ColumFilterType.STRING
      },
      {
        field: 'ub_last_name', exportDisable: false, hidden: true, header: 'LastName', type: 'user-invite', filterType: ColumFilterType.STRING
      },
      {
        field: 'ub_email', header: 'CONTROL.EMAIL'
      },
      {
        field: 'ub_br_name', header: 'CONTROL.ROLE', type: 'status', prepareColumn: (data) => ({
          status: data.ub_br_name, color: UserRoleColor[data.ub_br_associate],
        })
      },
      {
        field: 'ub_workspace_count', header: 'CONTROL.WORKSPACE', filterDisable: true, globalFilterDisable: true, sortableDisable: true, prepareColumn: (data) => (
          data.ub_br_associate === UserRoleAssociate.SYSTEM_ADMIN ? 'All' : `${data.ub_workspace_count || '-'}`
        )
      },
      { field: 'ub_created_at', header: 'CONTROL.CREATED_DATE', type: 'date', minWidth: '130px' },
      // {
      //   field: 'ub_is_default', header: 'Default', filterType: ColumFilterType.BOOLEAN, filterOptions: {
      //     options: [{ text: 'true', value: 'true' }, { text: 'false', value: 'false' }]
      //   }
      // },
      {
        field: 'ub_status', header: 'CONTROL.STATUS', type: 'status', minWidth: '100px', prepareColumn: (data) => ({
          status: data.ub_status, color: UserStatusColor[data.ub_status]
        })
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
