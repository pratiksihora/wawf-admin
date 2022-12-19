import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

// Interfaces
import { ErrorMessage, Field, ValidatorOption } from 'src/app/constants/models/controls/form/form-field-config';

// Enums
import { LayoutType } from 'src/app/constants/enums/controls/form/form-layout-type.enum';
import { ComponentType } from 'src/app/constants/enums/controls/form';
@Component({
  selector: 'app-form-control-layout',
  templateUrl: './form-control-layout.component.html',
  styleUrls: ['./form-control-layout.component.scss']
})
export class FormControlLayoutComponent implements OnInit {
  /**
    * External inputs
    */
  @Input() prefix: any;
  @Input() form: FormGroup;
  @Input() field: Field;
  @Input() validators: ValidatorOption;
  @Input() messages: ErrorMessage;
  @Input() bolder: boolean = false;
  /**
    * External inputs
    */
  @Output() labelAction = new EventEmitter<any>();
  @Output() buttonAction = new EventEmitter<any>();

  // Enums
  layoutEnum = LayoutType;
  componentEnum = ComponentType;
  constructor() { }

  ngOnInit(): void {
  }

}
