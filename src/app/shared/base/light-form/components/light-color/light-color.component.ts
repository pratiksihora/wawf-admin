import { Component, OnInit } from '@angular/core';

// Components
import { LightFormBaseComponent } from '../../base-class/light-form-base/light-form-base.component';

@Component({
  selector: 'app-light-color',
  templateUrl: './light-color.component.html',
  styleUrls: ['./light-color.component.scss']
})
export class LightColorComponent extends LightFormBaseComponent implements OnInit {

  presetColors: string[] = ['#fff', '#000', '#2889e9', '#e920e9', '#fff500', 'rgb(236,64,64)'];
  open: boolean = false;

  notifyChange(event: any) {
    this.form?.get(this.field.key)?.setValue(event);
    this.valueChange.emit({ key: this.field.key, value: event, extraValue: event });
  }
}
