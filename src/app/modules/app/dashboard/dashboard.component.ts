import { Component, ViewChild, HostBinding } from '@angular/core';
import { ModalConfig, ModalComponent } from '../../../_metronic/partials';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @HostBinding('class') class = 'flex-fill';
  modalConfig: ModalConfig = {
    modalTitle: 'Modal title',
    dismissButtonLabel: 'Submit',
    closeButtonLabel: 'Cancel'
  };
  @ViewChild('modal') private modalComponent: ModalComponent;
  constructor() { }

  async openModal() {
    return await this.modalComponent.open();
  }
}
