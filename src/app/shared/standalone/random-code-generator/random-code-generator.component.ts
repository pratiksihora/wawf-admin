import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormService } from 'src/app/api/services/common/form/form.service';
import { FormSaveType } from 'src/app/constants/enums/controls/form';
import { Field, FormGlobalConfig } from 'src/app/constants/models/controls/form/form-field-config';
import { FormApiComponent } from '../../base/form/base-class/form-api/form-api.component';
import { FormConfig, FormFields } from './random-code-generator.constant';

@Component({
  selector: 'app-random-code-generator',
  templateUrl: './random-code-generator.component.html',
  styleUrls: ['./random-code-generator.component.scss']
})
export class RandomCodeGeneratorComponent extends FormApiComponent implements OnInit {

  formFields: { [key: string]: Field } = FormFields;
  formConfig: FormGlobalConfig = FormConfig;
  formSaveTypeEnum = FormSaveType;

  @Output() saveEvent = new EventEmitter<any>();


  constructor(public modal: NgbActiveModal,
    public formService: FormService, public activatedRoute: ActivatedRoute, public cdr: ChangeDetectorRef) {
    super(formService, activatedRoute, cdr)
  }

  // add extra fields
  form: any = new FormGroup({
    Uppercase: new FormControl(),
    Lowercase: new FormControl(),
    Digit: new FormControl(),
  })

  ngOnInit(): void {
  }

  close() {
    this.modal.close('close');
  }

  generateCodes() {
    let arr = [];
    for (let i = 0; i < this.form.controls.number_codes.value; i++) {
      arr.push(this.generateSingleCode())
    }
    this.saveEvent.emit({ codes: arr, length: arr.length })
    this.modal.close('close');
  }

  generateSingleCode() {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const digits = '0123456789'
    let result = '';
    if (this.form.controls.Uppercase.value === true) {
      result += uppercase
    }
    if (this.form.controls.Lowercase.value === true) {
      result += lowercase
    }
    if (this.form.controls.Digit.value === true) {
      result += digits
    }
    if (this.form.controls.Uppercase.value === false && this.form.controls.Lowercase.value === false && this.form.controls.Digit.value === false) {
      result = uppercase + lowercase + digits
    }
    let randomStrng = this.generateString(result, this.form?.controls?.single_length.value);

    return (this.form?.controls?.code_prefix?.value === null ? '' : this.form?.controls?.code_prefix?.value) + randomStrng + (this.form?.controls?.code_postfix?.value === null ? '' : this.form?.controls?.code_postfix?.value);
  }

  generateString(validCharacters, length) {
    let result = '';
    const charactersLength = validCharacters.length;
    for (let i = 0; i < length; i++) {
      result += validCharacters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
