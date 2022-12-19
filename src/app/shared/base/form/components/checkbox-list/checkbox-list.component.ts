import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

// External Modules


// Components
import { FormCheckboxBaseComponent } from '../../base-class/form-base/form-checkbox-base.component';

// Services
import { LookupService } from 'src/app/api/services/common/lookup/lookup.service';

@Component({
  selector: 'app-checkbox-list',
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.scss']
})
export class CheckboxListComponent extends FormCheckboxBaseComponent implements OnInit {

  constructor( public cdr: ChangeDetectorRef, public lookupService: LookupService) {
    super( cdr, lookupService);
  }

}
