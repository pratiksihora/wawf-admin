import { Component, OnInit } from '@angular/core';

// Components
import { LightFormOptionBaseComponent } from '../../base-class/light-form-base/light-form-option-base.component';

@Component({
  selector: 'app-light-layout',
  templateUrl: './light-layout.component.html',
  styleUrls: ['./light-layout.component.scss']
})
export class LightLayoutComponent extends LightFormOptionBaseComponent implements OnInit {

  notifyChange(event: any) {
    this.form?.get(this.field.key)?.setValue(event);
    this.valueChange.emit({ key: this.field.key, value: event, extraValue: event });
  }
}
