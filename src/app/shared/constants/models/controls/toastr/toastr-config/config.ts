////////////////////////////////////////
//            INTERFACES              //
////////////////////////////////////////

import { ToastrConfig } from "./index";

/**
 * Toaste Config interface for toastr
 */
export interface ToastrBaseConfig {
  type?: 'success' | 'error' | 'info' | 'warning' | 'custom' | undefined;

  key?: string;

  title?: string;
  message?: string;

  icon?: string;
  description?: string;
  contentClass?: string;
  className?: string;

  life?: number;
  sticky?: boolean;
  closable?: boolean;

  data?: string;

  toastr?: ToastrConfig;
}

