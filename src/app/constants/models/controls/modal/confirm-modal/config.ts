////////////////////////////////////////
//            INTERFACES              //
////////////////////////////////////////

import { ConfirmModalConfig } from "./index";

export interface ConfirmConfig {
  type?: 'delete' | 'delete_selected' | 'delete_all' | 'enable' | 'disable' | 'approve' | 'reject' | 'info' | 'success' | 'error' | 'warning';
  message?: string;
  title?: string;
  confirmation?: ConfirmModalConfig
}