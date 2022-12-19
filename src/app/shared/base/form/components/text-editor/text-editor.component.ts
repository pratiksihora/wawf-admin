import { ChangeDetectorRef, Component, OnInit } from '@angular/core';


// Components
import { FormBaseComponent } from '../../base-class/form-base/form-base.component';

// constants
import { EDITOR_CONFIG, FORMATS } from './text-editor.constant';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent extends FormBaseComponent implements OnInit {

  editorConfig = EDITOR_CONFIG;
  formats = FORMATS;

  constructor( public cdr: ChangeDetectorRef) {
    super( cdr);
  }

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
