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
import { FormConfig, FormFields } from './update-key-details.constant';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiUtil } from 'src/app/shared/_core/utils/api';
import { ApiModule } from 'src/app/api/enums/api-module.enum';

@Component({
  selector: 'app-update-key-details',
  templateUrl: './update-key-details.component.html',
  styleUrls: ['./update-key-details.component.scss']
})
export class UpdateKeyDetailsComponent extends FormApiComponent implements OnInit {

  formFields: { [key: string]: Field } = FormFields;
  formConfig: FormGlobalConfig = FormConfig;
  // config = FormAPI;

  formSaveTypeEnum = FormSaveType;
  loading: boolean = false;

  @Output() closeEvent = new EventEmitter<any>();

  constructor(public modal: NgbActiveModal,
    public formService: FormService, public activatedRoute: ActivatedRoute, public cdr: ChangeDetectorRef) {
    super(formService, activatedRoute, cdr)
  }

  formSaved(data: any) {
    this.modal.close('save');
    this.closeEvent.emit('save');
  }

  saveKeyData() {
    if (!this.validateForm()) return false;
    const payload = {
      name: this.form.get("name")?.value,
      email: this.form.get("email")?.value,
      mobile_no: this.form.get("mobile_no")?.value
    }
    this.loading = true;
    const common = ApiUtil.configurePut({ module: ApiModule.API, url: `/v1/reseller/update/key/${this.data?.sk_id}`, title: 'Update key', success: 'Update Key has been update successfully.' });
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

  ngOnInit() {
    setTimeout(() => {
      this.form.get("name")?.patchValue(this.data?.sk_name);
      this.form.get("email")?.patchValue(this.data?.sk_email_manual);
      this.form.get("mobile_no")?.patchValue(this.data?.sk_mobile_no);
    }, 100);
  }

}

