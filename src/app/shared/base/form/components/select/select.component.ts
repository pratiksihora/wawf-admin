import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

// External Modules

import { concat, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, mergeMap, switchMap } from 'rxjs/operators';

// Components
import { FormOptionBaseComponent } from '../../base-class/form-base/form-option-base.component';

// Services
import { LookupService } from 'src/app/api/services/common/lookup/lookup.service';
import { Placement } from 'src/app/constants/enums/common/placement/placement.enum';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends FormOptionBaseComponent implements OnInit {

  @Input() customClassFormControl: string = '';
  // Access ng-select
  @ViewChild(NgSelectComponent) select: NgSelectComponent;

  // // Call to clear

  typeahead$ = new Subject<string>();
  placementEnum = Placement;
  items$: any = of([]);
  items: any = [];

  @ViewChild('searchInput', { read: ElementRef, static: false }) searchInputRef: ElementRef;

  constructor( public cdr: ChangeDetectorRef, public lookupService: LookupService) {
    super( cdr, lookupService);
  }

  _setupAfterControlIntialize() {
    this._setItems();
    this._setTypeahead();
  }

  _setItems() {
    this.subscriptions.push(this.items$.subscribe((values: any) => {
      this.items = values;
    }));
  }

  /**
  * Focus when dropdown gets opened
  */
  openDropDown() {
    setTimeout(() => {
      this.searchInputRef?.nativeElement.focus();
    }, 100);
  }

  _setTypeahead() {
    if (!this.field.selectOptions?.typeahead) return;

    this.items$ = concat(of([]), // default items
      this.typeahead$.pipe(distinctUntilChanged(), debounceTime(400), switchMap(term => {
        return this._apiCall(term, true);
      }))
    );
  }

  /**
  * Fill options for select & multiselect filter type
  */

  async _fillOptions() {
    if (this.field.selectOptions?.typeahead) return;

    let options: any = [];

    // fill static options
    if (this.field.options) {
      options = this.field.options;
    }

    // fill outer options
    if (this.options) {
      options = this.options;
    }

    if (!this.field.api) {
      this.items$ = of(this.field.prepareOptions ? this.field.prepareOptions({
        options: options || []
      }) : options);
      return;
    }

    this.items = await this._apiCallPromise();

    this.items$ = of(this.items);

    // While getting if options API response takes time the we need to reset the form value else we were getting blank selected value
    // Patch start
    if (this.form.get(this.field.key).value) {
      setTimeout(() => {
        this.form.get(this.field.key).patchValue(this.form.get(this.field.key).value);
      }, 100);
      return
    }
    // Patch end

    if (this.items?.length && !this.form.get(this.field.key).value) {
      setTimeout(() => {
        this.form.get(this.field.key).patchValue(this.field.firstSelect ? this.items[0].value : this.field.defaultValue);
      }, 100);
    }

    return this.items;
  }

  /**
    * Emits the changed value when value changes
    * @param {{ target: { value: any; }; }} event (contains changed value)
    */
  notifyChange(event: any) {
    this.valueChange.emit({ key: this.field.key, value: this.form.get(this.field.key)?.value, extraValue: this.selectedItem(this.form.get(this.field.key)?.value) });
    this._resetDependentFields();
  }

  /**
   * To select all the options
   */
  selectAll() {
    const items = this.items.map((item: any) => item.value);
    this.form.controls[this.field.key].setValue(items);
  }

  /**
    * To select all the options
    */
  selectedItem(value: any) {
    return this.items.find((item: any) => item.value === value)
  }

  /**
   * To unselect all the options
   */
  unSelectAll() {
    this.form.controls[this.field.key].setValue(this.field.templateOptions?.multiple ? [] : null);
  }

  clearSelectItem() {
    this.select.handleClearClick();
  }


}