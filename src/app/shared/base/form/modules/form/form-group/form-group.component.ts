import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

// External Modules


// Components
import { FormGroupBaseComponent } from '../../../base-class/form-base/form-group-base.component';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})
export class FormGroupComponent extends FormGroupBaseComponent implements OnInit {

  constructor( public cdr: ChangeDetectorRef) {
    super( cdr);
  }

}
