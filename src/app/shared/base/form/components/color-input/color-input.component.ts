import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

// External Modules
import { NgxPermissionsService } from 'ngx-permissions';

// Components
import { FormBaseComponent } from '../../base-class/form-base/form-base.component';

@Component({
  selector: 'app-color-input',
  templateUrl: './color-input.component.html',
  styleUrls: ['./color-input.component.scss']
})
export class ColorInputComponent extends FormBaseComponent implements OnInit {

  presetColors: string[] = ['#fff', '#000', '#2889e9', '#e920e9', '#fff500', 'rgb(236,64,64)'];
  open: boolean = false;
  constructor(public permissionService: NgxPermissionsService, public cdr: ChangeDetectorRef) {
    super(permissionService, cdr);
  }

  notifyChange(event: any) {
    this.form?.get(this.field.key)?.setValue(event);
    this.valueChange.emit({ key: this.field.key, value: event, extraValue: event });
  }

}
