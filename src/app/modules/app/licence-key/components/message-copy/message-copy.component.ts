// ANGULAR
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// External Modules
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//services
import { TableService } from 'src/app/api/services/common/table/table.service';

@Component({
  selector: 'app-message-copy',
  templateUrl: './message-copy.component.html',
  styleUrls: ['./message-copy.component.scss']
})
export class MessageCopyComponent implements OnInit {

  constructor(public modal: NgbActiveModal, public tableService: TableService,) { }

  @Input() data: any;
  @Output() closeEvent = new EventEmitter<any>();

  ngOnInit(): void {
  }

  close() {
    this.modal.close('close');
    this.closeEvent.emit('close');
  }

}
