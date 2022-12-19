import { Component, OnInit } from '@angular/core';

// Components
import { LightFormBaseComponent } from '../../base-class/light-form-base/light-form-base.component';

@Component({
  selector: 'app-light-text-area',
  templateUrl: './light-text-area.component.html',
  styleUrls: ['./light-text-area.component.scss']
})
export class LightTextAreaComponent extends LightFormBaseComponent implements OnInit {

  /**
  * Emits the changed value when value changes
  * @param {{ target: { value: any; }; }} event (contains changed value)
  */
  notifyChange(event: any) {
    const value = this.replaceValue(event?.target?.value)
    this.form?.get(this.field.key).patchValue(value);
    this.valueChange.emit({ key: this.field.key, value: value, extraValue: value });
  }


  replaceValue(text: string): string {
    return text?.replace(/class="ql-align-center"/g, 'style="text-align:center;"')
      .replace(/class="ql-align-right"/g, 'style="text-align:right;"')
      .replace(/class="ql-align-left"/g, 'style="text-align:left;"')
  }
}
