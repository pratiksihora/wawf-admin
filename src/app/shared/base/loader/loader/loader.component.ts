import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  @HostBinding('class') class = 'd-flex flex-column flex-fill';
  /**
   * External inputs
   */
  @Input() show: boolean = false;

  @Input() type?: string;

  @Input() position: boolean;
}
