import { Component, OnInit } from '@angular/core';

// Components
import { LightFormOptionBaseComponent } from '../../base-class/light-form-base/light-form-option-base.component';

// Enums
import { CheckBoxRadioLayoutType } from 'src/app/constants/enums/controls/form/form-checkbox-radio-layout-type.enum';

@Component({
  selector: 'app-light-radio',
  templateUrl: './light-radio.component.html',
  styleUrls: ['./light-radio.component.scss']
})
export class LightRadioComponent extends LightFormOptionBaseComponent implements OnInit {
  layout = CheckBoxRadioLayoutType;
}
