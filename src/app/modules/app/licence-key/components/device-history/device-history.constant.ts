// Enums
import { UserRoleAssociate } from "src/app/constants/enums/user/user-role-associate.enum"
import { UserRoleColor } from "src/app/constants/enums/user/user-role.enum"
import { UserStatusColor } from "src/app/constants/enums/user/user-status.enum"
import { ColumFilterType } from "src/app/shared/constants/enums/controls/table"

// Interfaces
import { TableConfig } from "src/app/shared/constants/models/controls/table/table-config"

// Utils
import { TableUtil } from "src/app/shared/_core/utils/table"
import { ActionType } from "src/app/shared/constants/enums/common/action/action.enum"


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
    deleteConfig: {
      button: { tooltip: 'Delete' },
      type: 'custom', className: 'btn btn-icon btn-flex btn-sm py-2 btn-light btn-active-light-primary me-2', action: ActionType.DELETE,
      iconClass: "svg-icon svg-icon-gray-600 svg-icon-6", iconSVG: './assets/media/svg/new-svg-icons/delete.svg', iconOnly: true, size: 'sm', space: 'me-1',
      confirmation: {
        type: "delete",
        title: 'Remove Licence key from device',
        message: 'Are you sure you want to Remove Licence key from device?'
      }
    },
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
    delete: true,
    edit: false,
    actions: true
  }, translate, permission, data)
}
