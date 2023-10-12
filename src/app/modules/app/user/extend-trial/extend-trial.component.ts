import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//service
import { FormService } from 'src/app/api/services/common/form/form.service';
import { ToastService } from 'src/app/shared/base/toastr/toast-service/toast.service';

//component
import { FormApiComponent } from 'src/app/shared/base/form/base-class/form-api/form-api.component';

//enum & interface
import { Field, FormGlobalConfig } from 'src/app/shared/constants/models/controls/form/form-field-config';
import { FormSaveType } from 'src/app/shared/constants/enums/controls/form';

//constant
import { FormAPI, FormConfig, FormFields } from './extend.constant';

@Component({
  selector: 'app-extend-trial',
  templateUrl: './extend-trial.component.html',
  styleUrls: ['./extend-trial.component.scss']
})
export class ExtendTrialComponent extends FormApiComponent implements OnInit {

  formFields: { [key: string]: Field } = FormFields;
  formConfig: FormGlobalConfig = FormConfig;
  formSaveType = FormSaveType.UPDATE;
  config = FormAPI;

  // @Input() data: any;
  @Output() closeEvent = new EventEmitter<any>();

  constructor(public modal: NgbActiveModal,
    public formService: FormService, public activatedRoute: ActivatedRoute, public cdr: ChangeDetectorRef,
    private toastrService: ToastService) {
    super(formService, activatedRoute, cdr)
  }

  ngOnInit(): void {
  }

  isEditMode() {
    return true
  }

  modifyPayloadBeforeSave(payload: any, extraValue?: any) {
    payload = {
      ...payload,
      mobile_no: this.data?.user_unique_id,
    }
    return payload;
  }

  formSaved(data: any) {
    this.modal.close('save');
    this.closeEvent.emit('save');
  }

  close() {
    this.modal.close('close');
    this.closeEvent.emit('close');
  }

}
