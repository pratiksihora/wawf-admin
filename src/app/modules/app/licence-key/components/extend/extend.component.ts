import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-extend',
  templateUrl: './extend.component.html',
  styleUrls: ['./extend.component.scss']
})
export class ExtendComponent implements OnInit {

  constructor(public modal: NgbActiveModal) { }
  @Output() closeEvent = new EventEmitter<any>();

  ngOnInit(): void {
  }

  close() {
    this.modal.close('close');
    this.closeEvent.emit('close');
  }

}
