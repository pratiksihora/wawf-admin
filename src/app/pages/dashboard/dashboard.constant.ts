// Enums
import { ActionType } from "src/app/constants/enums/common/action/action.enum"
import { ColumFilterType } from "src/app/constants/enums/controls/table"
import { UserRoleAssociate } from "src/app/constants/enums/user/user-role-associate.enum"
import { UserRoleColor } from "src/app/constants/enums/user/user-role.enum"
import { UserStatusColor } from "src/app/constants/enums/user/user-status.enum"

// Interfaces
import { TableConfig } from "src/app/constants/models/controls/table/table-config"
import { PERMISSION } from "src/app/constants/permission/permission.constant"

// Utils
import { TableUtil } from "src/app/_core/utils/table"

export const configureTable = (data: any): TableConfig => {
    return TableUtil.configure({
        type: 'lazy',
        dataKey: 'ub_id',
        deleteConfig: {
            button: { tooltip: 'Delete' },
            type: 'custom', className: 'btn btn-icon btn-flex btn-sm py-2 btn-light btn-active-light-primary me-2', action: ActionType.DELETE, iconClass: "svg-icon svg-icon-gray-600 svg-icon-6", iconSVG: 'assets/media/inline-svg/gallery/delete-icon.svg', iconOnly: true, size: 'sm', space: 'me-1', confirmation: { type: "delete", title: 'Delete', message: 'Are you sure you want to delete this user?' }
        },
        addConfig: {
            permission: [PERMISSION.TEAM_MANAGE, PERMISSION.ADMINISTRATOR_ACCESS_MANAGE]
        },
        columns: [
            {
                field: 'name', header: 'Name', type: 'user-invite', sortableDisable: true, globalFilterDisable: true, exportDisable: true, prepareColumn: (data) => ({
                    name: (!data?.ub_first_name && !data?.ub_last_name) ? 'Anonymous User' : (data?.ub_first_name || '') + ' ' + (data?.ub_last_name || ''),
                    image: data.ub_profile_image,
                    can_invite: INVITE_STATUS.includes(data?.ub_status)
                }),
            },
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
        ],
        tableOptions: {
            globalFilterDisable: false,
            exportDisable: false,
            pdfDisable: false,
            csvDisable: false,
            excelDisable: false,
        },

    }, data)
}

export const INVITE_STATUS = [
    'Invited',
    'Rejected'
]

export const GLOBAL_FILTER_FIELDS = [
    {
        field: "string",
        "type": "string",
        "subType": "string",
        "operator": "string",
        "logic": "string",
        "value": "string",
        "dateValue": "2022-09-26T05:22:48.695Z",
        "arrayValue": [
            "string"
        ],
        "dateRangeValue": {
            "minDate": "2022-09-26T05:22:48.695Z",
            "maxDate": "2022-09-26T05:22:48.695Z"
        },
        "numRangeValue": {
            "minNum": 0,
            "maxNum": 0
        }
    }
]