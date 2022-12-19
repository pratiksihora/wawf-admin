// Angular
import { Injectable } from '@angular/core';

// External Modules
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Interfaces
import { ConfirmModalConfig } from 'src/app/shared/constants/models/controls/modal/confirm-modal';

// Components
import { ConfirmModalComponent } from '../confirm-modal.component';

@Injectable({ providedIn: 'root' })
export class ConfirmService {

  //  public activeModal: NgbActiveModal
  constructor(public modalService: NgbModal) { }

  /** show notification popup */
  show(options: ConfirmModalConfig, accept = null, close = null) {
    const modalRef = this.modalService.open(ConfirmModalComponent, { centered: true, backdrop: 'static' });
    modalRef.componentInstance.options = options;
    accept && modalRef.componentInstance.saveEvent.subscribe(value => {
      accept(value);
    })
    close && modalRef.componentInstance.closeEvent.subscribe(value => {
      close(value);
    })
  }

  /** hide all notification popup */
  hideAll(options = null) {
    this.modalService.dismissAll(options);
  }

}