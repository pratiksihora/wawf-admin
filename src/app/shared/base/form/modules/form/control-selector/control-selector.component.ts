import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';


import { ComponentType } from 'src/app/constants/enums/controls/form/form-component-type.enum';
import { Field, FormGlobalConfig } from 'src/app/constants/models/controls/form/form-field-config';

@Component({
  selector: 'app-control-selector',
  templateUrl: './control-selector.component.html',
  styleUrls: ['./control-selector.component.scss']
})
export class ControlSelectorComponent {
  /**
  * External inputs
  */
  @Input() options: any;
  @Input() values: any;
  @Input() parentForm: FormGroup;
  @Input() form: FormGroup | any;
  @Input() fieldConfig: Field;
  @Input() formConfig: FormGlobalConfig;

  /**
   * External outputs
   */
  @Output() valueChange = new EventEmitter<any>();
  @Output() iconAction = new EventEmitter<any>();
  @Output() labelAction = new EventEmitter<any>();
  @Output() detectAction = new EventEmitter<any>();
  // Enums
  componentEnum = ComponentType;
}
