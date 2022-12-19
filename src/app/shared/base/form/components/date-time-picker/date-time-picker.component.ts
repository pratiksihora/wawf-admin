import { Component, ChangeDetectorRef, OnInit } from '@angular/core';

// External Dependency
import { NgxPermissionsService } from 'ngx-permissions';

// Components
import { FormDateBaseComponent } from '../../base-class/form-base/form-date-base.component';

// Enums
import { DatePickerType } from 'src/app/shared/constants/enums/common/date/date-picker-type.enum';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss']
})
export class DateTimePickerComponent extends FormDateBaseComponent implements OnInit {
  datePickerTypeEnum = DatePickerType;

  constructor(public permissionService: NgxPermissionsService, public cdr: ChangeDetectorRef) {
    super(permissionService, cdr);
  }

}
