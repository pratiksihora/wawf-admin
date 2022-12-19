import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

// External Modules
import { NgxPermissionsService } from 'ngx-permissions';

// Components
import { FormBaseComponent } from '../../base-class/form-base/form-base.component';
import { RANGE_CONFIG } from './range.constant';

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class RangeComponent extends FormBaseComponent implements OnInit {

  rangeConfig = RANGE_CONFIG;
  constructor(public permissionService: NgxPermissionsService, public cdr: ChangeDetectorRef) {
    super(permissionService, cdr);
  }

  _setupAfterControlIntialize() {
    const min = this.field.rangeOptions?.min || RANGE_CONFIG.range.min;
    const max = this.field.rangeOptions?.max || RANGE_CONFIG.range.max;
    this.rangeConfig = {
      ...RANGE_CONFIG,
      step: this.field.rangeOptions?.step || RANGE_CONFIG.step,
      start: this.field?.defaultValue || RANGE_CONFIG.start,
      range: {
        min,
        max
      }
    }
  }

  notifyChange(event: any): void {
    this.cdr.detectChanges();
    this.valueChange.emit({ key: this.field.key, value: event, extraValue: event });
  }

}
