import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

// External Dependency
import { DaterangepickerComponent } from 'ng2-daterangepicker';
import { DatePickerType } from 'src/app/constants/enums/common/date/date-picker-type.enum';

// Interfaces
import { Field } from 'src/app/constants/models/controls/form/form-field-config';
import { StorageUtil } from 'src/app/_core/utils/storage';

// Constants
import { DATE_RANGE_OPTIONS } from './custom-date-range.constant';

@Component({
  selector: 'app-custom-date-range',
  templateUrl: './custom-date-range.component.html',
  styleUrls: ['./custom-date-range.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDateRangeComponent),
      multi: true
    }
  ]
})
export class CustomDateRangeComponent implements ControlValueAccessor {

  @Input() prefix: string;
  @Input() field: Field;
  @Input() form: FormGroup;
  @Input() type: string;
  @Input() disabled: boolean;
  @Input() minDate: any;
  @Input() maxDate: any;

  @Output() valueChange = new EventEmitter<any>();
  @Output() iconAction = new EventEmitter<any>();

  @ViewChild(DaterangepickerComponent) private picker: DaterangepickerComponent;
  @ViewChild('dateRangeInput') dateRangeInput: ElementRef;

  date: any = {};
  datePickerTypeEnum = DatePickerType;
  dateOptions: any = {};
  constructor(private cdr: ChangeDetectorRef) {
  }

  /**
   * Set Date Picker Options
   */
  _setDatePickerOptions() {
    let minDate;
    if (this.minDate) {
      minDate = this.minDate;
    }

    let maxDate;
    if (this.maxDate) {
      maxDate = this.maxDate;
    }

    let dateTimeOptions: any = null;
    if (this.type === this.datePickerTypeEnum.DateTime) {
      dateTimeOptions = {
        locale: { format: StorageUtil.getDateTimeFormat() },
        timePicker: true,
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 1801,
        maxYear: 2200,
      }
    } else if (this.type === this.datePickerTypeEnum.Date) {
      dateTimeOptions = {
        locale: { format: StorageUtil.getDateFormat() },
        timePicker: false,
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 1801,
        autoApply: true,
        maxYear: 2200,
      }
    };

    this.dateOptions = {
      locale: { format: StorageUtil.getDateFormat() },
      alwaysShowCalendars: false,
      opens: this.field?.datePickerOptions?.position,
      drops: this.field?.templateOptions?.open,
      parentEl: this.field?.datePickerOptions?.append,
      autoUpdateInput: this.field.templateOptions?.autoUpdate || false,
      minDate,
      maxDate,
      ...dateTimeOptions,
      ranges: this.type === this.datePickerTypeEnum.DateRange ? DATE_RANGE_OPTIONS : undefined,
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.field && changes.minDate?.currentValue || changes.maxDate?.currentValue) {
      this._setDatePickerOptions();
    }
  }

  ngOnInit() {
    this._setDatePickerOptions();
  }

  onChange: (value: any) => {};
  onTouched: () => {};

  /**
  * Register change event
  */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
  * Register change event
  */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
  * Write value
  */
  writeValue(date: any): void {
    if (!(date?.start && date?.end)) {
      if (!this.picker) return;
      this.setValueToElement();
      return;
    }

    // date range set
    this.date.start = date.start;
    this.date.end = date.end;

    // picker 
    this._setDateToDatePicker();
  }

  /**
   * Set Date Picker values
   */
  _setDateToDatePicker(first?: boolean) {
    if (!this.picker) {
      if (this.date.start) { this.setValueToElement({ startDate: this.date.start, endDate: this.date.end }) }
      return;
    };

    this.picker.datePicker.setStartDate(this.date.start);
    this.picker.datePicker.setEndDate(this.date.end);

    if (first) {
      this.date.start = this.picker.datePicker.startDate;
      this.date.end = this.picker.datePicker.endDate;
      this.onChange(this.date);
    }
    this.setValueToElement(this.picker.datePicker);
  }

  /**
   * Set Disable State
   */
  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  /**
   * Select function when event trigger
   */
  select(value: any, force: boolean = false) {
    if (!value) return;
    this.date.start = value.start;
    this.date.end = value.end;

    if (force || this.dateOptions.autoUpdateInput) {
      this.triggerEvent();
    };
  }

  triggerEvent() {
    this.onChange(this.date.start ? this.date : undefined);
    this.onTouched();
    this.valueChange.emit({
      key: this.field.key,
      value: this.type === this.datePickerTypeEnum.DateRange ? this.date : this.date.start,
      extraValue: this.date
    });
  }

  calendarApplied(value: any) {
    if (!this.date?.start) {
      this.select({ start: value.picker.startDate, end: value.picker.endDate }, true);
      this.setValueToElement(value.picker);
      return;
    }
    this.triggerEvent();
    this.setValueToElement(value.picker);
  }

  cancelApplied(value: any) {
    // this.dateRangeInput.nativeElement.value = '';
  }

  close() {
    this.select({}, true);
    this.setValueToElement();
  }

  setValueToElement(picker: any = null) {
    if (!this.dateRangeInput) return;

    if (!picker) {
      this.dateRangeInput.nativeElement.value = '';
      return;
    }

    if (this.type === this.datePickerTypeEnum.DateRange)
      this.dateRangeInput.nativeElement.value = `${picker.startDate.format(StorageUtil.getDateFormat())} - ${picker.endDate.format(StorageUtil.getDateFormat())}`;
    else if (this.type === this.datePickerTypeEnum.DateTime)
      this.dateRangeInput.nativeElement.value = `${picker.startDate.format(StorageUtil.getDateTimeFormat())}`;
    else
      this.dateRangeInput.nativeElement.value = `${picker.startDate.format(StorageUtil.getDateFormat())}`;

    this.cdr.detectChanges();
  }
}
