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
import { FormAPI, FormConfig, FormFields } from './create-licence-key.constant';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-licence-key',
  templateUrl: './create-licence-key.component.html',
  styleUrls: ['./create-licence-key.component.scss']
})
export class CreateLicenceKeyComponent extends FormApiComponent implements OnInit {

  formFields: { [key: string]: Field } = FormFields;
  formConfig: FormGlobalConfig = FormConfig;
  config = FormAPI;

  formSaveTypeEnum = FormSaveType;
  loading: boolean = false;

  @Output() closeEvent = new EventEmitter<any>();

  constructor(public modal: NgbActiveModal,
    public formService: FormService, public activatedRoute: ActivatedRoute, public cdr: ChangeDetectorRef) {
    super(formService, activatedRoute, cdr)
  }

  modifyPayloadBeforeSave(payload: any, extraValue?: any) {
    payload = {
      ...payload,
      no_of_month: parseInt(payload?.no_of_month)
    }
    return payload;
  }

  // submit() {
  //   if (!this.validateForm()) return false;
  //   // this.saveApiCall();
  //   this.close();
  // }

  close() {
    this.modal.close('close');
    this.closeEvent.emit('close');
  }

}
