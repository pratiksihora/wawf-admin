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
import { ApiModule } from 'src/app/api/enums/api-module.enum';

//constant
import { FormConfig, FormFields } from './change-password.constant';

//utils
import { ApiUtil } from 'src/app/shared/_core/utils/api';
import { ToastrUtil } from 'src/app/shared/_core/utils/toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends FormApiComponent implements OnInit {

  formFields: { [key: string]: Field } = FormFields;
  formConfig: FormGlobalConfig = FormConfig;
  formSaveType = FormSaveType.UPDATE;

  @Output() closeEvent = new EventEmitter<any>();

  constructor(public modal: NgbActiveModal, public toast: ToastService,
    public formService: FormService, public activatedRoute: ActivatedRoute, public cdr: ChangeDetectorRef,
    private toastrService: ToastService) {
    super(formService, activatedRoute, cdr)
  }

  ngOnInit(): void {
  }

  isEditMode() {
    return true
  }

  saveUserData() {
    if (!this.validateForm()) return false;
    if (this.form.get("newPassword")?.value !== this.form.get("confirmPassword")?.value) {
      this.toast.show(ToastrUtil.configureError({ type: 'error', title: 'Change Password', message: 'Make sure your new password and confirm password has been same.' }))
      return;
    }
    const payload = {
      oldPassword: this.form.get("oldPassword")?.value,
      newPassword: this.form.get("newPassword")?.value
    }
    const common = ApiUtil.configurePost({ module: ApiModule.API, url: `/v1/reseller/change-password`, title: 'Password', success: 'Password has been update successfully.' });
    this.formService.formCommon(common, payload).subscribe({
      next: (res) => {
        this.modal.close('save');
        this.closeEvent.emit('save');
        this.cdr.detectChanges();
      }, error: (err) => {
        this.close();
      }
    })
  }

  close() {
    this.modal.close('close');
    this.closeEvent.emit('close');
  }

}
