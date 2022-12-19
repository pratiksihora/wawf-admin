import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

// External Modules


// Components
import { FormBaseComponent } from '../../base-class/form-base/form-base.component';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent extends FormBaseComponent implements OnInit {
  toogle: boolean = false;

  constructor( public cdr: ChangeDetectorRef) {
    super( cdr);
  }
}
