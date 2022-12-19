// Interfaces
import { ConfirmModalConfig } from "src/app/constants/models/controls/modal/confirm-modal";
import { ConfirmConfig } from "src/app/constants/models/controls/modal/confirm-modal/config";

// default input configuration
const modal: ConfirmModalConfig = {
  type: 'danger',
  title: 'COMMON.CONFIRM.DELETE',
  message: 'COMMON.MESSAGE.DELETE',
  icon: 'bi bi-trash',
  button1: true,
  button1Text: 'COMMON.BUTTON.DELETE',
  button1Class: 'btn fw-bold btn-danger',
  button2: true,
  button2Text: 'COMMON.BUTTON.CANCEL'
}

const enableDisableModal: ConfirmModalConfig = {
  type: 'info',
  title: 'COMMON.CONFIRM.ENABLE',
  message: 'COMMON.MESSAGE.ENABLE',
  button1: true,
  button1Text: 'COMMON.BUTTON.ENABLE',
  button1Class: 'btn fw-bold btn-success',
  button2: true,
  button2Text: 'COMMON.BUTTON.CANCEL'
}

const approveRejectModal: ConfirmModalConfig = {
  type: 'info',
  title: 'COMMON.CONFIRM.APPROVE',
  message: 'COMMON.MESSAGE.APPROVE',
  button1: true,
  button1Text: 'COMMON.BUTTON.APPROVE',
  button1Class: 'btn fw-bold btn-success',
  button2: true,
  button2Text: 'COMMON.BUTTON.CANCEL'
}

const infoModal: ConfirmModalConfig = {
  type: 'info',
  title: 'COMMON.CONFIRM.INFO',
  message: 'COMMON.MESSAGE.INFO',
  button1: false,
  button2: true,
  button2Text: 'COMMON.BUTTON.CLOSE'
}

const successModal: ConfirmModalConfig = {
  type: 'success',
  title: 'COMMON.CONFIRM.INFO',
  message: 'COMMON.MESSAGE.INFO',
  button2: true,
  button2Text: 'COMMON.BUTTON.CLOSE'
}

export class ComfirmationUtil {

  //#region Configure All Modal
  /**
    * Configure Modal
    */
  static configure(config: ConfirmConfig): ConfirmModalConfig {
    if (!config.type) return config.confirmation;

    switch (config.type) {
      case 'delete':
        return this.configureDelete(config);
      case 'delete_all':
        return this.configureDeleteAll(config);
      case 'delete_selected':
        return this.configureDeleteSelected(config);
      case 'disable':
        return this.configureDisable(config);
      case 'enable':
        return this.configureEnable(config);
      case 'approve':
        return this.configureApprove(config);
      case 'reject':
        return this.configureReject(config);
      case 'info':
        return this.configureInfo(config);
      case 'error':
        return this.configureError(config);
      case 'success':
        return this.configureSuccess(config);
      case 'warning':
        return this.configureWarning(config);
      default:
        return undefined;
    }
  }
  //#endregion

  //#region Delete Modal
  /**
    * Configure Delete Modal
    */
  static configureDelete(config: ConfirmConfig): ConfirmModalConfig {
    return {
      ...modal,
      message: config.message ? config.message : modal.message,
      title: config.title ? config.title : modal.title,
      ...config.confirmation
    }
  }

  /**
    * Configure Delete Selected Modal
    */
  static configureDeleteSelected(config: ConfirmConfig): ConfirmModalConfig {
    return {
      ...modal,
      message: config.message ? config.message : 'COMMON.MESSAGE.DELETE_SELECTED',
      title: config.title ? config.title : modal.title,
      ...config.confirmation
    }
  }

  /**
    * Configure Delete All Modal
    */
  static configureDeleteAll(config: ConfirmConfig): ConfirmModalConfig {
    return {
      ...modal,
      message: config.message ? config.message : 'COMMON.MESSAGE.DELETE_ALL',
      title: config.title ? config.title : modal.title,
      ...config.confirmation
    }
  }
  //#endregion

  //#region Enable Disable Modal
  /**
    * Configure Enable Modal
    */
  static configureEnable(config: ConfirmConfig): ConfirmModalConfig {
    return {
      ...enableDisableModal,
      message: config.message ? config.message : enableDisableModal.message,
      title: config.title ? config.title : enableDisableModal.title,
      ...config.confirmation
    }
  }

  /**
    * Configure Disable Modal
    */
  static configureDisable(config: ConfirmConfig): ConfirmModalConfig {
    return {
      ...enableDisableModal,
      type: 'info',
      title: config.title ? config.title : 'COMMON.CONFIRM.DISABLE',
      message: config.message ? config.message : 'COMMON.MESSAGE.DISABLE',
      button1Text: 'COMMON.BUTTON.DISABLE',
      button1Class: 'btn fw-bold btn-danger',
      ...config.confirmation
    }
  }
  //#endregion

  //#region Approve Reject Modal
  /**
    * Configure Approve Modal
    */
  static configureApprove(config: ConfirmConfig): ConfirmModalConfig {
    return {
      ...approveRejectModal,
      message: config.message ? config.message : approveRejectModal.message,
      title: config.title ? config.title : approveRejectModal.title,
      button1Text: 'COMMON.BUTTON.APPROVE',
      ...config.confirmation
    }
  }

  /**
    * Configure Disable Modal
    */
  static configureReject(config: ConfirmConfig): ConfirmModalConfig {
    return {
      ...approveRejectModal,
      type: 'info',
      title: config.title ? config.title : 'COMMON.CONFIRM.APPROVE',
      message: config.message ? config.message : 'COMMON.MESSAGE.REJECT',
      button1Text: 'COMMON.BUTTON.REJECT',
      button1Class: 'btn fw-bold btn-danger',
      ...config.confirmation
    }
  }
  //#endregion

  //#region Info Success Error Warning Modal
  /**
    * Configure Info Modal
    */
  static configureInfo(config: ConfirmConfig): ConfirmModalConfig {
    return {
      ...infoModal,
      message: config.message ? config.message : infoModal.message,
      title: config.title ? config.title : infoModal.title,
      ...config.confirmation
    }
  }

  /**
    * Configure Success Modal
    */
  static configureSuccess(config: ConfirmConfig): ConfirmModalConfig {
    return {
      ...successModal,
      type: 'success',
      message: config.message ? config.message : successModal.message,
      title: config.title ? config.title : successModal.title,
      ...config.confirmation
    }
  }

  /**
   * Configure Error Modal
   */
  static configureError(config: ConfirmConfig): ConfirmModalConfig {
    return {
      ...infoModal,
      type: 'danger',
      message: config.message ? config.message : infoModal.message,
      title: config.title ? config.title : infoModal.title,
      ...config.confirmation
    }
  }

  /**
   * Configure Warning Modal
   */
  static configureWarning(config: ConfirmConfig): ConfirmModalConfig {
    return {
      ...infoModal,
      type: 'warning',
      message: config.message ? config.message : infoModal.message,
      title: config.title ? config.title : infoModal.title,
      ...config.confirmation
    }
  }
  //#endregion

}

