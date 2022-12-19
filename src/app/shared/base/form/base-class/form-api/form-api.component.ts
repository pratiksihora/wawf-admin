import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// External Modules
import { Subscription } from 'rxjs';

// Components
import { FormValidateComponent } from '../form-validate/form-validate.component';

// Services
import { FormService } from 'src/app/api/services/common/form/form.service';

// Interfaces
import { FormApiConfig } from 'src/app/shared/constants/models/controls/form/form-api-config';

// Utils
import { IncomingUtil } from 'src/app/shared/_core/utils/form/payload/incoming';
import { OutgoingUtil } from 'src/app/shared/_core/utils/form/payload/outgoing';

// Enums
import { FormSaveType } from 'src/app/shared/constants/enums/controls/form/form-save-type.enum';
import { ApiAction } from 'src/app/shared/constants/models/api';

/**
 * Common form store class for handle form get and submit api calls
 *
 * @author Pratik Shihora <pratik@saeculumsolutions.com>
 *
 * Notes:-
 * Date: 30/03/2020 (Pratik Shihora <pratik@saeculumsolutions.com>) form store base class created
 */
@Component({ template: '' })
export abstract class FormApiComponent extends FormValidateComponent implements OnInit {
  /**
   * External inputs
   */
  @Input() data: any;
  @Input() config: FormApiConfig;

  formSaveType: FormSaveType = FormSaveType.ADD;

  skipPreparingPayload = false;
  autoCallOnSave: boolean = false;
  /**
  * Subscriptions handle on destroy
  */
  subscriptions: Subscription[] = [];
  constructor(public formService: FormService, public activatedRoute: ActivatedRoute, public cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.getFormData();
  }

  //#region  set form in edit mode
  isEditMode() {
    if (this.data || this.config.params?.some(param => !!this.activatedRoute.snapshot.queryParamMap.get(param))
      || this.config.params?.some(param => !!this.activatedRoute.snapshot.paramMap.get(param))
    ) {
      return true;
    }
    return false;
  }

  getFormData() {
    if (this.isEditMode()) {
      this.formSaveType = FormSaveType.UPDATE;
      this.getApiCall();
    }
  }

  prepareGetPayload() {
    if (this.data) {
      return this.modifyPayloadBeforeGetCall(this.data);
    }

    let payload: any = {};
    (this.config.params || []).forEach(param => {
      payload[param] = this.activatedRoute.snapshot.queryParamMap?.get(param) || this.activatedRoute.snapshot.paramMap?.get(param);
    })
    return this.modifyPayloadBeforeGetCall(payload);
  }

  modifyPayloadBeforeGetCall(data: any) {
    return data;
  }

  getAPiConfigForGet() {
    return this.config.get;
  }

  getApiCall() {
    this.loading = true;
    this.subscriptions.push(this.formService.formCommon(this.getAPiConfigForGet(), this.prepareGetPayload()).subscribe((response: any) => {
      this.getFormDataCallback(response);
    }, err => {
      this.getFormDataCallback(err, true);
    }));
  }

  prepareDataToSetInForm(data: any) {
    if (this.skipPreparingPayload) { return data; }

    return IncomingUtil.prepareIncoming({ formFields: this.formFields, payload: data });
  }

  modifyDataBeforePrepare(data) {
    return data;
  }

  modifyDataBeforeSetInForm(data: any, extraData = null) {
    return data;
  }

  setValuesToForm(data: any) {
    this.values = data;
  }

  getFormDataCallback = (response: any, error: boolean = false) => {
    if (!error) {
      const values = this.modifyDataBeforeSetInForm(this.prepareDataToSetInForm(this.modifyDataBeforePrepare(response.data)), response.data);
      setTimeout(() => {
        this.setValuesToForm(values);
        this.formPatched(values);
        this.loading = false;
        this.cdr.detectChanges();
      }, 1000)
      return;
    }
    this.formError(response);
    this.loading = false;
    this.cdr.detectChanges();
  }

  formPatched(values = null) {
    return values;
  }

  formError(values = null) {
  }
  //#endregion

  //#region submit form 
  prepareSaveData() {
    const value = this.form.getRawValue();
    let payload = OutgoingUtil.prepareOutgoing({ formFields: this.formFields, payload: value });
    return this.modifyPayloadBeforeSave(this.checkNull(payload), value);
  }

  modifyPayloadBeforeSave(payload: any, extraValue?: any) {
    return payload;
  }

  submit() {
    if (!this.validateForm()) return false;
    this.saveApiCall();
  }

  saveApiConfig(): ApiAction | any {
    if (this.formSaveType === FormSaveType.UPDATE) {
      return this.config.update;
    } else if (this.formSaveType === FormSaveType.MOVE) {
      return this.config.move;
    }
    return this.config.add;
  }

  saveApiCall() {
    this.loading = true;
    this.subscriptions.push(this.formService.formCommon(this.saveApiConfig(), this.prepareSaveData()).subscribe({
      next: (response: any) => {
        this.saveDataCallback(response);
      }, error: (err) => {
        this.saveDataCallback(err, true);
      }
    }));
  }

  saveDataCallback(response: any, error: boolean = false) {
    if (!error) {
      this.formSaved(response.data);
    }

    if (!this.autoCallOnSave) {
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }
    this.getFormData();
  }

  formSaved(data: any) {
    return data;
  }

  checkNull(data: any) {
    const payload: any = {};
    Object.keys(data).forEach(key => {
      if (data[key] !== 'null' && data[key] !== '' && data[key] !== 'undefined' &&
        data[key] !== undefined && data[key] !== null && data[key] !== ' ') {
        payload[key] = data[key];
      }
    });
    return payload;
  }

  removeHidden(data: any) {
    if (!data) { return {}; }
    
    const payload: any = {};
    Object.keys(data).forEach(key => {
      if (key.indexOf('_hidden') === -1 && key.indexOf('_upload') === -1) {
        payload[key] = data[key];
      }
    });
    return payload;
  }
  //#endregion


  detectAction() {
    this.cdr.detectChanges();
  }
  /**
   * unsubscribe all active subscriptions get destroyed
   */
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub?.unsubscribe());
  }
}
