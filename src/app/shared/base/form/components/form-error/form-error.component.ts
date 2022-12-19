import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

// Interfaces
import { ErrorMessage, Field, ValidatorOption } from 'src/app/shared/constants/models/controls/form/form-field-config';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss']
})
export class FormErrorComponent implements OnInit {
  /*
    * External inputs
    */
  @Input() field: Field;
  @Input() form: FormGroup;
  @Input() validators: ValidatorOption;
  @Input() messages: ErrorMessage;

  constructor() { }

  ngOnInit(): void {
  }

}
