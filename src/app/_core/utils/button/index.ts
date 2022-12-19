// Interfaces
import { ActionType } from "src/app/constants/enums/common/action/action.enum";
import { ButtonConfig } from "src/app/constants/models/controls/button/button-config";
import { ButtonBaseConfig } from "src/app/constants/models/controls/button/button-config/config";

// default input configuration
const button: ButtonConfig = {
  aTag: false,
  action: ActionType.SAVE,
  className: 'btn btn-light btn-primary fw-bolder',
  text: 'COMMON.BUTTON.SAVE',
  type: 'submit',
}

const buttonPrimary: ButtonConfig = {
  aTag: false,
  action: ActionType.SAVE,
  className: 'btn btn-light btn-primary fw-bolder',
  text: 'COMMON.BUTTON.SAVE',
  type: 'button',
}

const secondary: ButtonConfig = {
  aTag: false,
  action: ActionType.CANCEL,
  className: 'btn btn-light fw-bolder',
  text: 'COMMON.BUTTON.CANCEL',
  type: 'button',
}

const closeIcon: ButtonConfig = {
  aTag: false,
  action: ActionType.CANCEL,
  className: 'btn btn-icon btn-bg-light btn-active-color-primary btn-sm',
  space: 'me-1',
  iconOnly: true,
  iconSVG: 'assets/media/icons/duotune/general/gen034.svg',
  type: 'button',
}

const filter: ButtonConfig = {
  aTag: false,
  action: ActionType.FILTER,
  className: 'btn btn-sm py-2 btn-flex btn-light-primary fw-bold fs-9 fs-xl-7',
  text: 'COMMON.BUTTON.FILTER',
  type: 'button',
  iconSVG: 'assets/media/icons/duotune/general/gen031.svg',
}

const setting: ButtonConfig = {
  aTag: false,
  action: ActionType.SETTING,
  className: 'btn btn-icon btn-light-primary btn-primary fw-bolder btn-sm',
  text: 'COMMON.BUTTON.SETTING',
  type: 'button',
  iconSVG: 'assets/media/icons/duotune/general/gen031.svg',
}

const settingIcon: ButtonConfig = {
  aTag: false,
  action: ActionType.SETTING,
  className: 'btn btn-icon btn-light btn-light-primary fw-bolder btn-sm h-30px w-30px',
  text: 'COMMON.BUTTON.SETTING',
  type: 'button',
  iconOnly: true,
  iconSVG: 'assets/media/icons/duotune/coding/cod001.svg',
}

const refreshIcon: ButtonConfig = {
  aTag: false,
  action: ActionType.REFRESH,
  className: 'btn btn-icon btn-light btn-light-primary fw-bolder btn-sm h-30px w-30px',
  text: 'COMMON.BUTTON.REFRESH',
  tooltip: 'COMMON.BUTTON.REFRESH',
  type: 'button',
  iconOnly: true,
  iconSVG: 'assets/media/icons/duotune/arrows/arr029.svg',
}

const add: ButtonConfig = {
  aTag: false,
  action: ActionType.ADD,
  className: 'btn btn-sm py-2 btn-flex btn-light-primary fw-bold fs-9 fs-xl-7',
  text: 'COMMON.BUTTON.ADD',
  type: 'button',
  iconSVG: 'assets/media/icons/duotune/general/gen035.svg',
}

const URL: ButtonConfig = {
  aTag: false,
  action: ActionType.URL,
  className: 'btn btn-sm py-2 btn-flex btn-light-primary fw-bold fs-9 fs-xl-7',
  text: 'COMMON.BUTTON.ADD',
  type: 'button',
  iconSVG: 'assets/media/icons/duotune/general/gen035.svg',
}

const QR: ButtonConfig = {
  aTag: false,
  action: ActionType.QR,
  className: 'btn btn-sm py-2 btn-flex btn-light-primary fw-bold fs-9 fs-xl-7',
  text: 'COMMON.BUTTON.ADD',
  type: 'button',
  iconSVG: 'assets/media/icons/duotune/general/gen035.svg',
}

