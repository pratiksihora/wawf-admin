////////////////////////////////////////
//            INTERFACES              //
////////////////////////////////////////

import { ActionType } from "src/app/constants/enums/common/action/action.enum";
import { ConfirmConfig } from "../../modal/confirm-modal/config";
import { ButtonConfig } from "./index";

export interface ButtonBaseConfig {
  type?: 'custom' | 'add' | 'addIcon' | 'view' | 'viewIcon' | 'edit' | 'editIcon' | 'delete' | 'deleteIcon' | 'save' |
  'submit' | 'cancel' | 'close' | 'closeIcon' | 'next' | 'prev' | 'continue' | 'filter' | 'approve' | 'reject' | 'setting' | 'settingIcon' |
  'move' | 'download' | 'downloadIcon' | 'selectAll' | 'deselectAll' | 'refreshIcon' | 'cloneIcon';
  text?: string;
  icon?: string;
  iconSVG?: string;
  iconClass?: string;
  size?: 'xs' | 'sm' | 'lg' | undefined;
  aTag?: boolean;
  iconOnly?: boolean;
  loadingText?: string;
  action?: ActionType | string;
  space?: string;
  buttonType?: 'submit' | 'reset' | 'button' | undefined;
  button?: ButtonConfig,
  confirmation?: ConfirmConfig,
  permission?: string | string[];
  show?: any,
  className?: string
}