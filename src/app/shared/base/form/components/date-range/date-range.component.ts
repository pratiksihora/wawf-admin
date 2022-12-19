import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

// External Depedency
import { NgxPermissionsService } from 'ngx-permissions';

// Components
import { FormDateBaseComponent } from '../../base-class/form-base/form-date-base.component';

// Enums
import { DatePickerType } from 'src/app/shared/constants/enums/common/date/date-picker-type.enum';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent extends FormDateBaseComponent implements OnInit {

  datePickerTypeEnum = DatePickerType;
  constructor(public permissionService: NgxPermissionsService, public cdr: ChangeDetectorRef) {
    super(permissionService, cdr);
  }
}
