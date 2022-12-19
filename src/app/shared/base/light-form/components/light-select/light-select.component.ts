import { Component, OnInit } from '@angular/core';
import { Placement } from 'src/app/constants/enums/common/placement/placement.enum';

// Components
import { LightFormOptionBaseComponent } from '../../base-class/light-form-base/light-form-option-base.component';

@Component({
  selector: 'app-light-select',
  templateUrl: './light-select.component.html',
  styleUrls: ['./light-select.component.scss']
})
export class LightSelectComponent extends LightFormOptionBaseComponent implements OnInit {
  placementEnum = Placement;
}
