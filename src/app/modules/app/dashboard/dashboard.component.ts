import { Component, ViewChild, HostBinding, OnInit, ChangeDetectorRef } from '@angular/core';
//service
import { TableService } from 'src/app/api/services/common/table/table.service';

//enum & interface
import { ApiAction } from 'src/app/shared/constants/models/api';
import { ApiModule } from 'src/app/api/enums/api-module.enum';

//utils
import { ApiUtil } from 'src/app/shared/_core/utils/api';

import { ModalConfig, ModalComponent } from '../../../_metronic/partials';
import { TokenUtil } from 'src/app/shared/_core/utils/token';
import { ToastrUtil } from 'src/app/shared/_core/utils/toastr';
import { ToastService } from 'src/app/shared/base/toastr/toast-service/toast.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @HostBinding('class') class = 'flex-fill';
  modalConfig: ModalConfig = {
    modalTitle: 'Modal title',
    dismissButtonLabel: 'Submit',
    closeButtonLabel: 'Cancel'
  };
  @ViewChild('modal') private modalComponent: ModalComponent;

  getData: any;
  loading: boolean;
  userData: any;

  constructor(public tableService: TableService, public cdr: ChangeDetectorRef, public toast: ToastService, public clipboard: Clipboard) { }

  ngOnInit(): void {
    this.getAllCount();
    this.userData = TokenUtil.getUser();
  }

  async openModal() {
    return await this.modalComponent.open();
  }

  getAllCount() {
    this.loading = true
    const common: ApiAction = ApiUtil.configureGet({ module: ApiModule.API, url: '/v1/reseller/dashboard', title: 'User' })
    this.tableService.tableCommon(common, {}).subscribe({
      next: (res) => {
        this.loading = false;
        this.getData = res.data;
        this.cdr.detectChanges();
      }
    });
  }

  copyUrl() {
    navigator.clipboard.writeText(this.userData?.reseller_ext_link);
    this.toast.show(ToastrUtil.configureSuccess({ type: 'success', title: 'Link', message: 'Link has been copied successfully.' }))
    close()
  }

}
