import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

// External Modules


// Components
import { FormOptionBaseComponent } from '../../base-class/form-base/form-option-base.component';

// Services
import { LookupService } from 'src/app/api/services/common/lookup/lookup.service';

// Enums
import { CheckBoxRadioLayoutType } from 'src/app/constants/enums/controls/form/form-checkbox-radio-layout-type.enum';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent extends FormOptionBaseComponent implements OnInit {

  layout = CheckBoxRadioLayoutType;
  constructor(
    public cdr: ChangeDetectorRef,
    public lookupService: LookupService) {
    super( cdr, lookupService);
  }

}