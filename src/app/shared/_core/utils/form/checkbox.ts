import { FormControl, FormGroup } from "@angular/forms";

export class CheckboxOptionUtil {
    /**
    *  Create form group for new file
    */
     static initCheckbox(option: any ) {
      return new FormGroup({
        text: new FormControl(option?.text),
        value: new FormControl(option?.value),
        selected: new FormControl(option?.selected),
      })
    }
}