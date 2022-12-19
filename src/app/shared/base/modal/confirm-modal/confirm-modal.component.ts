// Angular
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// External Modules
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

// Interfaces
import { ConfirmModalConfig } from 'src/app/constants/models/controls/modal/confirm-modal';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Input() options: ConfirmModalConfig;

  // Events
  @Output() closeEvent = new EventEmitter<string>();
  @Output() saveEvent = new EventEmitter<string>();

  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  button1Click() {
    this.modal.close(this.options.button1Text);
    this.saveEvent.emit(this.options.button1Text)
  }

  button2Click() {
    this.modal.close(this.options.button2Text);
    this.closeEvent.emit(this.options.button2Text);
  }

  close() {
    this.modal.close('close');
    this.closeEvent.emit('close');
  }

}
