import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-credit-history',
  templateUrl: './credit-history.component.html',
  styleUrls: ['./credit-history.component.scss']
})
export class CreditHistoryComponent implements OnInit {

  constructor(public modal: NgbActiveModal) { }
  @Output() closeEvent = new EventEmitter<any>();

  ngOnInit(): void {
  }

  close() {
    this.modal.close('close');
    this.closeEvent.emit('close');
  }

}
