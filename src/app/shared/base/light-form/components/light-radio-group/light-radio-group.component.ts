import { Component, OnInit } from '@angular/core';
import { LightFormOptionBaseComponent } from '../../base-class/light-form-base/light-form-option-base.component';

@Component({
  selector: 'app-light-radio-group',
  templateUrl: './light-radio-group.component.html',
  styleUrls: ['./light-radio-group.component.scss']
})
export class LightRadioGroupComponent extends LightFormOptionBaseComponent  implements OnInit {
}
