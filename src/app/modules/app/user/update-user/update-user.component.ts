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
import { FormConfig, FormFields } from './update-user.constant';
import { ApiUtil } from 'src/app/shared/_core/utils/api';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent extends FormApiComponent implements OnInit {

  formFields: { [key: string]: Field } = FormFields;
  formConfig: FormGlobalConfig = FormConfig;
  formSaveType = FormSaveType.UPDATE;

  @Output() closeEvent = new EventEmitter<any>();

  constructor(public modal: NgbActiveModal,
    public formService: FormService, public activatedRoute: ActivatedRoute, public cdr: ChangeDetectorRef,
    private toastrService: ToastService) {
    super(formService, activatedRoute, cdr)
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.form.get("user_name")?.patchValue(this.data?.user_name);
      this.form.get("user_email")?.patchValue(this.data?.user_email);
    }, 100);
  }

  isEditMode() {
    return true
  }

  saveUserData() {
    if (!this.validateForm()) return false;
    const payload = {
      user_name: this.form.get("user_name")?.value,
      user_email: this.form.get("user_email")?.value
    }
    this.loading = true;
    const common = ApiUtil.configurePut({ module: ApiModule.API, url: `/v1/reseller/user/${this.data?.user_id}`, title: 'User', success: 'User has been update successfully.' });
    this.formService.formCommon(common, payload).subscribe({
      next: (res) => {
        this.loading = false;
        this.modal.close('save');
        this.closeEvent.emit('save');
        this.cdr.detectChanges();
      }, error: (err) => {
        this.loading = false;
        this.close();
      }
    })
  }

  close() {
    this.modal.close('close');
    this.closeEvent.emit('close');
  }

}
