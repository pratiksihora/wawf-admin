import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

// External Modules


// Components
import { FormBaseComponent } from '../../base-class/form-base/form-base.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent extends FormBaseComponent implements OnInit {
  toogle: boolean = false;

  constructor( public cdr: ChangeDetectorRef) {
    super( cdr);
  }

  passwordToogle() {
    this.toogle = !this.toogle;
  }
}
