import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

// External Modules


// Components
import { FormArrayBaseComponent } from '../../../base-class/form-base/form-array-base.component';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.scss']
})
export class FormArrayComponent extends FormArrayBaseComponent implements OnInit {

  sortablejsOptions = {
    onEnd: this.onDraggingEnd.bind(this),
    swap: true,
    animation: 150,
    sort: false,
    swapClass: 'btn-light-primary',
  }

  constructor( public cdr: ChangeDetectorRef) {
    super( cdr);
  }

  _setupAfterControlIntialize(): void {
    // sortable options set 
    this.sortablejsOptions = {
      onEnd: this.onDraggingEnd.bind(this),
      swap: true,
      animation: 150,
      sort: this.field.formArrayOptions?.sortable || false,
      swapClass: 'btn-light-primary',
    }
  }

  /**
   * Dragging end event
   */
  onDraggingEnd(event: any) {
    setTimeout(() => this.cdr.detectChanges(), 10)
  }

}
