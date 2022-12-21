import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//service
import { FormService } from 'src/app/api/services/common/form/form.service';

//component
import { FormApiComponent } from 'src/app/shared/base/form/base-class/form-api/form-api.component';

//enum & interface
import { Field, FormGlobalConfig } from 'src/app/shared/constants/models/controls/form/form-field-config';
import { FormSaveType } from 'src/app/shared/constants/enums/controls/form';

//constant
import { FormConfig, FormFields } from './extend.constant';

@Component({
  selector: 'app-extend',
  templateUrl: './extend.component.html',
  styleUrls: ['./extend.component.scss']
})
export class ExtendComponent extends FormApiComponent implements OnInit {

  formFields: { [key: string]: Field } = FormFields;
  formConfig: FormGlobalConfig = FormConfig;
  formSaveTypeEnum = FormSaveType;

  @Output() closeEvent = new EventEmitter<any>();

  constructor(public modal: NgbActiveModal,
    public formService: FormService, public activatedRoute: ActivatedRoute, public cdr: ChangeDetectorRef) {
    super(formService, activatedRoute, cdr)
  }

  close() {
    this.modal.close('close');
    this.closeEvent.emit('close');
  }

}
