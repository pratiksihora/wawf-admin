import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html'
})
export class InfoModalComponent implements OnInit {

  @Input() infoModalTitle:string = '';
  @Input() modalContent:any;
  @Input() footerClose:boolean = false;

  constructor(
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

}