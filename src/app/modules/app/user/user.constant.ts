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
import moment from "moment-timezone"


export const configureTable = (translate: any, permission: any, data: any): TableConfig => {
  return TableUtil.configure({
    type: 'lazy',
    dataKey: 'user_id',
    columns: [
      {
        field: 'user_unique_id', header: 'Contact Number'
      },
      {
        field: 'user_name', header: 'Name', blank: '-'
      },
      {
        field: 'user_email', header: 'Email', blank: '-'
      },
      {
        field: 'user_trial_end_at', header: 'Trial End date', type: 'date', blank: '-'
      },
      {
        field: 'user_created_at', header: 'Created Date', type: 'date'
      },
    ],
    tableOptions: {
      globalFilterDisable: false,
      exportDisable: true,
      pdfDisable: false,
      csvDisable: false,
      excelDisable: false,
      sortField: 'user_created_at',
      sortOrder: 0
    },
    add: false,
    delete: false,
    edit: true,
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
        const todaytDate = moment();
        const endDate = moment(data?.user_trial_end_at, 'DD-MM-YYYY');
        const differenceInDays = endDate.isBefore(todaytDate);
        return differenceInDays && (data?.user_fk_reseller_unique == 'TJHVW2UJ' || data?.user_fk_reseller_unique == 'Q2ZJRGFM')
      },
    },
  }, translate, permission, data)
}
