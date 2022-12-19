import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

// Interface
import { Field, FormGlobalConfig } from 'src/app/shared/constants/models/controls/form/form-field-config';

// Enums
import { ControlType } from 'src/app/shared/constants/enums/controls/form/form-control-type.enum';

@Component({
  selector: 'app-formly',
  templateUrl: './formly.component.html',
  styleUrls: ['./formly.component.scss']
})
export class FormlyComponent implements OnInit {
  /**
  * External inputs
  */
  @Input() options: any = {};
  @Input() values: any = {};
  @Input() form: FormGroup;
  @Input() fieldConfig: Field[];
  @Input() formConfig: FormGlobalConfig;

  /**
   * External outputs
   */
  @Output() valueChange = new EventEmitter<any>();
  @Output() iconAction = new EventEmitter<any>();
  @Output() labelAction = new EventEmitter<any>();

  // Enums
  controlType = ControlType;
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (!this.form) {
      this.form = new FormGroup({});
    }
  }

  /**
   * Emit changes on form field change
   */
  onValueChange(event: any) {
    if (event.key === 'FormReady') {
      this.form = event.value;
    }
    this.valueChange.emit(event);
  }


  detectAction(event: any) {
    this.cdr.detectChanges();
  }
}