const CLONE: ButtonConfig = {
  aTag: false,
  action: ActionType.CLONE,
  className: 'btn btn-sm py-2 btn-flex btn-light-primary fw-bold fs-9 fs-xl-7',
  text: 'COMMON.BUTTON.ADD',
  type: 'button',
  iconSVG: 'assets/media/icons/duotune/general/gen035.svg',
}

const STATISTICS: ButtonConfig = {
  aTag: false,
  action: ActionType.STATISTICS,
  className: 'btn btn-sm py-2 btn-flex btn-light-primary fw-bold fs-9 fs-xl-7',
  text: 'COMMON.BUTTON.ADD',
  type: 'button',
  iconSVG: 'assets/media/icons/duotune/general/gen035.svg',
}

const addIcon: ButtonConfig = {
  aTag: false,
  action: ActionType.ADD,
  className: 'btn btn-icon btn-flex btn-sm py-2 btn-light btn-active-light-primary me-2',
  space: 'me-1',
  iconOnly: true,
  text: 'COMMON.BUTTON.ADD',
  iconSVG: 'assets/media/icons/duotune/general/gen035.svg',
  type: 'button',
}

const deleteIcon: ButtonConfig = {
  aTag: false,
  action: ActionType.DELETE,
  className: 'btn btn-icon btn-bg-light btn-active-color-danger btn-sm',
  space: 'me-1',
  iconOnly: true,
  confirmation: { type: 'delete' },
  iconSVG: 'assets/media/icons/duotune/general/gen027.svg',
  type: 'button',
}

const deleteButton: ButtonConfig = {
  aTag: false,
  action: ActionType.DELETE,
  className: ' btn btn-sm py-2 btn-flex btn-light-danger fw-bold fs-9 fs-xl-7',
  text: 'COMMON.BUTTON.DELETE',
  confirmation: { type: 'delete' },
  type: 'button',
}

const success: ButtonConfig = {
  aTag: false,
  action: ActionType.SAVE,
  className: 'btn btn-light btn-success fw-bolder',
  text: 'COMMON.BUTTON.ADD',
  type: 'button',
}

const download: ButtonConfig = {
  aTag: false,
  action: ActionType.DOWNLOAD,
  className: 'btn btn-sm py-2 btn-flex btn-light-primary fw-bold fs-9 fs-xl-7',
  text: 'COMMON.BUTTON.DOWNLOAD',
  iconSVG: 'assets/media/inline-svg/campaign/clone.svg',
  iconClass: 'svg-icon svg-icon-6 svg-icon-muted m-0',
  type: 'button',
}

const downloadIcon: ButtonConfig = {
  aTag: false,
  action: ActionType.DOWNLOAD,
  className: 'btn btn-icon btn-bg-light btn-active-light-primary btn-sm',
  space: 'me-1',
  iconOnly: true,
  iconSVG: 'assets/media/inline-svg/gallery/download-icon.svg',
  type: 'button'
}

const move: ButtonConfig = {
  aTag: false,
  action: ActionType.MOVE,
  className: 'btn btn-sm py-2 btn-flex btn-light-primary fw-bold fs-9 fs-xl-7',
  text: 'COMMON.BUTTON.MOVE',
  iconSVG: 'assets/media/inline-svg/campaign/clone.svg',
  iconClass: 'svg-icon svg-icon-6 svg-icon-muted m-0',
  type: 'button',
}

const custom: ButtonConfig = {
  aTag: false,
  type: 'button',
}
export class ButtonUtil {

