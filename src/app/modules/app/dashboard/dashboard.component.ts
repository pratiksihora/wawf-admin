import { Component, ViewChild, HostBinding, OnInit, ChangeDetectorRef } from '@angular/core';

//service
import { TableService } from 'src/app/api/services/common/table/table.service';

//enum & interface
import { ApiAction } from 'src/app/shared/constants/models/api';
import { ApiModule } from 'src/app/api/enums/api-module.enum';

//utils
import { ApiUtil } from 'src/app/shared/_core/utils/api';

import { ModalConfig, ModalComponent } from '../../../_metronic/partials';

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
  constructor(public tableService: TableService, public cdr: ChangeDetectorRef,) { }

  ngOnInit(): void {
    this.getAllCount();
  }

  async openModal() {
    return await this.modalComponent.open();
  }

  getAllCount() {
    const common: ApiAction = ApiUtil.configureGet({ module: ApiModule.API, url: '/v1/reseller/dashboard', title: 'User' })
    this.tableService.tableCommon(common, {}).subscribe({
      next: (res) => {
        this.getData = res.data;
        this.cdr.detectChanges();
      }
    });
  }

}
