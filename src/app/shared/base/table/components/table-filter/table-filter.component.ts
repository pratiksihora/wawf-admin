import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

// External Modules
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

// Interfaces
import { AdvanceFilterOption } from 'src/app/shared/constants/models/controls/table/table-config';
import { FormGlobalConfig } from 'src/app/shared/constants/models/controls/form/form-field-config';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss']
})
export class TableFilterComponent implements OnInit {
  @Input() filterValue: any;
  @Input() filterOptions: AdvanceFilterOption;

  // Events
  @Output() clearEvent = new EventEmitter<string>();
  @Output() saveEvent = new EventEmitter<any>();

  globalFormConfig: FormGlobalConfig = { templateOptions: { solidControl: true, smallControl: true } };
  form: FormGroup = new FormGroup({});

  constructor(public modal: NgbActiveModal, public cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  close() {
    this.modal.close('close');
  }

  clear() {
    this.clearFilter();
    this.saveEvent.emit(this.form.getRawValue());
  }

  save() {
    this.modal.close('close');
    this.saveEvent.emit(this.form.getRawValue());
  }

  ngAfterViewInit() {
    this.setValues();
  }

  // set values in form
  setValues() {
    let value = {};
    Object.keys(this.filterValue || {}).forEach(key => {
      if (key.indexOf('_value') > -1 || key.indexOf('_type') > -1) {
        value[key] = this.filterValue[key];
      }
    });
    this.form.patchValue(value);
  }

  // clear filter
  clearFilter() {
    let value = {};
    this.filterOptions.fields.forEach(key => {
      value[`${key.field}_value`] = null;
      value[`${key.field}_value1`] = null;
      value[`${key.field}_value2`] = null;
      value[`${key.field}_type`] = 'eq';
    });
    this.form.patchValue(value);
  }
}
