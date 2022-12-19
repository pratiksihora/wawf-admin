import { Component, OnInit } from '@angular/core';

// Components
import { LightFormBaseComponent } from '../../base-class/light-form-base/light-form-base.component';

@Component({
  selector: 'app-light-input',
  templateUrl: './light-input.component.html',
  styleUrls: ['./light-input.component.scss']
})
export class LightInputComponent extends LightFormBaseComponent implements OnInit {
}
