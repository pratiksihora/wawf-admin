import { Component, OnInit, ViewChild } from '@angular/core';
import { TableConfig } from 'src/app/constants/models/controls/table/table-config';
import { TableApiComponent } from 'src/app/shared/base/table/base-class/table-api/table-api.component';
import { ModalConfig, ModalComponent } from '../../_metronic/partials';
import { configureTable } from './dashboard.constant';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends TableApiComponent implements OnInit {
  modalConfig: ModalConfig = {
    modalTitle: 'Modal title',
    dismissButtonLabel: 'Submit',
    closeButtonLabel: 'Cancel'
  };
  @ViewChild('modal') private modalComponent: ModalComponent;

  async openModal() {
    return await this.modalComponent.open();
  }

  tableConfig: TableConfig;

  ngOnInit(): void {
    this.tableConfig = configureTable({});
  }

}
