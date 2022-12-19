import { ChangeDetectorRef, Component, OnInit } from "@angular/core";

// External Dependency
import { of } from "rxjs";
import { finalize, mergeMap } from "rxjs/operators";
import { NgxPermissionsService } from "ngx-permissions";

// Components
import { FormBaseComponent } from "./form-base.component";

// Services
import { LookupService } from "src/app/api/services/common/lookup/lookup.service";
import { ComponentType } from "src/app/shared/constants/enums/controls/form";

@Component({ template: '' })

export abstract class FormOptionBaseComponent extends FormBaseComponent implements OnInit {
  loading: boolean = false;

  items: any = [];
  constructor(public permissionService: NgxPermissionsService, public cdr: ChangeDetectorRef, public lookupService: LookupService) {
    super(permissionService, cdr);
  }

  /**
    * Fill options for select & multiselect filter type
    */
  async _fillOptions() {

    const defaultValue = this.field.defaultValue !== undefined ? this.field.defaultValue : null;

    let options: any = [];
    // fill static options
    if (this.field.options) {
      options = this.field.options;
    }

    // fill outer options
    if (this.options) {
      options = this.options;
    }

    if (this.field.api) {
      options = this.field.api?.promise ? await this._apiCallPromise() : this._apiCall();
    }
    // fill outer options

    this.items = this.field.prepareOptions ? this.field.prepareOptions({
      options: options || [], values: this.values || defaultValue
    }) : options;

    // set default value for radio if no option selected
    if (this.items?.length && !this.form.get(this.field.key).value && this.field.firstSelect) {
      setTimeout(() => {
        this.form.get(this.field.key).patchValue(this.items[0].value);
      }, 1000);
    }

    return this.items;
  }


  /**
  * Upload file in server and validate and reset
  */
  _apiCall(search?: string, observable?: boolean) {
    let filter = this._applyFilter(search);

    if (filter === undefined) return [];

    if (this.field.prepareApiPayload) {
      filter = this.field.prepareApiPayload({ form: this.form, parentForm: this.parentForm, field: this.field, search })
    }

    this.loading = true;
    return this.lookupService.lookupCommon(this.field.api, filter).pipe(mergeMap((response: any) => {
      const values = this.field.prepareOptions ? this.field.prepareOptions(response) : response;
      return observable ? of(values) : values;
    }), finalize(() => {
      this.loading = false;
      this.cdr.detectChanges();
    }));
  }

  /**
  * Upload file in server and validate and reset
  */
  async _apiCallPromise(search?: string, observable?: boolean) {
    let filter = this._applyFilter(search);

    if (filter === undefined) return [];
    if (this.field.prepareApiPayload) {
      filter = this.field.prepareApiPayload({ form: this.form, parentForm: this.parentForm, field: this.field, search })
    }
    this.loading = true;
    try {
      const response = await this.lookupService.lookupCommon(this.field.api, filter).toPromise();
      this.loading = false;
      this.cdr.detectChanges();
      return observable ? of(response) : response;
    } catch (err) {
      this.loading = false;
      this.cdr.detectChanges();
      return observable ? of([]) : [];
    }

  }
}