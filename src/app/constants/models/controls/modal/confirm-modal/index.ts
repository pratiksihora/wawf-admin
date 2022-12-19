////////////////////////////////////////
//            INTERFACES              //
////////////////////////////////////////

/**
 * Confirm Modal Config interface for notification/confirmation modal
 */
export interface ConfirmModalConfig {
  type?: 'success' | 'danger' | 'info' | 'warning' | undefined;
  title?: string;
  message?: string;
  messageHTML?: string;
  icon?: string;
  position?: string;
  description?: string;
  button1?: boolean;
  button1Text?: string;
  button1Icon?: string;
  button1Class?: string;
  button2?: boolean;
  button2Text?: string;
  button2Icon?: string;
  button2Class?: string;
}