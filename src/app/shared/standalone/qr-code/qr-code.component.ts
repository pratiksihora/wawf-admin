import { Component, OnInit } from '@angular/core';

// External Modules
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from 'file-saver';

import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit {

  queryString;
  
  
  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.activeModal.close()
  }

  async downloadQrcode(image) {
    await fetch((image))
      .then(res => res.blob())
      .then((blob) => {
        saveAs(blob, 'Download');
      })
  }
}
