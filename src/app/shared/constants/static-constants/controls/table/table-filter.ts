import { Option } from "src/app/shared/constants/models/controls/form/form-field-config";

export const DATE_FILTERS: Option[] = [{
  text: 'Is Equal',
  value: 'eq'
}, {
  text: 'Is Not Equal',
  value: 'neq'
}, {
  text: 'Is Available',
  value: 'nnl'
}, {
  text: 'Not Available',
  value: 'nl'
}, {
  text: 'Before',
  value: 'lte'
}, {
  text: 'After',
  value: 'gte'
}, {
  text: 'Between',
  value: 'ltegte'
}];

export const MULTI_SELECT_FILTERS: Option[] = [{
  text: 'Match All',
  value: 'eq'
}, {
  text: 'Contain Atleast One',
  value: 'neq'
}, {
  text: 'None Of Match',
  value: 'nnl'
}, {
  text: 'Is Available',
  value: 'nnl'
}, {
  text: 'Not Available',
  value: 'nl'
}];

export const SINGLE_SELECT_FILTERS: Option[] = [{
  text: 'Is Equal',
  value: 'eq'
}, {
  text: 'Is Not Equal',
  value: 'neq'
}, {
  text: 'Is Available',
  value: 'nnl'
}, {
  text: 'Not Available',
  value: 'nl'
}];

export const NUMBER_FILTERS: Option[] = [{
  text: 'Is Equal',
  value: 'eq'
}, {
  text: 'Is Not Equal',
  value: 'neq'
}, {
  text: 'Is Available',
  value: 'nnl'
}, {
  text: 'Not Available',
  value: 'nl'
}, {
  text: 'Less Than',
  value: 'lt'
}, {
  text: 'Less Than Equal To',
  value: 'lte'
}, {
  text: 'Greater Than',
  value: 'gt'
}, {
  text: 'Greater Than Equal To',
  value: 'gte'
}, {
  text: 'Between',
  value: 'ltegte'
}, {
  text: 'Contains',
  value: 'in'
}];

export const STRING_FILTERS: Option[] = [{
  text: 'Is Equal',
  value: 'eq'
}, {
  text: 'Is Not Equal',
  value: 'neq'
}, {
  text: 'Contains',
  value: 'in'
}, {
  text: 'Does not Contains',
  value: 'nin'
}, {
  text: 'Is Available',
  value: 'nnl'
}, {
  text: 'Not Available',
  value: 'nl'
}, {
  text: 'Starts With',
  value: 'sw'
}, {
  text: 'Ends With',
  value: 'ew'
}];

export const BOOLEAN_SELECT_FILTERS: Option[] = [{
  text: 'Is Equal',
  value: 'eq'
}, {
  text: 'Is Not Equal',
  value: 'neq'
}, {
  text: 'Is Available',
  value: 'nnl'
}, {
  text: 'Not Available',
  value: 'nl'
}];