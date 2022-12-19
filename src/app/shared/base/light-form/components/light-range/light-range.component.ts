import { Component, OnInit } from '@angular/core';

// Components
import { LightFormBaseComponent } from '../../base-class/light-form-base/light-form-base.component';

@Component({
  selector: 'app-light-range',
  templateUrl: './light-range.component.html',
  styleUrls: ['./light-range.component.scss']
})
export class LightRangeComponent extends LightFormBaseComponent implements OnInit {

  changeValue(event) {
    const value = (+event.target.innerText || this.form.get(this.field?.key).value) > this.field?.rangeOptions?.max ? this.field?.rangeOptions?.max : ((+event.target.innerText || this.form.get(this.field?.key).value)  < this.field?.rangeOptions?.min ? this.field?.rangeOptions?.min : (+event.target.innerText || this.form.get(this.field?.key).value));
    this.form.get(this.field?.key).setValue(value);
    document.getElementById(this.subId).innerText = value.toString();
    this.notifyChange(event);
  }
}
