// ANGULAR
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

// External Modules
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//services
import { TableService } from 'src/app/api/services/common/table/table.service';
import { ToastService } from 'src/app/shared/base/toastr/toast-service/toast.service';

//utill
import { ToastrUtil } from 'src/app/shared/_core/utils/toastr';
import { TokenUtil } from 'src/app/shared/_core/utils/token';

@Component({
  selector: 'app-message-copy',
  templateUrl: './message-copy.component.html',
  styleUrls: ['./message-copy.component.scss']
})
export class MessageCopyComponent implements OnInit {
  userData;
  constructor(public modal: NgbActiveModal, public tableService: TableService, public clipboard: Clipboard, protected toast: ToastService,) { }

  @Input() data: any;
  @Output() closeEvent = new EventEmitter<any>();

  ngOnInit(): void {
    this.userData = TokenUtil.getUser();
  }

  close() {
    this.modal.close('close');
    this.closeEvent.emit('close');
  }

  copyMesage() {
    navigator.clipboard.writeText(`Thank you for purchasing your license key.

This license key provides access for premium features.

You can download our extension from the following URL, or contact us for installation:
https://wawf.s2-tastewp.com

Your license:
${this.data?.sk_licence_key}

Number of devices:
${this.data?.sk_no_of_login}

Month:
${this.data?.sk_no_of_month}

If you have any questions, do not hesitate to contact us. We are here to help.`);
    this.toast.show(ToastrUtil.configureSuccess({ type: 'success', title: 'Message', message: 'Message has been copied successfully.' }))
    close()
  }

}
