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
import { FormConfig, FormFields } from './extend.constant';

//utils
import { ApiUtil } from 'src/app/shared/_core/utils/api';
import { ToastrUtil } from 'src/app/shared/_core/utils/toastr';

@Component({
  selector: 'app-extend',
  templateUrl: './extend.component.html',
  styleUrls: ['./extend.component.scss']
})
export class ExtendComponent extends FormApiComponent implements OnInit {

  formFields: { [key: string]: Field } = FormFields;
  formConfig: FormGlobalConfig = FormConfig;
  formSaveTypeEnum = FormSaveType;
  // config = FormAPI;

  @Output() closeEvent = new EventEmitter<any>();

  constructor(public modal: NgbActiveModal,
    public formService: FormService, public activatedRoute: ActivatedRoute, public cdr: ChangeDetectorRef,
    private toastrService: ToastService) {
    super(formService, activatedRoute, cdr)
  }

  ngOnInit(): void {
    console.log(this.data, '====>data')
    this.form.reset(this.data);
    setTimeout(() => {
      this.form.get("sk_no_of_login")?.patchValue(this.data.sk_no_of_login);
      this.form.get("sk_no_of_month")?.patchValue(this.data.sk_no_of_month);
    }, 100);
  }

  setValuesToForm(data: any) {
    console.log(data, 'form data')
    this.form.reset(data);
  }

  isEditMode(): boolean {
    return true;
  }

  saveExtedData() {
    if (!this.validateForm()) return false;
    const payload = {
      id: this.data?.sk_id,
      no_of_month: parseInt(this.form.get('sk_no_of_month')?.value)
    }
    const common = ApiUtil.configurePost({ module: ApiModule.API, url: '/v1/reseller/extend/key', title: 'Extend', success: 'Extend has been update successfully.' });
    this.formService.formCommon(common, payload).subscribe({
      next: (res) => {
        if (res.status === 200) {
          // this.toastrService.show(ToastrUtil.configureSuccess({ type: 'success', title: 'Extend', message: 'Extend key has been update successfully.' }));
        }
        this.modal.close('save');
        this.closeEvent.emit('save');
        this.cdr.detectChanges();
      }, error: (err) => {
        // this.toastrService.show(ToastrUtil.configureError({ type: 'error', title: 'Extend', message: err.message }));
        this.close();
      }
    })
  }

  close() {
    this.modal.close('close');
    this.closeEvent.emit('close');
  }

}
