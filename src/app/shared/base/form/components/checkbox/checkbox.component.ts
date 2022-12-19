import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

// External Modules


// Components
import { FormBaseComponent } from '../../base-class/form-base/form-base.component';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent extends FormBaseComponent implements OnInit {
  toogle: boolean = false;

  constructor(public cdr: ChangeDetectorRef) {
    super( cdr);
  }
}
