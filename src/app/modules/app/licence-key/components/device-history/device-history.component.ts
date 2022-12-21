import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-device-history',
  templateUrl: './device-history.component.html',
  styleUrls: ['./device-history.component.scss']
})
export class DeviceHistoryComponent implements OnInit {

  constructor(public modal: NgbActiveModal) { }
  @Output() closeEvent = new EventEmitter<any>();

  ngOnInit(): void {
  }

  close() {
    this.modal.close('close');
    this.closeEvent.emit('close');
  }

}