  //#region Configure All Modal
  /**
    * Configure Button
    */
  static configure(config: ButtonBaseConfig): ButtonConfig {
    if (!config.type) return config.button;

    switch (config.type) {
      case 'add':
        return this.configureAdd(config);
      case 'addIcon':
        return this.configureAddIcon(config);
      case 'view':
        return this.configureView(config);
      case 'cloneIcon':
        return this.configureCloneIcon(config);
      case 'viewIcon':
        return this.configureViewIcon(config);
      case 'edit':
        return this.configureEdit(config);
      case 'editIcon':
        return this.configureEditIcon(config);
      case 'delete':
        return this.configureDelete(config);
      case 'deleteIcon':
        return this.configureDeleteIcon(config);
      case 'save':
        return this.configureSave(config);
      case 'submit':
        return this.configureSubmit(config);
      case 'cancel':
        return this.configureCancel(config);
      case 'close':
        return this.configureClose(config);
      case 'closeIcon':
        return this.configureCloseIcon(config);
      case 'next':
        return this.configureNext(config);
      case 'prev':
        return this.configurePrev(config);
      case 'continue':
        return this.configureContinue(config);
      case 'filter':
        return this.configureFilter(config);
      case 'setting':
        return this.configureSetting(config);
      case 'settingIcon':
        return this.configureSettingIcon(config);
      case 'approve':
        return this.configureApprove(config);
      case 'reject':
        return this.configureReject(config);
      case 'download':
        return this.configureDownload(config);
      case 'downloadIcon':
        return this.configureDownloadIcon(config);
      case 'move':
        return this.configureMove(config);
      case 'selectAll':
        return this.configureSelectAll(config);
      case 'deselectAll':
        return this.configureDeSelectAll(config);
      case 'refreshIcon':
        return this.configureRefreshIcon(config);
      case 'custom':
        return this.configureCustom(config);
      default:
        return undefined;
    }
  }
  //#endregion

