import { ChangeDetectorRef, Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';

// External Modules
import { TranslateService } from '@ngx-translate/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Services
import { TableService } from 'src/app/api/services/common/table/table.service';
import { TableExportService } from 'src/app/shared/_core/services/table/table-export.service';
import { ToastService } from 'src/app/shared/base/toastr/toast-service/toast.service';
import { ConfirmService } from 'src/app/shared/base/modal/confirm-modal/confirm-service/confirm.service';

// Components
import { TableApiComponent } from 'src/app/shared/base/table/base-class/table-api/table-api.component';
import { ExtendComponent } from './components/extend/extend.component';
import { DeviceHistoryComponent } from './components/device-history/device-history.component';
import { CreditHistoryComponent } from './components/credit-history/credit-history.component';
import { CreateLicenceKeyComponent } from './components/create-licence-key/create-licence-key.component';
import { MessageCopyComponent } from './components/message-copy/message-copy.component';
import { UpdateKeyDetailsComponent } from './components/update-key-details/update-key-details.component';

// Interfaces && Enums
import { TableConfig } from 'src/app/shared/constants/models/controls/table/table-config';
import { TableApiConfig } from 'src/app/shared/constants/models/controls/table/table-api';
import { ApiModule } from 'src/app/api/enums/api-module.enum';

// Constants
import { configureTable } from './licence-key.constant';
import { ApiAction } from 'src/app/shared/constants/models/api';

// Utils
import { TableApiUtil } from 'src/app/shared/_core/utils/api/table';
import { ToastrUtil } from 'src/app/shared/_core/utils/toastr';
import { ApiUtil } from 'src/app/shared/_core/utils/api';
import { ComfirmationUtil } from 'src/app/shared/_core/utils/confirmation';
import { TokenUtil } from 'src/app/shared/_core/utils/token';


@Component({
  selector: 'app-licence-key',
  templateUrl: './licence-key.component.html',
  styleUrls: ['./licence-key.component.scss']
})

export class LicenceKeyComponent extends TableApiComponent implements OnInit {
  @HostBinding('class') class = 'flex-fill overflow-hidden';

  config: TableApiConfig = TableApiUtil.lazyTable({ idKey: 'sk_id', module: ApiModule.API, exportUrl: '/v1/reseller/subscription/export', paggingUrl: '/v1/reseller/subscription/pagging', deleteUrl: '/v1/reseller/delete-key/{{sk_id}}', title: 'User' });
  tableConfig: TableConfig;

  constructor(public tableService: TableService,
    public activatedRoute: ActivatedRoute, public cdr: ChangeDetectorRef,
    public exportService: TableExportService, public permissionService: NgxPermissionsService,
    public translate: TranslateService, private modalService: NgbModal,
    public clipboard: Clipboard, protected toast: ToastService,
    private confirmation: ConfirmService,
  ) {
    super(tableService, activatedRoute, cdr, exportService)
  }

  ngOnInit(): void {
    this.tableConfig = configureTable(this.translate, this.permissionService, TokenUtil.getUser());
  }

  onAddEdit(value) {
    console.log(value);
    if (value === undefined) {
      const modelRef = this.modalService.open(CreateLicenceKeyComponent, { centered: true, size: 'md', backdrop: 'static', scrollable: true });
      modelRef.result.then(res => {
        if (res === 'save') {
          this.table.table.reset();
        }
      })
      return;
    } else {
      const modelRef = this.modalService.open(UpdateKeyDetailsComponent, { centered: true, size: 'md', backdrop: 'static', scrollable: true });
      modelRef.componentInstance.data = value?.data?.data;
      modelRef.result.then(res => {
        if (res === 'save') {
          this.table.table.reset();
        }
      })
    }
  }

  tableActionRefund(data) {
    this.confirmation.show(ComfirmationUtil.configure({ type: 'delete', message: 'Are you sure that you want to refund?.', title: 'Refund', confirmation: { button1Text: 'Refund' } }), (response) => {
      const common: ApiAction = ApiUtil.configurePut({
        module: ApiModule.API,
        url: `/v1/reseller/refund-key/${data?.rowData?.sk_id}`, title: 'Refund'
      })

      this.tableService.tableCommon(common, {}).subscribe({
        next: (res) => {
          this.cdr.detectChanges();
          if (res?.status == 200) {
            this.table.table.reset();
            this.cdr.detectChanges();
          }
        }, error: (error) => {
          this.loading = false;
          this.cdr.detectChanges();
        }
      })
    });
  }

  tableActionExtend(data) {
    const modelRef = this.modalService.open(ExtendComponent, { centered: true, size: 'md', backdrop: 'static', scrollable: true });
    modelRef.componentInstance.data = data?.rowData;
    modelRef.result.then(res => {
      if (res === 'save') {
        this.table.table.reset();
      }
    })
    return;
  }

  tableActionDevice(data) {
    const modelRef = this.modalService.open(DeviceHistoryComponent, { centered: true, size: 'xl', backdrop: 'static', scrollable: true });
    modelRef.componentInstance.data = data?.rowData;
    return;
  }

  tableActionCopy(event) {
    const textToCopy = event?.rowData.sk_licence_key
    this.clipboard.copy(textToCopy);
    this.toast.show(ToastrUtil.configureSuccess({ type: 'success', title: 'License Key', message: 'License Key has been copied successfully.' }))
    return;
  }

  tableActionCredit(data) {
    const modelRef = this.modalService.open(CreditHistoryComponent, { centered: true, size: 'xl', backdrop: 'static', scrollable: true });
    modelRef.componentInstance.data = data?.rowData;
    return;
  }

  tableActionMessage(data) {
    const modelRef = this.modalService.open(MessageCopyComponent, { centered: true, size: 'lg', backdrop: 'static', scrollable: true });
    modelRef.componentInstance.data = data?.rowData;
    return;
  }

}
