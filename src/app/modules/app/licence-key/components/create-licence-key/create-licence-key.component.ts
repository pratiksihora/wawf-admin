import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { FormService } from 'src/app/api/services/common/form/form.service';

// Components
import { FormApiComponent } from 'src/app/shared/base/form/base-class/form-api/form-api.component';

// Utils
import { TokenUtil } from 'src/app/shared/_core/utils/token';

// Interfaces
import { Field, FormGlobalConfig } from 'src/app/shared/constants/models/controls/form/form-field-config';
import { FormSaveType } from 'src/app/shared/constants/enums/controls/form';

// Constants
import { FormConfig, FormFields } from './create-licence-key.constant';

@Component({
  selector: 'app-create-licence-key',
  templateUrl: './create-licence-key.component.html',
  styleUrls: ['./create-licence-key.component.scss']
})
export class CreateLicenceKeyComponent extends FormApiComponent implements OnInit {

  _actionConfig;
  @Input() set actionConfig(value) {
    this._actionConfig = value;
    this._handleDrawer(value)
  }
  get actionConfig() {
    return this._actionConfig;
  }

  formFields: { [key: string]: Field } = FormFields;
  formConfig: FormGlobalConfig = FormConfig;
  // config = FormAPI;

  formSaveTypeEnum = FormSaveType;
  loading: boolean = false;
  drawerOptions = {
    open: false
  }

  @Output() saveEvent = new EventEmitter<any>();

  constructor(
    public formService: FormService,
    public activatedRoute: ActivatedRoute,
    public cdr: ChangeDetectorRef,
  ) {
    super(formService, activatedRoute, cdr);
  }

  _handleDrawer(value) {
    this.formSaveType = this.formSaveTypeEnum.ADD;
    this.drawerOptions = {
      open: value.open
    };

    // // edit value
    // if (value.data) {
    //   this.data = value.data;
    //   this.formSaveType = this.formSaveTypeEnum.UPDATE;
    //   this.getFormData();
    //   return;
    // }
    this.form.reset();
  }

  // close the drawer
  closeDrawer() {
    this.drawerOptions = {
      open: false
    };
    this.data = null;
    this.formSaveType = this.formSaveTypeEnum.ADD;
  }

}