  /**
   * Configure Custom Button
   */
  static configureCustom(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...custom,
      action: config.action,
      text: config.text,
      tooltip: config.text ? config.text : '',
      iconSVG: config.iconSVG,
      ...this.configureCommon(config, custom),
      ...config.button
    }
  }

  static configureCommon(config: ButtonBaseConfig, config2: ButtonConfig): ButtonConfig {
    return {
      type: config.buttonType ? config.buttonType : config2?.type,
      loadingText: config.loadingText ? config.loadingText : config2?.loadingText,
      iconOnly: config.iconOnly != undefined ? config.iconOnly : config2?.iconOnly,
      iconClass: config.iconClass,
      className: config2.className || config.className,
      space: config.space,
      size: config.size ? config.size : config2?.size,
      confirmation: config2?.confirmation || config.confirmation,
      permission: config.permission,
      show: config.show,
    }
  }


  //#region Add Edit View Delete & Success  Button
  /**
    * Configure Add Button
    */
  static configureAdd(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...add,
      text: config.text ? config.text : add.text,
      ...this.configureCommon(config, add),
      ...config.button
    }
  }

  static configureAddIcon(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...addIcon,
      ...this.configureCommon(config, addIcon),
      tooltip: config.text ? config.text : 'COMMON.BUTTON.ADD',
      text: config.text != undefined ? config.text : 'COMMON.BUTTON.ADD',
      ...config.button
    }
  }

  /**
    * Configure Edit Button
    */
  static configureEdit(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...add,
      action: ActionType.EDIT,
      text: config.text ? config.text : 'COMMON.BUTTON.EDIT',
      ...this.configureCommon(config, add),
      ...config.button
    }
  }

  static configureEditIcon(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...addIcon,
      action: ActionType.EDIT,
      tooltip: config.text ? config.text : 'COMMON.BUTTON.EDIT',
      iconSVG: 'assets/media/icons/duotune/general/art005.svg',
      ...this.configureCommon(config, addIcon),
      ...config.button
    }
  }

  /**
    * Configure View Button
    */
  static configureView(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...add,
      text: config.text ? config.text : 'COMMON.BUTTON.VIEW',
      action: ActionType.VIEW,
      ...this.configureCommon(config, add),
      ...config.button
    }
  }

  static configureViewIcon(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...addIcon,
      action: ActionType.VIEW,
      iconSVG: 'assets/media/icons/duotune/general/gen005.svg',
      tooltip: config.text ? config.text : 'COMMON.BUTTON.VIEW',
      ...this.configureCommon(config, addIcon),
      ...config.button
    }
  }

  /**
    * Configure Delete Button
    */
  static configureDelete(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...deleteButton,
      action: ActionType.DELETE,
      ...this.configureCommon(config, deleteButton),
      ...config.button
    }
  }

  static configureDeleteIcon(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...deleteIcon,
      tooltip: config.text ? config.text : 'COMMON.BUTTON.DELETE',
      ...this.configureCommon(config, deleteIcon),
      ...config.button
    }
  }

  /**
  * Configure Success Button
  */
  static configureSuccess(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...success,
      text: config.text ? config.text : 'COMMON.BUTTON.SUCCESS',
      action: ActionType.SAVE,
      ...this.configureCommon(config, success),
      ...config.button
    }
  }
  //#endregion

  //#region Save & Close Button
  /**
    * Configure Save Button
    */
  static configureSave(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...button,
      text: config.text ? config.text : button.text,
      action: ActionType.SAVE,
      ...this.configureCommon(config, button),
      ...config.button
    }
  }

  /**
    * Configure Submit Button
    */
  static configureSubmit(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...button,
      text: config.text ? config.text : 'COMMON.BUTTON.SUBMIT',
      action: ActionType.SAVE,
      ...this.configureCommon(config, button),
      ...config.button
    }
  }

  /**
    * Configure Cancel Button
    */
  static configureCancel(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...secondary,
      text: config.text ? config.text : secondary.text,
      action: ActionType.CANCEL,
      ...this.configureCommon(config, secondary),
      ...config.button
    }
  }

  /**
    * Configure Close Button
    */
  static configureClose(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...secondary,
      text: config.text ? config.text : 'COMMON.BUTTON.CLOSE',
      action: ActionType.CANCEL,
      ...this.configureCommon(config, secondary),
      ...config.button
    }
  }

  static configureCloseIcon(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...closeIcon,
      action: ActionType.CANCEL,
      tooltip: config.text ? config.text : 'COMMON.BUTTON.CLOSE',
      ...this.configureCommon(config, closeIcon),
      ...config.button
    }
  }
  //#endregion

  //#region Save & Close Button
  /**
    * Configure Save Button
    */
  static configureNext(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...buttonPrimary,
      text: config.text ? config.text : 'COMMON.BUTTON.NEXT',
      action: ActionType.NEXT,
      ...this.configureCommon(config, buttonPrimary),
      ...config.button
    }
  }

  /**
    * Configure Submit Button
    */
  static configurePrev(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...buttonPrimary,
      text: config.text ? config.text : 'COMMON.BUTTON.PREV',
      action: ActionType.PREV,
      ...this.configureCommon(config, buttonPrimary),
      ...config.button
    }
  }

  /**
    * Configure Cancel Button
    */
  static configureContinue(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...buttonPrimary,
      text: config.text ? config.text : 'COMMON.BUTTON.CONTINUE',
      action: ActionType.CONTINUE,
      ...this.configureCommon(config, buttonPrimary),
      ...config.button
    }
  }

  /**
    * Configure Filter Button
    */
  static configureFilter(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...filter,
      text: config.text ? config.text : filter.text,
      ...this.configureCommon(config, filter),
      ...config.button,
    }
  }
  //#endregion

  /**
   * Configure Close Button
   */
  static configureSetting(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...setting,
      text: config.text ? config.text : setting.text,
      ...this.configureCommon(config, setting),
      ...config.button,
    }
  }

  /**
 * Configure Close Button
 */
  static configureSettingIcon(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...settingIcon,
      ...this.configureCommon(config, settingIcon),
      ...config.button
    }
  }

  /**
* Configure Rfersg Button
*/
  static configureRefreshIcon(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...refreshIcon,
      ...this.configureCommon(config, refreshIcon),
      ...config.button
    }
  }

  //#region Approve & Reject Button
  /**
    * Configure Approve Button
    */
  static configureApprove(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...success,
      text: config.text ? config.text : 'COMMON.BUTTON.APPROVE',
      action: ActionType.APPROVE,
      ...this.configureCommon(config, success),
      ...config.button
    }
  }

  /**
   * Configure Reject Button
   */
  static configureReject(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...deleteButton,
      text: config.text ? config.text : 'COMMON.BUTTON.REJECT',
      action: ActionType.REJECT,
      ...this.configureCommon(config, deleteButton),
      ...config.button
    }
  }
  //#endregion


  static configureQrIcon(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...addIcon,
      action: ActionType.QR,
      iconSVG: 'assets/media/icons/duotune/general/gen005.svg',
      tooltip: config.text ? config.text : 'COMMON.BUTTON.QR',
      ...this.configureCommon(config, addIcon),
      ...config.button
    }
  }

  static configureUrlIcon(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...addIcon,
      action: ActionType.URL,
      iconSVG: 'assets/media/icons/duotune/general/gen005.svg',
      tooltip: config.text ? config.text : 'COMMON.BUTTON.URL',
      ...this.configureCommon(config, addIcon),
      ...config.button
    }
  }

  static configureStatisticsIcon(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...addIcon,
      action: ActionType.STATISTICS,
      iconSVG: 'assets/media/icons/duotune/general/gen005.svg',
      tooltip: config.text ? config.text : 'COMMON.BUTTON.STATISTICS',
      ...this.configureCommon(config, addIcon),
      ...config.button
    }
  }

  static configureCloneIcon(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...addIcon,
      action: ActionType.CLONE,
      iconSVG: 'assets/media/icons/duotune/general/gen005.svg',
      tooltip: config.text ? config.text : 'COMMON.BUTTON.CLONE',
      ...this.configureCommon(config, addIcon),
      ...config.button
    }
  }

  static configureEditorIcon(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...addIcon,
      action: ActionType.EDITOR,
      iconSVG: 'assets/media/icons/duotune/general/gen005.svg',
      tooltip: config.text ? config.text : 'COMMON.BUTTON.EDITOR',
      ...this.configureCommon(config, addIcon),
      ...config.button
    }
  }

  static configureDownload(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...download,
      text: config.text ? config.text : download.text,
      ...this.configureCommon(config, download),
      ...config.button
    }
  }

  static configureDownloadIcon(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...downloadIcon,
      text: config.text ? config.text : downloadIcon.text,
      ...this.configureCommon(config, downloadIcon),
      ...config.button
    }
  }

  static configureMove(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...move,
      text: config.text ? config.text : move.text,
      ...this.configureCommon(config, move),
      iconSVG: 'assets/media/inline-svg/gallery/folder-icon.svg',
      iconClass: 'svg-icon svg-icon-6',
      ...config.button
    }
  }

  static configureSelectAll(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...move,
      action: ActionType.SELECT_ALL,
      text: config.text ? config.text : 'COMMON.BUTTON.SELECT_ALL',
      // tooltip: config.text ? config.text : 'COMMON.BUTTON.SELECT_ALL',
      iconSVG: 'assets/media/icons/duotune/general/art005.svg',
      ...this.configureCommon(config, move),
      ...config.button
    }
  }

  static configureDeSelectAll(config: ButtonBaseConfig): ButtonConfig {
    return {
      ...move,
      action: ActionType.DESELECT_ALL,
      text: config.text ? config.text : 'COMMON.BUTTON.DESELECT_ALL',
      // tooltip: config.text ? config.text : 'COMMON.BUTTON.DESELECT_ALL',
      iconSVG: 'assets/media/icons/duotune/general/art005.svg',
      ...this.configureCommon(config, move),
      className: 'btn btn-sm py-2 btn-flex btn-light-danger fw-bold fs-9 fs-xl-7',
      ...config.button
    }
  }
}