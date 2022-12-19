
export const PAGGING_PAYLOAD = {
  pageNumber: 0,
  pageSize: 10,
  filters: []
};

export const FILTER_PAYLOAD = {
  field: 'gl_name',
  type: 'string',
  operator: 'in',
  value: ''
};

export const ALLOWED_FILE_TYPES = ['jpg', 'png', 'gif'];

export const UPLOAD_EVENTS = {
  PROGRESS: 'progress',
  DONE: 'Unhandled event: 3'
}

export const FILE_SIZE = {
  '20_MB': 1024 * 1000 * 20,
  '5_MB': 5 * 1024 * 1000
}

export const MAX_IMAGE_COUNT = {
  GALLERY: '10'
}