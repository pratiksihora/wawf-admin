/**
 * Export Type enum for export config
 */
export enum TableEventType {
  SORT = 'sort',
  ACTION = 'action',
  SELECT = 'select',
  UN_SELECT = 'unselect',
  CUSTOM_SORT = 'custom-sort',
  LAZY = 'lazy',
  EXPAND = 'expand',
  COLLAPSE = 'collapse',
  PAGE = 'page',
  FILTER = 'filter',
  SETTING = 'setting',
  REFRESH = 'refresh',
  GLOBAL_FILTER = 'global-filter',
  ADVANCE_FILTER = 'advance-filter',
  CONTEXT_MENU = 'context-menu',
  RESIZE = 'resize',
  COL_REORDER = 'col-reorder',
  REORDER_POPUP = 'reorder-popup',
  ROW_REORDER = 'row-reorder',
  REORDER_SAVE = 'reorder-save',
  TOGGLE = 'toggle',
  FIRST = 'first',
  ROW = 'row',
  STATE_SAVE = 'state-save',
  STATE_RESTORE = 'state-restore',
  EXPORT = 'export',
  EXPORT_PDF = 'export-pdf',
  EXPORT_CSV = 'export-csv',
  EXPORT_EXCEL = 'export-excel',
  ADD = 'add',
  BACK = 'back',
  EDIT = 'edit',
  EDITOR = 'editor',
  VIEW = 'view',
  DELETE = 'delete',
  SELECT_ALL = 'select-all',
  UNSELECT_ALL = 'deselect-all',
  DELETE_SELECTED = 'delete-selected',
  UPDATE_SELECTED = 'update-selected',
  CLICK = 'click',
  ADD_USER = 'add-user',
  DOWNLOAD = 'download',
  MOVE = 'move',
  URL = 'url',
  CLONE = 'clone',
  STATISTICS = 'statistics',
  QR = 'qr',
  INVITE = 'invite',
  PREV = 'prev',
  APPROVE = 'approve',
  REJECT = 'reject',
  RESEND = 'resend',
  EXTEND = 'extend',
  DEVISE = 'device',
  CREDIT = 'credit',
  MESSAGE = 'message',
  COPY = 'copy',
}
