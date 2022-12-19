import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

// External Modules
import { NgxPermissionsService } from 'ngx-permissions';

// Components
import { FormDateBaseComponent } from '../../base-class/form-base/form-date-base.component';

// Enums
import { DatePickerType } from 'src/app/shared/constants/enums/common/date/date-picker-type.enum';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent extends FormDateBaseComponent implements OnInit {

  datePickerTypeEnum = DatePickerType;
  constructor(public permissionService?: NgxPermissionsService, public cdr?: ChangeDetectorRef) {
    super(permissionService, cdr);
  }

}
