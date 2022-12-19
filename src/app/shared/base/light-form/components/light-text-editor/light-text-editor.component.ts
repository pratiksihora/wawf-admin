import { Component, OnInit } from '@angular/core';

// Components
import { LightFormBaseComponent } from '../../base-class/light-form-base/light-form-base.component';

// Constants
import { EDITOR_CONFIG, FORMATS } from './light-text-editor.constant';

@Component({
  selector: 'app-light-text-editor',
  templateUrl: './light-text-editor.component.html',
  styleUrls: ['./light-text-editor.component.scss']
})
export class LightTextEditorComponent extends LightFormBaseComponent implements OnInit {

  editorConfig = EDITOR_CONFIG;
  formats = FORMATS;

  /**
   * Emits the changed value when value changes
   * @param {{ target: { value: any; }; }} event (contains changed value)
   */
  notifyChange(event: any) {
    const value = this.replaceValue(event?.target?.value)
    // this.form?.get(this.field.key).patchValue(value);
    this.valueChange.emit({ key: this.field.key, value: value, extraValue: value });
  }

  replaceValue(text: string): string {
    return text?.replace(/class="ql-align-center"/g, 'style="text-align:center;"')
      .replace(/class="ql-align-right"/g, 'style="text-align:right;"')
      .replace(/class="ql-align-left"/g, 'style="text-align:left;"')
  }
}
