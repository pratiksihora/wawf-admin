////////////////////////////////////////
//            INTERFACES              //
////////////////////////////////////////

/**
 * Toaste Config interface for toastr
 */
export interface ToastrConfig {
  severity?: 'success' | 'error' | 'info' | 'warning' | 'custom' | undefined;

  key?: string;
  id?: string

  summary?: string;
  detail?: string;


  icon?: string;
  life?: number
  sticky?: boolean;
  style?: string;
  closable?: boolean;
  data?: any;
  styleClass?: string;
  contentStyleClass?: string
}
