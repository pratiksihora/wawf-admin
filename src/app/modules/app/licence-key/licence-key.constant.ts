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
    edit: false,
    addConfig: {
      text: 'Create Licence Key',
    },
    extend: true,
    extendConfig: {
      type: 'custom',
      aTag: false,
      action: ActionType.EXTEND,
      className: 'btn btn-icon btn-flex btn-sm py-2 btn-light btn-active-light-primary me-2 me-1',
      text: 'COMMON.BUTTON.DELETE',
      iconOnly: true,
      button: { tooltip: 'Extend' },
      iconClass: "svg-icon svg-icon-gray-600 svg-icon-6",
      iconSVG: 'assets/media/inline-svg/gallery/clone-icon.svg',
      // confirmation: { type: 'success', title: 'Campaign', message: 'Are you sure you want to Clone this campaign?', confirmation: { title: 'Campaign', message: 'Are you sure you want to Clone this campaign?', button1: true, button1Text: 'Clone', button2: true, button2Text: 'Cancel', button1Class: 'btn btn-success', icon: 'bi bi-back me-3' } }
    },
    devise: true,
    deviseConfig: {
      type: 'custom',
      aTag: false,
      action: ActionType.DEVICE,
      className: 'btn btn-icon btn-flex btn-sm py-2 btn-light btn-active-light-primary me-2 me-1',
      text: 'COMMON.BUTTON.DELETE',
      iconOnly: true,
      button: { tooltip: 'Device History' },
      iconClass: "svg-icon svg-icon-gray-600 svg-icon-6",
      iconSVG: 'assets/media/inline-svg/gallery/clone-icon.svg',
      // confirmation: { type: 'success', title: 'Campaign', message: 'Are you sure you want to Clone this campaign?', confirmation: { title: 'Campaign', message: 'Are you sure you want to Clone this campaign?', button1: true, button1Text: 'Clone', button2: true, button2Text: 'Cancel', button1Class: 'btn btn-success', icon: 'bi bi-back me-3' } }
    },
    credit: true,
    creditConfig: {
      type: 'custom',
      aTag: false,
      action: ActionType.CREDIT,
      className: 'btn btn-icon btn-flex btn-sm py-2 btn-light btn-active-light-primary me-2 me-1',
      text: 'COMMON.BUTTON.DELETE',
      iconOnly: true,
      button: { tooltip: 'Credit History' },
      iconClass: "svg-icon svg-icon-gray-600 svg-icon-6",
      iconSVG: 'assets/media/inline-svg/gallery/clone-icon.svg',
      // confirmation: { type: 'success', title: 'Campaign', message: 'Are you sure you want to Clone this campaign?', confirmation: { title: 'Campaign', message: 'Are you sure you want to Clone this campaign?', button1: true, button1Text: 'Clone', button2: true, button2Text: 'Cancel', button1Class: 'btn btn-success', icon: 'bi bi-back me-3' } }
    },
  }, translate, permission, data)
}
