// Interfaces

// Enums
import { ActionType } from "src/app/shared/constants/enums/common/action/action.enum";
import { Expression } from "../../form/form-field-config";
import { ConfirmModalConfig } from "../../modal/confirm-modal";
import { ConfirmConfig } from "../../modal/confirm-modal/config";

////////////////////////////////////////
//            INTERFACES              //
////////////////////////////////////////

/**
 * Button interface for buttons
 */
export interface ButtonConfig {
  type?: 'reset' | 'submit' | 'button' | undefined;

  className?: string;
  space?: string;
  action?: ActionType | string;
  aTag?: boolean;
  icon?: string;
  iconSVG?: string;
  iconClass?: string;
  rightIcon?: string;
  rightIconSVG?: string;
  iconOnly?: boolean;

  size?: 'xs' | 'sm' | 'lg' | undefined;

  text?: string;
  textHTML?: string;

  loadingText?: string;

  tooltip?: string;
  permission?: string | string[] | any;

  show?: (data: any) => {};

  confirmation?: ConfirmConfig
}

