import { Component, OnInit } from '@angular/core';

// Components
import { LightFormBaseComponent } from '../../base-class/light-form-base/light-form-base.component';

@Component({
  selector: 'app-light-icon',
  templateUrl: './light-icon.component.html',
  styleUrls: ['./light-icon.component.scss']
})
export class LightIconComponent extends LightFormBaseComponent implements OnInit {

  notifyChange(event: any) {
    this.form?.get(this.field.key)?.setValue(event);
    this.valueChange.emit({ key: this.field.key, value: event, extraValue: event });
  }
}
