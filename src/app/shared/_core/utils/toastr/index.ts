// Interfaces
import { ToastrConfig } from "src/app/shared/constants/models/controls/toastr/toastr-config";
import { ToastrBaseConfig } from "src/app/shared/constants/models/controls/toastr/toastr-config/config";

// default toastr configuration
const success: ToastrConfig = {
  severity: 'success',
  icon: '',
  detail: '',
  summary: 'Success',
  closable: true,
}

const error: ToastrConfig = {
  severity: 'error',
  icon: '',
  detail: 'COMMON.TOASTER.SOMETHING_WENT_WRONG',
  summary: 'Error',
  closable: true,
}

const info: ToastrConfig = {
  severity: 'info',
  icon: '',
  detail: '',
  summary: 'Info',
  closable: true,
}

const warning: ToastrConfig = {
  severity: 'warning',
  icon: '',
  detail: '',
  summary: 'Warning',
  closable: true,
}

const custom: ToastrConfig = {
  severity: 'custom',
  icon: '',
  detail: '',
  summary: 'Custom',
  closable: true,
}

/**
 * This util is for get toastr utils
 *
 * @author Pratik Shihora <pratik@saeculumsolutions.com>
 *
 * Notes:-
 * Date: 02/10/2020 (Pratik Shihora <pratik@saeculumsolutions.com>) initially created token storage util
 */
export class ToastrUtil {
  //#region Configure All Modal
  /**
    * Configure Button
    */
  static configure(config: ToastrBaseConfig): ToastrConfig {
    if (!config.type) return config.toastr;

    switch (config.type) {
      case 'success':
        return this.configureSuccess(config);
      case 'error':
        return this.configureError(config);
      case 'info':
        return this.configureInfo(config);
      case 'warning':
        return this.configureWarning(config);
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

  /**
     * Configure Common Toastr
     */
  static configureCommon(config: ToastrBaseConfig, config2: ToastrConfig): ToastrConfig {
    return {
      key: config.key,

      summary: config.title || config2.summary,
      detail: config.message || config2.detail,

      icon: config.icon || config2.icon,
      life: config.life || config2.life,
      sticky: config.sticky || config2.sticky,
      closable: config.closable === undefined ? config2.closable : config.closable,
      data: config.data,
      styleClass: config.className,
      contentStyleClass: config.contentClass
    }
  }

  //#region Add Edit View Delete & Success  Button
  /**
    * Configure Success Toastr
    */
  static configureSuccess(config: ToastrBaseConfig): ToastrConfig {
    return {
      ...success,
      ...this.configureCommon(config, success)
    }
  }

  /**
   * Configure Error Toastr
   */
  static configureError(config: ToastrBaseConfig): ToastrConfig {
    return {
      ...error,
      ...this.configureCommon(config, error)
    }
  }

  /**
 * Configure Info Toastr
 */
  static configureInfo(config: ToastrBaseConfig): ToastrConfig {
    return {
      ...info,
      ...this.configureCommon(config, info)
    }
  }

  /**
   * Configure Warning Toastr
   */
  static configureWarning(config: ToastrBaseConfig): ToastrConfig {
    return {
      ...warning,
      ...this.configureCommon(config, warning)
    }
  }

  /**
     * Configure Custom Toastr
     */
  static configureCustom(config: ToastrBaseConfig): ToastrConfig {
    return {
      ...custom,
      ...this.configureCommon(config, custom)
    }
  }
  //#endregion
}