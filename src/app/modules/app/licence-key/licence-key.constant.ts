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
    dataKey: 'sk_id',
    columns: [
      {
        field: 'sk_licence_key', header: 'License Key', type: 'copy-button'
      },
      {
        field: 'sk_no_of_login', header: 'Number of Devices', prepareColumn: (data) => `${data.sk_no_of_login || '-'}`,
      },
      {
        field: 'sk_no_of_month', header: 'Number of Month'
      },
      {
        field: 'sk_created_at', header: 'Created Date', type: 'date'
      },
      {
        field: 'sk_start_date', header: 'Used Date', type: 'date', blank: '-',
      },
      {
        field: 'sk_end_date', header: 'Executed Date', type: 'date', blank: '-',
      },
      {
        field: 'sk_status', header: 'Current Status', type: 'status', prepareColumn: (data) => ({
          status: data.sk_status, color: UserRoleColor[data.sk_status],
        })
      },
    ],
    tableOptions: {
      globalFilterDisable: false,
      exportDisable: true,
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
      iconSVG: './assets/media/svg/new-svg-icons/extend.svg',
      show: (data) => {
        return data.sk_start_date ? true : false;
      },
    },
    device: true,
    deviseConfig: {
      type: 'custom',
      aTag: false,
      action: ActionType.DEVICE,
      className: 'btn btn-icon btn-flex btn-sm py-2 btn-light btn-active-light-primary me-2 me-1',
      text: 'COMMON.BUTTON.DELETE',
      iconOnly: true,
      button: { tooltip: 'Device History' },
      iconClass: "svg-icon svg-icon-gray-600 svg-icon-6",
      iconSVG: './assets/media/svg/new-svg-icons/device-history.svg',
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
      iconSVG: './assets/media/svg/new-svg-icons/credit-history.svg',
    },
    message: true,
    messageConfig: {
      type: 'custom',
      aTag: false,
      action: ActionType.MESSAGE,
      className: 'btn btn-icon btn-flex btn-sm py-2 btn-light btn-active-light-primary me-2 me-1',
      text: 'COMMON.BUTTON.DELETE',
      iconOnly: true,
      button: { tooltip: 'Message' },
      iconClass: "svg-icon svg-icon-gray-600 svg-icon-6",
      iconSVG: './assets/media/svg/new-svg-icons/message.svg',
    },
    deleteConfig: {
      show: (data) => {
        return data.sk_start_date ? false : true;
      },
      iconSVG: './assets/media/svg/new-svg-icons/delete.svg',
    }
  }, translate, permission, data)
}
