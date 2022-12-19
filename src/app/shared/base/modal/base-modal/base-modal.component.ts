// ANGULAR
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// NGB MODAL
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-base-modal',
  templateUrl: './base-modal.component.html',
  styleUrls: ['./base-modal.component.scss']
})
export class BaseModalComponent implements OnInit {
  /**
    * External inputs
    */
  @Input() title;
  @Input() description;
  @Input() showFooter = false;
  @Input() showBody = true;
  @Input() showHeader = true;
  @Input() customHeader = false;
  @Input() emitCloseEvent = false;
  @Input() rightTitle = '';
  @Input() headerCloseIcon = true;
  @Output() eModalClose = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  /**
   * To handle the unsaved change not closing the modal instead emitting the close event
   */
  closeClickHandler() {
    if (this.emitCloseEvent) {
      this.eModalClose.emit(true);
    } else {
      this.activeModal.close('Close');
    }
  }
}